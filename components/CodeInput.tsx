
import React from 'react';

interface CodeInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex-grow flex">
        <textarea
        value={value}
        onChange={onChange}
        placeholder="Paste your code here..."
        className="w-full h-full flex-grow font-mono text-sm bg-gray-950/50 border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors duration-200 min-h-[300px] lg:min-h-0"
        spellCheck="false"
        />
    </div>
  );
};

export default CodeInput;
