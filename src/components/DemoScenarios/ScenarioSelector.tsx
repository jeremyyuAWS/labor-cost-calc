import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ScenarioCard } from './ScenarioCard';
import { CalculatorContext } from '../../context/CalculatorContext';
import { useContext } from 'react';

// Sample demo scenarios
const demoScenarios = [
  {
    id: 'enterprise-customer-service',
    title: 'Enterprise Customer Service',
    description: 'AI agents handling customer inquiries and support tickets for a large corporation',
    data: {
      humanLabor: {
        employeeSalary: 65000,
        employeeHoursPerDay: 8,
        employeeCount: 25,
        employeeOverheadPercentage: 30
      },
      agentLabor: {
        agentCostPerHour: 25,
        agentHoursPerDay: 24,
        agentEfficiencyMultiplier: 3.2,
        agentImplementationCost: 25000
      }
    }
  },
  {
    id: 'small-business-automation',
    title: 'Small Business Automation',
    description: 'AI agents handling administrative tasks and data entry for a small business',
    data: {
      humanLabor: {
        employeeSalary: 45000,
        employeeHoursPerDay: 8,
        employeeCount: 3,
        employeeOverheadPercentage: 20
      },
      agentLabor: {
        agentCostPerHour: 15,
        agentHoursPerDay: 24,
        agentEfficiencyMultiplier: 2.5,
        agentImplementationCost: 5000
      }
    }
  },
  {
    id: 'healthcare-admin',
    title: 'Healthcare Administrative Support',
    description: 'AI agents handling patient scheduling, records management, and billing inquiries',
    data: {
      humanLabor: {
        employeeSalary: 55000,
        employeeHoursPerDay: 8,
        employeeCount: 12,
        employeeOverheadPercentage: 35
      },
      agentLabor: {
        agentCostPerHour: 20,
        agentHoursPerDay: 24,
        agentEfficiencyMultiplier: 2.8,
        agentImplementationCost: 30000
      }
    }
  }
];

export const ScenarioSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useContext(CalculatorContext);

  const handleSelectScenario = (scenarioId: string) => {
    const selectedScenario = demoScenarios.find(scenario => scenario.id === scenarioId);
    if (selectedScenario) {
      dispatch({ type: 'SET_CALCULATOR_STATE', payload: selectedScenario.data });
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full mb-6">
      <div 
        className="bg-white p-4 rounded-lg shadow-md cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">Select Demo Scenario</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {isOpen && (
        <div className="mt-2 bg-white rounded-lg shadow-md p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demoScenarios.map(scenario => (
            <ScenarioCard 
              key={scenario.id}
              title={scenario.title}
              description={scenario.description}
              onClick={() => handleSelectScenario(scenario.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScenarioSelector;