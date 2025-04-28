import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, ToggleLeft, ToggleRight } from 'lucide-react';

const FeedbackForm: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send feedback to a server
    console.log({ feedback, rating, isLiveMode });
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFeedback('');
      setRating(null);
      setSubmitted(false);
    }, 3000);
  };
  
  const toggleMode = () => {
    setIsLiveMode(!isLiveMode);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <MessageSquare className="mr-2 text-purple-600" size={20} />
          Feedback &amp; Test Mode
        </h2>
        <button
          onClick={toggleMode}
          className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            isLiveMode 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          {isLiveMode 
            ? <><ToggleRight className="mr-1.5" size={16} /> Live Agent Mode</> 
            : <><ToggleLeft className="mr-1.5" size={16} /> Simulated Mode</>
          }
        </button>
      </div>
      
      {isLiveMode && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md mb-4">
          <p className="text-sm font-medium">Live Agent Mode is not yet available</p>
          <p className="text-xs">This feature will be enabled when the Lyzr API integration is complete.</p>
        </div>
      )}
      
      <div className={isLiveMode ? 'opacity-50 pointer-events-none' : ''}>
        {submitted ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-md text-center">
            <ThumbsUp className="inline-block mb-2" size={24} />
            <p className="font-medium">Thank you for your feedback!</p>
            <p className="text-sm">Your input helps us improve the calculator.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                Share your feedback on this calculator
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="What do you think of this calculator? Any suggestions for improvement?"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate this calculator?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      rating && rating >= star 
                        ? 'bg-purple-100 text-purple-600 hover:bg-purple-200' 
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                disabled={!feedback || rating === null}
                className={`px-4 py-2 rounded-md text-white transition-colors ${
                  feedback && rating !== null
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Submit Feedback
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setFeedback('');
                  setRating(null);
                }}
              >
                Clear
              </button>
            </div>
          </form>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Test Features &amp; Simulation Settings
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-md flex gap-2 items-center border border-gray-200 cursor-pointer hover:bg-gray-100">
            <input type="checkbox" id="enhance-charts" className="rounded text-purple-600 focus:ring-purple-500" />
            <label htmlFor="enhance-charts" className="text-sm text-gray-700 cursor-pointer">Enhanced Charts</label>
          </div>
          <div className="bg-gray-50 p-3 rounded-md flex gap-2 items-center border border-gray-200 cursor-pointer hover:bg-gray-100">
            <input type="checkbox" id="enable-predictions" className="rounded text-purple-600 focus:ring-purple-500" />
            <label htmlFor="enable-predictions" className="text-sm text-gray-700 cursor-pointer">AI Predictions</label>
          </div>
          <div className="bg-gray-50 p-3 rounded-md flex gap-2 items-center border border-gray-200 cursor-pointer hover:bg-gray-100">
            <input type="checkbox" id="debug-mode" className="rounded text-purple-600 focus:ring-purple-500" />
            <label htmlFor="debug-mode" className="text-sm text-gray-700 cursor-pointer">Debug Mode</label>
          </div>
          <div className="bg-gray-50 p-3 rounded-md flex gap-2 items-center border border-gray-200 cursor-pointer hover:bg-gray-100">
            <input type="checkbox" id="advanced-scenarios" className="rounded text-purple-600 focus:ring-purple-500" />
            <label htmlFor="advanced-scenarios" className="text-sm text-gray-700 cursor-pointer">Advanced Scenarios</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;