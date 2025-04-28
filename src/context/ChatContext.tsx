import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define message structure
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  visual?: {
    type: 'chart' | 'image';
    data: any;
  };
}

// Define chat context state
interface ChatContextState {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  conversationContext: string[];
  addToContext: (context: string) => void;
  clearContext: () => void;
  exportChatHistory: () => void;
}

// Create context with default values
export const ChatContext = createContext<ChatContextState>({
  messages: [],
  addMessage: () => {},
  clearMessages: () => {},
  isProcessing: false,
  setIsProcessing: () => {},
  conversationContext: [],
  addToContext: () => {},
  clearContext: () => {},
  exportChatHistory: () => {}
});

// Chat provider component
interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  // Load messages from localStorage on initial render
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        // Parse the saved messages and convert string timestamps back to Date objects
        return JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (error) {
        console.error('Error loading chat history:', error);
        return [];
      }
    }
    return [];
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);
  
  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  
  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };
  
  const addToContext = (context: string) => {
    setConversationContext(prev => {
      // Keep only the last 5 contexts to prevent the array from growing too large
      const newContext = [...prev, context];
      return newContext.slice(Math.max(0, newContext.length - 5));
    });
  };
  
  const clearContext = () => {
    setConversationContext([]);
  };
  
  const exportChatHistory = () => {
    // Create the CSV content
    const csvContent = 
      'Timestamp,Sender,Message\n' + 
      messages.map(msg => {
        const timestamp = msg.timestamp.toLocaleString();
        const sender = msg.sender === 'user' ? 'You' : 'AI Assistant';
        // Escape quotes and wrap the message in quotes to handle commas and line breaks
        const text = `"${msg.text.replace(/"/g, '""')}"`;
        
        return `${timestamp},${sender},${text}`;
      }).join('\n');
    
    // Create a blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a link element to download the CSV file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `chat-history-${new Date().toISOString().slice(0, 10)}.csv`;
    link.style.display = 'none';
    
    // Add the link to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <ChatContext.Provider 
      value={{ 
        messages, 
        addMessage, 
        clearMessages, 
        isProcessing, 
        setIsProcessing,
        conversationContext,
        addToContext,
        clearContext,
        exportChatHistory
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;