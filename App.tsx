
import React, { useState, useCallback } from 'react';
import type { CodeReview } from './types';
import { PROGRAMMING_LANGUAGES } from './constants';
import { getCodeReview } from './services/geminiService';
import Header from './components/Header';
import CodeInput from './components/CodeInput';
import LanguageSelector from './components/LanguageSelector';
import ActionButton from './components/ActionButton';
import ReviewOutput from './components/ReviewOutput';
import { CodeIcon } from './components/icons';


const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(PROGRAMMING_LANGUAGES[0]);
  const [review, setReview] = useState<CodeReview | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReviewRequest = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setReview(null);

    try {
      const result = await getCodeReview(code, language);
      setReview(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to get review: ${errorMessage}`);
      setReview({
        summary: "Error during review.",
        issues: [{ category: 'Bug', description: `An error occurred: ${errorMessage}` }]
      });
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-300 flex items-center">
              <CodeIcon />
              Your Code
            </h2>
            <LanguageSelector
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <CodeInput value={code} onChange={(e) => setCode(e.target.value)} />
          <ActionButton
            onClick={handleReviewRequest}
            isLoading={isLoading}
            disabled={!code.trim()}
          />
          {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        </div>
        <div className="lg:w-1/2 flex flex-col">
           <ReviewOutput review={review} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default App;
