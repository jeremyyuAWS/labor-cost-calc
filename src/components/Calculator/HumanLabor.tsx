import React, { useContext } from 'react';
import { Users, DollarSign, Clock } from 'lucide-react';
import { CalculatorContext } from '../../context/CalculatorContext';
import { formatCurrency } from '../../utils/formatters';

const HumanLabor = () => {
  const { state, dispatch } = useContext(CalculatorContext);
  const { employeeCount, employeeSalary, employeeHoursPerDay, employeeOverheadPercentage } = state.humanLabor;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_HUMAN_LABOR',
      payload: { [name]: parseFloat(value) || 0 }
    });
  };

  // Calculate monthly cost
  const monthlyCost = (employeeSalary / 12) * employeeCount * (1 + employeeOverheadPercentage / 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Users className="mr-2 text-blue-600" size={20} />
        Human Labor Costs
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Employees
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users size={18} className="text-gray-400" />
            </div>
            <input
              type="number"
              id="employeeCount"
              name="employeeCount"
              min={1}
              value={employeeCount}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-12 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="1"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="employeeSalary" className="block text-sm font-medium text-gray-700 mb-1">
            Average Annual Salary ($)
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign size={18} className="text-gray-400" />
            </div>
            <input
              type="number"
              id="employeeSalary"
              name="employeeSalary"
              min={0}
              value={employeeSalary}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-12 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="75000"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">/year</span>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="employeeHoursPerDay" className="block text-sm font-medium text-gray-700 mb-1">
            Hours Per Day
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock size={18} className="text-gray-400" />
            </div>
            <input
              type="number"
              id="employeeHoursPerDay"
              name="employeeHoursPerDay"
              min={1}
              max={24}
              value={employeeHoursPerDay}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-12 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="8"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">hours</span>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="employeeOverheadPercentage" className="block text-sm font-medium text-gray-700 mb-1">
            Overhead Percentage (%)
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="number"
              id="employeeOverheadPercentage"
              name="employeeOverheadPercentage"
              min={0}
              max={100}
              value={employeeOverheadPercentage}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="30"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Includes benefits, taxes, workspace costs, etc.
          </p>
        </div>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-md">
        <p className="text-sm text-blue-700">
          <strong>Monthly Cost Estimate:</strong> {formatCurrency(monthlyCost)}
        </p>
      </div>
    </div>
  );
};

export default HumanLabor;