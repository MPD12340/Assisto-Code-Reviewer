import { GoogleGenAI, Type } from "@google/genai";
import type { CodeReview } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const reviewSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description:
        "A brief, one-sentence overall summary of the code's quality.",
    },
    issues: {
      type: Type.ARRAY,
      description: "A list of issues, suggestions, or bugs found in the code.",
      items: {
        type: Type.OBJECT,
        properties: {
          category: {
            type: Type.STRING,
            description:
              "The category of the issue. Must be one of: 'Bug', 'Security', 'Performance', 'Style', 'Suggestion'.",
          },
          description: {
            type: Type.STRING,
            description:
              "A detailed but concise explanation of the issue and how to fix it.",
          },
          line: {
            type: Type.INTEGER,
            description:
              "The specific line number in the code where the issue is located. Use this only when applicable and accurate.",
          },
        },
        required: ["category", "description"],
      },
    },
  },
  required: ["summary", "issues"],
};

export const getCodeReview = async (
  code: string,
  language: string
): Promise<CodeReview> => {
  const prompt = `
        As an expert code reviewer, please analyze the following ${language} code.
        Your goal is to identify potential issues and suggest improvements.
        Provide a concise, one-sentence summary of the code quality.
        Then, provide a list of specific issues.
        For each issue, categorize it as a 'Bug', 'Security', 'Performance', 'Style', or 'Suggestion'.
        Also provide a clear, constructive description and, if possible, the exact line number.
        Your entire response must strictly follow the provided JSON schema. Do not add any extra text or formatting outside of the JSON structure.

        Code to review:
        \`\`\`${language.toLowerCase()}
        ${code}
        \`\`\`
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reviewSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const parsedReview: CodeReview = JSON.parse(jsonText);
    return parsedReview;
  } catch (error) {
    console.error("Error getting code review from Gemini:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown API error occurred.";
    throw new Error(errorMessage);
  }
};
