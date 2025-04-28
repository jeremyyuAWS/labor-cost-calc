import React, { useState, useEffect } from 'react';
import ChatInterface from '../components/Chat/ChatInterface';
import Calculator from './Calculator';
import { useLocation } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-160px)]">
      <div className={showCalculator ? "lg:col-span-1" : "lg:col-span-3"}>
        <div className="h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
          <ChatInterface 
            showCalculator={showCalculator} 
            setShowCalculator={setShowCalculator} 
          />
        </div>
      </div>
      
      {showCalculator && (
        <div className="lg:col-span-2 overflow-auto pb-8">
          <Calculator />
        </div>
      )}
    </div>
  );
};

export default ChatPage;