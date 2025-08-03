import React from "react";
import { LogoIcon } from "./icons";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center">
        <LogoIcon />
        <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          Assisto Code Reviewer
        </h1>
      </div>
    </header>
  );
};

export default Header;
