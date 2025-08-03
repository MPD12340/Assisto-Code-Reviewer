
import React from 'react';
import type { CodeReview, ReviewIssue, IssueCategory } from '../types';
import { BugIcon, SecurityIcon, PerformanceIcon, StyleIcon, SuggestionIcon, SummaryIcon, SparklesIcon } from './icons';

const categoryConfig: Record<IssueCategory, { icon: React.ReactNode; color: string; title: string }> = {
    Bug: { icon: <BugIcon />, color: 'border-red-500/50', title: 'Bug' },
    Security: { icon: <SecurityIcon />, color: 'border-yellow-500/50', title: 'Security Concern' },
    Performance: { icon: <PerformanceIcon />, color: 'border-purple-500/50', title: 'Performance' },
    Style: { icon: <StyleIcon />, color: 'border-cyan-500/50', title: 'Style Suggestion' },
    Suggestion: { icon: <SuggestionIcon />, color: 'border-green-500/50', title: 'General Suggestion' }
};

const IssueCard: React.FC<{ issue: ReviewIssue }> = ({ issue }) => {
    const config = categoryConfig[issue.category] || categoryConfig.Suggestion;

    return (
        <div className={`bg-gray-800/50 border-l-4 ${config.color} p-4 rounded-r-lg`}>
            <div className="flex items-center mb-2">
                {config.icon}
                <h4 className="font-semibold text-gray-200">{config.title}</h4>
                {issue.line && <span className="ml-auto text-xs font-mono bg-gray-700 text-gray-300 px-2 py-1 rounded">Line: {issue.line}</span>}
            </div>
            <p className="text-gray-300 text-sm">{issue.description}</p>
        </div>
    );
};

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-3/4"></div>
        <div className="space-y-3">
            <div className="h-20 bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-700 rounded"></div>
        </div>
    </div>
);

const InitialState: React.FC = () => (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-800/30 rounded-lg border-2 border-dashed border-gray-700">
        <SparklesIcon />
        <h3 className="mt-4 text-xl font-semibold text-gray-300">AI Code Review Awaits</h3>
        <p className="mt-1 text-gray-400">Paste your code, select a language, and click "Review Code" to get started.</p>
    </div>
);


const ReviewOutput: React.FC<{ review: CodeReview | null; isLoading: boolean }> = ({ review, isLoading }) => {
    return (
        <div className="bg-gray-800/50 rounded-lg p-4 md:p-6 flex-grow h-full overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-300 mb-4 flex items-center"><SummaryIcon /> Review Summary</h2>
            {isLoading && <LoadingSkeleton />}
            {!isLoading && !review && <InitialState />}
            {!isLoading && review && (
                <div className="space-y-4">
                    <p className="text-gray-300 bg-gray-900/50 p-4 rounded-lg italic">{review.summary}</p>
                    {review.issues.length > 0 ? (
                         <div className="space-y-3">
                            {review.issues.map((issue, index) => <IssueCard key={index} issue={issue} />)}
                         </div>
                    ) : (
                         <div className="text-center py-8 text-gray-400">
                            <p>No issues found. Great job!</p>
                         </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReviewOutput;
