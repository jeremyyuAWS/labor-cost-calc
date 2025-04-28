import React, { useState } from 'react';
import HumanLabor from '../components/Calculator/HumanLabor';
import AgentLabor from '../components/Calculator/AgentLabor';
import CalculationResults from '../components/Calculator/CalculationResults';
import AssumptionsPanel from '../components/Calculator/AssumptionsPanel';
import ScenarioSelector from '../components/DemoScenarios/ScenarioSelector';
import SavingsCard from '../components/Visualizations/SavingsCard';
import ReportViewer from '../components/SummaryReport/ReportViewer';
import AgentConfigPanel from '../components/AgentConfig/AgentConfigPanel';
import FeedbackForm from '../components/Feedback/FeedbackForm';
import { BarChart } from '../components/Visualizations/BarChart';
import { LineChart } from '../components/Visualizations/LineChart';
import { useContext } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import { calculateResults } from '../utils/calculations';
import { Table as Tabs, BookOpen, BarChart3, Settings, FileText } from 'lucide-react';

const Calculator = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const { state } = useContext(CalculatorContext);
  const results = calculateResults(state);

  // Data for visualizations
  const costComparisonData = {
    labels: ['Human', 'AI Agent'],
    datasets: [
      {
        label: 'Cost per Task ($)',
        data: [Math.round(results.humanCostPerTask), Math.round(results.agentCostPerTask)],
        backgroundColor: ['#ef4444', '#22c55e'],
      }
    ]
  };
  
  const timelineData = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
    datasets: [
      {
        label: 'Human Cost',
        data: Array(6).fill(0).map((_, i) => Math.round(results.humanCostPerTask * results.tasksPerMonth * (i + 1))),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      },
      {
        label: 'AI Agent Cost',
        data: Array(6).fill(0).map((_, i) => Math.round(state.agentLabor.agentImplementationCost + (results.agentCostPerTask * results.tasksPerMonth * (i + 1)))),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4
      },
      {
        label: 'Cumulative Savings',
        data: Array(6).fill(0).map((_, i) => {
          const humanCost = results.humanCostPerTask * results.tasksPerMonth * (i + 1);
          const aiCost = state.agentLabor.agentImplementationCost + (results.agentCostPerTask * results.tasksPerMonth * (i + 1));
          return Math.round(humanCost - aiCost);
        }),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  // Tab components
  const tabComponents = {
    calculator: (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column */}
          <div className="space-y-8">
            <HumanLabor />
            <AgentLabor />
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            <SavingsCard />
            <CalculationResults />
          </div>
        </div>
        
        {/* Data Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Cost Comparison</h3>
            <div className="h-64">
              <BarChart 
                title="Human vs AI Agent Cost"
                labels={costComparisonData.labels}
                datasets={costComparisonData.datasets}
                yAxisLabel="Cost ($)"
              />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Cost Projection (6 Months)</h3>
            <div className="h-64">
              <LineChart 
                title="6-Month Cost Projection"
                labels={timelineData.labels}
                datasets={timelineData.datasets}
                yAxisLabel="Cost ($)"
              />
            </div>
          </div>
        </div>
        
        {/* Assumptions Panel */}
        <div className="mt-8">
          <AssumptionsPanel />
        </div>
      </>
    ),
    report: <ReportViewer />,
    configure: (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AgentConfigPanel />
        <FeedbackForm />
      </div>
    )
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Labor Cost Calculator</h1>
        <p className="text-gray-600">
          Compare the cost of human labor vs. AI-powered agents for your business tasks
        </p>
      </div>
      
      {/* Demo Scenario Selector */}
      <div className="mb-8">
        <ScenarioSelector />
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`py-3 px-6 font-medium flex items-center transition-colors ${
            activeTab === 'calculator' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('calculator')}
        >
          <BarChart3 size={18} className="mr-2" />
          Calculator
        </button>
        <button
          className={`py-3 px-6 font-medium flex items-center transition-colors ${
            activeTab === 'report' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('report')}
        >
          <FileText size={18} className="mr-2" />
          Report
        </button>
        <button
          className={`py-3 px-6 font-medium flex items-center transition-colors ${
            activeTab === 'configure' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('configure')}
        >
          <Settings size={18} className="mr-2" />
          Configure
        </button>
      </div>
      
      {/* Tab Content */}
      {tabComponents[activeTab as keyof typeof tabComponents]}
    </div>
  );
};

export default Calculator;