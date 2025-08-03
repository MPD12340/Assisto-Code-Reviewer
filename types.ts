
export type IssueCategory = 'Bug' | 'Security' | 'Performance' | 'Style' | 'Suggestion';

export interface ReviewIssue {
    category: IssueCategory;
    description: string;
    line?: number;
}

export interface CodeReview {
    summary: string;
    issues: ReviewIssue[];
}
