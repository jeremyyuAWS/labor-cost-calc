import React from 'react';
import { X, PieChart, DollarSign, Notebook as Robot, BarChart, MessageSquare } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-700">Welcome to the AI Labor Cost Calculator</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Robot className="mr-2 text-blue-600" size={22} />
                AI Agents at Your Service
              </h3>
              <p className="text-gray-700 mb-4">
                This app is powered by AI agents from the Lyzr platform. Each agent helps you complete specific tasks faster and more intelligently.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-700 mb-2">Cost Analysis Agent</h4>
                  <p className="text-sm text-gray-600">Analyzes and compares human vs AI labor costs based on your inputs</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-700 mb-2">Optimization Agent</h4>
                  <p className="text-sm text-gray-600">Recommends optimal task allocation between human and AI resources</p>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <MessageSquare className="mr-2 text-blue-600" size={22} />
                New Chat Interface
              </h3>
              <p className="text-gray-700 mb-4">
                Now you can interact with our AI cost calculator through a conversational interface:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Ask about ROI calculations and cost savings directly</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Get personalized analysis of your cost data</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Quickly compare different scenarios with natural language</span>
                </li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <BarChart className="mr-2 text-blue-600" size={22} />
                Key Features
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Compare human labor costs with AI-powered alternatives</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Visualize potential savings with interactive charts</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Simulate different scenarios with pre-built templates</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Generate detailed ROI reports for stakeholders</span>
                </li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <DollarSign className="mr-2 text-blue-600" size={22} />
                How to Use This Calculator
              </h3>
              <ol className="space-y-3 text-gray-700 list-decimal pl-5">
                <li>Try the chat interface by asking questions about cost savings or ROI</li>
                <li>Enter your human labor details (hourly rates, time spent on tasks)</li>
                <li>Configure AI agent settings for comparison</li>
                <li>View the calculated results and potential savings</li>
                <li>Use the demo scenarios for quick comparisons of common business tasks</li>
              </ol>
            </section>
            
            <div className="mt-2 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 italic">
                This is an AI-generated analysis tool. Please review all recommendations before taking action. 
                <a href="https://www.lyzr.ai/responsible-ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  Learn more about Lyzr's Responsible AI
                </a>
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;