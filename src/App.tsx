import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Calculator from './pages/Calculator';
import ChatPage from './pages/ChatPage';
import WelcomeModal from './components/WelcomeModal';
import { ChatProvider } from './context/ChatContext';

function App() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'calculator'>('chat');
  
  return (
    <ChatProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          {activeTab === 'chat' ? (
            <ChatPage />
          ) : (
            <Calculator />
          )}
        </main>
        
        <Footer />
        
        {showWelcomeModal && (
          <WelcomeModal onClose={() => setShowWelcomeModal(false)} />
        )}
      </div>
    </ChatProvider>
  );
}

export default App;