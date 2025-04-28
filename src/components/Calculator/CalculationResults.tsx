import React, { useContext } from 'react';
import { TrendingUp, ArrowDown, Clock, DollarSign } from 'lucide-react';
import { CalculatorContext } from '../../context/CalculatorContext';
import { calculateResults } from '../../utils/calculations';
import { formatCurrency, formatTime } from '../../utils/formatters';

const CalculationResults = () => {
  const { state } = useContext(CalculatorContext);
  const results = calculateResults(state);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Calculation Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cost Savings Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <DollarSign className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold">Cost Savings</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Per Task</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-green-600">${Math.round(results.costSavingsPerTask)}</p>
                <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  {Math.round(results.costSavingsPercentage)}% less
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Monthly</p>
              <p className="text-2xl font-bold">${Math.round(results.monthlyCostSavings)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Yearly Projected</p>
              <p className="text-2xl font-bold">${Math.round(results.yearlyProjectedSavings)}</p>
            </div>
          </div>
        </div>
        
        {/* Time Savings Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Clock className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Time Savings</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Per Task</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-blue-600">{Math.round(results.timeSavingsPerTask)} min</p>
                <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {Math.round(results.timeSavingsPercentage)}% faster
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Monthly</p>
              <p className="text-2xl font-bold">{Math.round(results.monthlyTimeSavings / 60)} hours</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Annual Employee Time</p>
              <p className="text-2xl font-bold">{Math.round(results.monthlyTimeSavings * 12 / 60)} hours</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600">
        <p className="font-semibold mb-1">
          <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs mr-2">AI-GENERATED</span>
          These calculations are based on the inputs provided and industry assumptions.
        </p>
        <p>Actual results may vary depending on specific business contexts and implementation details. 
        Review thoroughly before making business decisions.</p>
        <a 
          href="https://www.lyzr.ai/responsible-ai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline mt-1 inline-block"
        >
          Learn more about Lyzr's Responsible AI
        </a>
      </div>
    </div>
  );
};

export default CalculationResults;