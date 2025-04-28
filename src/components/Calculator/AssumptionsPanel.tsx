import React, { useContext } from 'react';
import { CalculatorContext } from '../../context/CalculatorContext';
import { calculateEmployeeHourlyCost } from '../../utils/calculations';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const AssumptionsPanel: React.FC = () => {
  const { state } = useContext(CalculatorContext);
  
  const employeeHourlyCost = calculateEmployeeHourlyCost(
    state.humanLabor.employeeSalary, 
    state.humanLabor.employeeOverheadPercentage
  );
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Calculation Assumptions</h2>
      <div className="space-y-4">
        <div className="border-b pb-2">
          <p className="text-sm text-gray-600">Current values used for ROI calculation:</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Human Labor Assumptions */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-800">Human Labor</h3>
            <p className="flex justify-between">
              <span>Average hourly cost:</span> 
              <span className="font-medium">{formatCurrency(employeeHourlyCost)}</span>
            </p>
            <p className="flex justify-between">
              <span>Annual salary:</span> 
              <span className="font-medium">{formatCurrency(state.humanLabor.employeeSalary)}</span>
            </p>
            <p className="flex justify-between">
              <span>Overhead percentage:</span> 
              <span className="font-medium">{formatPercentage(state.humanLabor.employeeOverheadPercentage)}</span>
            </p>
            <p className="flex justify-between">
              <span>Hours per day:</span> 
              <span className="font-medium">{state.humanLabor.employeeHoursPerDay} hours</span>
            </p>
          </div>
          
          {/* AI Agent Assumptions */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-800">AI Agent</h3>
            <p className="flex justify-between">
              <span>Agent hourly cost:</span> 
              <span className="font-medium">{formatCurrency(state.agentLabor.agentCostPerHour)}</span>
            </p>
            <p className="flex justify-between">
              <span>Efficiency multiplier:</span> 
              <span className="font-medium">{state.agentLabor.agentEfficiencyMultiplier}x</span>
            </p>
            <p className="flex justify-between">
              <span>Hours per day:</span> 
              <span className="font-medium">{state.agentLabor.agentHoursPerDay} hours</span>
            </p>
            <p className="flex justify-between">
              <span>Implementation cost:</span> 
              <span className="font-medium">{formatCurrency(state.agentLabor.agentImplementationCost)}</span>
            </p>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-3 rounded-md mt-4">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">Note:</span> These assumptions are used to calculate the ROI of implementing AI agents. Adjust the values in the inputs above to see different scenarios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssumptionsPanel;