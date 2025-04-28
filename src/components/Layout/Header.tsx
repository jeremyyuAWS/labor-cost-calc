import React from 'react';
import { Zap, MessageSquare, BarChart3 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'chat' | 'calculator';
  setActiveTab: (tab: 'chat' | 'calculator') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800">Lyzr Agent Platform</h1>
          </div>
          
          <div className="flex">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center px-4 py-2 mr-2 rounded-md ${
                activeTab === 'chat' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare size={18} className="mr-2" />
              Chat
            </button>
            
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === 'calculator' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 size={18} className="mr-2" />
              Calculator
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;