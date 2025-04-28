import React, { useContext } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorContext } from '../../context/CalculatorContext';

const AgentLabor: React.FC = () => {
  const { state, dispatch } = useContext(CalculatorContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_AGENT_LABOR',
      payload: { [name]: parseFloat(value) || 0 }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <Calculator className="h-5 w-5 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">AI Agent Configuration</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="agentCostPerHour" className="block text-sm font-medium text-gray-700 mb-1">
            Agent Cost ($/hour)
          </label>
          <input
            type="number"
            id="agentCostPerHour"
            name="agentCostPerHour"
            value={state.agentLabor.agentCostPerHour}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Estimate the hourly cost of running AI agents
          </p>
        </div>

        <div>
          <label htmlFor="agentHoursPerDay" className="block text-sm font-medium text-gray-700 mb-1">
            Agent Hours (hours/day)
          </label>
          <input
            type="number"
            id="agentHoursPerDay"
            name="agentHoursPerDay"
            value={state.agentLabor.agentHoursPerDay}
            onChange={handleInputChange}
            min="0"
            max="24"
            step="0.5"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="agentEfficiencyMultiplier" className="block text-sm font-medium text-gray-700 mb-1">
            Efficiency Multiplier
          </label>
          <input
            type="number"
            id="agentEfficiencyMultiplier"
            name="agentEfficiencyMultiplier"
            value={state.agentLabor.agentEfficiencyMultiplier}
            onChange={handleInputChange}
            min="1"
            step="0.1"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            How much more efficient are AI agents compared to humans? (e.g., 2x means twice as efficient)
          </p>
        </div>

        <div>
          <label htmlFor="agentImplementationCost" className="block text-sm font-medium text-gray-700 mb-1">
            Implementation Cost ($)
          </label>
          <input
            type="number"
            id="agentImplementationCost"
            name="agentImplementationCost"
            value={state.agentLabor.agentImplementationCost}
            onChange={handleInputChange}
            min="0"
            step="100"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            One-time cost to implement and deploy the AI solution
          </p>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-3 rounded-md">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">AI Agent Insight:</span> This is an AI-generated cost estimation. Please review before making business decisions.
        </p>
        <a href="https://www.lyzr.ai/responsible-ai" className="text-xs text-blue-600 underline mt-1 inline-block">
          Learn more about Lyzr's Responsible AI
        </a>
      </div>
    </div>
  );
};

export default AgentLabor;