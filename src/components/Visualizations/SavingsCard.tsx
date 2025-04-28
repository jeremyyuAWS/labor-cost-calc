import React, { useContext } from 'react';
import { TrendingUp, DollarSign, Clock } from 'lucide-react';
import { CalculatorContext } from '../../context/CalculatorContext';
import { calculateResults } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

const SavingsCard = () => {
  const { state } = useContext(CalculatorContext);
  const results = calculateResults(state);
  
  // Get the calculated values
  const monthlySavings = Math.round(results.monthlyCostSavings);
  const yearlySavings = Math.round(results.yearlyProjectedSavings);
  const timeReduction = Math.round(results.timeSavingsPercentage);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <TrendingUp className="mr-2 text-green-500" size={24} />
        Projected Savings
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <DollarSign className="mr-2 text-green-600" size={20} />
            <h3 className="font-semibold text-gray-700">Cost Savings</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(monthlySavings)}</p>
          <p className="text-sm text-gray-600">Monthly savings</p>
          <p className="text-lg font-bold text-green-600 mt-2">{formatCurrency(yearlySavings)}</p>
          <p className="text-sm text-gray-600">Annual savings</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Clock className="mr-2 text-blue-600" size={20} />
            <h3 className="font-semibold text-gray-700">Time Efficiency</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{timeReduction}%</p>
          <p className="text-sm text-gray-600">Time reduction</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${timeReduction}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mt-4">
        <p className="mb-1">
          <span className="font-semibold">Note:</span> These projections are based on the current input values and assumptions.
        </p>
        <p className="text-xs italic">
          This is an AI-generated calculation. Please review assumptions before making business decisions.
        </p>
      </div>
    </div>
  );
};

export default SavingsCard;