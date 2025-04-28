import React, { useState, useContext } from 'react';
import { Settings, Zap, Brain, Sliders, Info } from 'lucide-react';
import { CalculatorContext } from '../../context/CalculatorContext';

const AgentConfigPanel: React.FC = () => {
  const { state, dispatch } = useContext(CalculatorContext);
  const [advancedMode, setAdvancedMode] = useState(false);
  
  // Placeholder for agent model types
  const agentModels = [
    { id: 'gpt4', name: 'GPT-4 Turbo', description: 'Highest capability, best for complex tasks' },
    { id: 'gpt35', name: 'GPT-3.5', description: 'Good balance between cost and capability' },
    { id: 'claude3', name: 'Claude 3 Opus', description: 'Strong reasoning and planning capabilities' },
    { id: 'llama3', name: 'Llama 3', description: 'Open source option with good performance' }
  ];
  
  // Agent types with different capabilities
  const agentTypes = [
    { id: 'assistant', name: 'Basic Assistant', description: 'Handles simple, repetitive tasks', efficiencyMultiplier: 1.5 },
    { id: 'analyst', name: 'Data Analyst', description: 'Processes and analyzes data sets', efficiencyMultiplier: 2 },
    { id: 'specialist', name: 'Domain Specialist', description: 'Specialized in a specific business domain', efficiencyMultiplier: 2.5 },
    { id: 'supervisor', name: 'Team Supervisor', description: 'Manages and coordinates other agents', efficiencyMultiplier: 3 }
  ];
  
  // Toggle advanced mode
  const handleToggleAdvanced = () => {
    setAdvancedMode(!advancedMode);
  };
  
  // Update agent type (updates efficiency multiplier)
  const handleAgentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = agentTypes.find(type => type.id === e.target.value);
    if (selectedType) {
      dispatch({
        type: 'UPDATE_AGENT_LABOR',
        payload: { agentEfficiencyMultiplier: selectedType.efficiencyMultiplier }
      });
    }
  };
  
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const numValue = type === 'number' ? parseFloat(value) : value;
    
    dispatch({
      type: 'UPDATE_AGENT_LABOR',
      payload: { [name]: numValue }
    });
  };
  
  // Handle slider changes
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_AGENT_LABOR',
      payload: { [name]: parseFloat(value) }
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Settings className="mr-2 text-blue-600" size={20} />
          Agent Configuration
        </h2>
        <button
          onClick={handleToggleAdvanced}
          className={`text-sm px-3 py-1 rounded-full flex items-center ${
            advancedMode ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {advancedMode ? 'Advanced Mode' : 'Basic Mode'}
          <Sliders size={14} className="ml-1" />
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Agent Type Selection */}
        <div>
          <label htmlFor="agentType" className="block text-sm font-medium text-gray-700 mb-1">
            Agent Type
          </label>
          <div className="relative">
            <select
              id="agentType"
              name="agentType"
              onChange={handleAgentTypeChange}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              defaultValue="analyst"
            >
              {agentTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name} (Efficiency: {type.efficiencyMultiplier}x)
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Different agent types have varying efficiency multipliers
          </p>
        </div>
        
        {/* Model Selection (only in advanced mode) */}
        {advancedMode && (
          <div>
            <label htmlFor="agentModel" className="block text-sm font-medium text-gray-700 mb-1">
              Underlying Model
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {agentModels.map(model => (
                <div
                  key={model.id}
                  className="border border-gray-200 rounded-md p-3 hover:bg-blue-50 hover:border-blue-300 cursor-pointer"
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id={`model-${model.id}`}
                      name="agentModel"
                      value={model.id}
                      className="mt-1 mr-2"
                    />
                    <div>
                      <label 
                        htmlFor={`model-${model.id}`}
                        className="font-medium text-gray-700 cursor-pointer"
                      >
                        {model.name}
                      </label>
                      <p className="text-xs text-gray-500">{model.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Efficiency Slider */}
        <div>
          <label htmlFor="agentEfficiencyMultiplier" className="block text-sm font-medium text-gray-700 mb-1">
            Efficiency Multiplier: {state.agentLabor.agentEfficiencyMultiplier}x
          </label>
          <input
            type="range"
            id="agentEfficiencyMultiplier"
            name="agentEfficiencyMultiplier"
            min="1"
            max="5"
            step="0.1"
            value={state.agentLabor.agentEfficiencyMultiplier}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Lower (1x)</span>
            <span>Average (2.5x)</span>
            <span>Higher (5x)</span>
          </div>
        </div>
        
        {/* Cost Settings */}
        <div>
          <label htmlFor="agentCostPerHour" className="block text-sm font-medium text-gray-700 mb-1">
            Cost Per Hour ($)
          </label>
          <input
            type="number"
            id="agentCostPerHour"
            name="agentCostPerHour"
            min="0"
            step="0.01"
            value={state.agentLabor.agentCostPerHour}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Advanced Settings (only in advanced mode) */}
        {advancedMode && (
          <>
            <div className="border-t pt-4 mt-4">
              <h3 className="text-md font-medium mb-3 flex items-center">
                <Brain className="mr-2 text-purple-600" size={16} />
                Advanced Parameters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="confidenceThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                    Confidence Threshold: 75%
                  </label>
                  <input
                    type="range"
                    id="confidenceThreshold"
                    name="confidenceThreshold"
                    min="50"
                    max="99"
                    step="1"
                    defaultValue="75"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Higher values reduce errors but may increase human review frequency
                  </p>
                </div>
                
                <div>
                  <label htmlFor="maxTokens" className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Tokens: 4096
                  </label>
                  <input
                    type="range"
                    id="maxTokens"
                    name="maxTokens"
                    min="1024"
                    max="8192"
                    step="1024"
                    defaultValue="4096"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1K</span>
                    <span>4K</span>
                    <span>8K</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="text-md font-medium mb-3 flex items-center">
                <Zap className="mr-2 text-amber-500" size={16} />
                Deployment Options
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Runtime Environment
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="runtime-cloud"
                        name="runtime"
                        type="radio"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="runtime-cloud" className="ml-2 text-sm text-gray-700">
                        Cloud (Managed)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="runtime-hybrid"
                        name="runtime"
                        type="radio"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="runtime-hybrid" className="ml-2 text-sm text-gray-700">
                        Hybrid (Cloud + On-Premise)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="runtime-local"
                        name="runtime"
                        type="radio"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="runtime-local" className="ml-2 text-sm text-gray-700">
                        Local Only (Private)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded flex items-start border border-blue-100">
        <Info className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
        <div className="text-sm text-blue-700">
          <p className="mb-1">
            These are simulated configuration options. In a production environment, these settings would connect to the Lyzr platform API.
          </p>
          <a 
            href="https://www.lyzr.ai/responsible-ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline text-xs"
          >
            Learn more about Lyzr's Responsible AI
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgentConfigPanel;