import React, { useState, useRef, useEffect, useContext } from 'react';
import { Send, Bot, User, Calculator, ChevronDown, ChevronUp, Download, Trash2, Info } from 'lucide-react';
import { CalculatorContext } from '../../context/CalculatorContext';
import { ChatContext } from '../../context/ChatContext';
import { calculateResults } from '../../utils/calculations';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { BarChart } from '../Visualizations/BarChart';
import { LineChart } from '../Visualizations/LineChart';

interface ChatInterfaceProps {
  showCalculator: boolean;
  setShowCalculator: (show: boolean) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ showCalculator, setShowCalculator }) => {
  const { state: calculatorState } = useContext(CalculatorContext);
  const { 
    messages, 
    addMessage, 
    clearMessages,
    isProcessing, 
    setIsProcessing,
    conversationContext,
    addToContext,
    exportChatHistory
  } = useContext(ChatContext);
  
  const [input, setInput] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Start guided tour if no messages - ensure this only runs once
  useEffect(() => {
    if (messages.length === 0 && showIntro) {
      startGuidedTour();
      setShowIntro(false);
    }
  }, [messages.length, showIntro]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    // Add user message
    addMessage({
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    });
    
    // Add to conversation context
    addToContext(input);
    
    const userQuery = input;
    setInput('');
    setIsProcessing(true);
    
    // Process message with AI (simulated)
    setTimeout(() => {
      processUserQuery(userQuery);
    }, 1000);
  };
  
  const startGuidedTour = () => {
    // Single comprehensive welcome message
    addMessage({
      id: Date.now().toString(),
      text: `👋 Welcome to the AI Labor Cost Calculator! I can help you analyze the cost savings and ROI of implementing AI agents.

Here are some examples of what you can ask me:
• "What's the ROI for my current configuration?"
• "How much can I save monthly?"
• "Show me a cost comparison chart"
• "Update agent cost to $15 per hour"

Would you like me to guide you through a quick demo scenario?`,
      sender: 'agent',
      timestamp: new Date()
    });
  };
  
  const processUserQuery = (query: string) => {
    try {
      const lowerQuery = query.toLowerCase();
      const results = calculateResults(calculatorState);
      
      // Check for demo or walkthrough requests
      if (lowerQuery.includes('walk me through') || lowerQuery.includes('demo scenario') || lowerQuery.includes('show me a demo')) {
        const { dispatch } = useContext(CalculatorContext);
        
        // Reset to a specific configuration for the walkthrough
        dispatch({
          type: 'SET_CALCULATOR_STATE',
          payload: {
            humanLabor: {
              employeeSalary: 65000,
              employeeHoursPerDay: 8,
              employeeCount: 10,
              employeeOverheadPercentage: 30
            },
            agentLabor: {
              agentCostPerHour: 12,
              agentHoursPerDay: 24,
              agentEfficiencyMultiplier: 2.5,
              agentImplementationCost: 10000
            }
          }
        });
        
        // Show calculator
        setShowCalculator(true);
        
        // Enhanced walkthrough with rich conversation flow
        const demoMessages = [
          {
            id: Date.now().toString(),
            text: `👋 I'd be happy to walk you through a demo scenario! Let's explore how AI agents can transform a customer service team's operations.

I've loaded a realistic scenario:
• 10 customer service representatives with $65,000 annual salary
• AI agents at $12/hour with 2.5x efficiency
• $10,000 implementation cost

Let's start by looking at the cost comparison. Would you like to see how this compares to your current costs?`,
            sender: 'agent',
            timestamp: new Date()
          },
          {
            id: (Date.now() + 1).toString(),
            text: `Here's the cost comparison for handling customer inquiries:

• Human labor cost per inquiry: ${formatCurrency(calculateResults(calculatorState).humanCostPerTask)}
• AI agent cost per inquiry: ${formatCurrency(calculateResults(calculatorState).agentCostPerTask)}
• Cost reduction: ${Math.round(calculateResults(calculatorState).costSavingsPercentage)}% per inquiry

This means for every customer inquiry your team handles, you could save ${formatCurrency(calculateResults(calculatorState).costSavingsPerTask)} by using AI agents.

Would you like to see how this translates to monthly savings?`,
            sender: 'agent',
            timestamp: new Date()
          },
          {
            id: (Date.now() + 2).toString(),
            text: `Let's look at the monthly impact:

• Monthly cost savings: ${formatCurrency(calculateResults(calculatorState).monthlyCostSavings)}
• Annual savings: ${formatCurrency(calculateResults(calculatorState).yearlyProjectedSavings)}
• Break-even point: ${Math.ceil(calculatorState.agentLabor.agentImplementationCost / calculateResults(calculatorState).monthlyCostSavings)} months

The implementation cost of ${formatCurrency(calculatorState.agentLabor.agentImplementationCost)} would be recovered in just ${Math.ceil(calculatorState.agentLabor.agentImplementationCost / calculateResults(calculatorState).monthlyCostSavings)} months!

Would you like to see a visual comparison of these savings?`,
            sender: 'agent',
            timestamp: new Date()
          },
          {
            id: (Date.now() + 3).toString(),
            text: `Here's a visual breakdown of the cost comparison:`,
            sender: 'agent',
            timestamp: new Date(),
            visual: {
              type: 'chart',
              data: {
                type: 'bar',
                title: 'Cost Comparison per Customer Inquiry',
                data: {
                  labels: ['Human Labor', 'AI Agent'],
                  datasets: [{
                    label: 'Cost per Inquiry ($)',
                    data: [
                      Math.round(calculateResults(calculatorState).humanCostPerTask),
                      Math.round(calculateResults(calculatorState).agentCostPerTask)
                    ],
                    backgroundColor: ['#ef4444', '#22c55e']
                  }]
                },
                yAxisLabel: 'Cost ($)'
              }
            }
          },
          {
            id: (Date.now() + 4).toString(),
            text: `Now, let's examine the time efficiency:

• Human time per inquiry: ${Math.round(calculateResults(calculatorState).humanTimePerTask)} minutes
• AI agent time per inquiry: ${Math.round(calculateResults(calculatorState).agentTimePerTask)} minutes
• Time savings: ${Math.round(calculateResults(calculatorState).timeSavingsPerTask)} minutes (${Math.round(calculateResults(calculatorState).timeSavingsPercentage)}% faster)
• Monthly time savings: ${Math.round(calculateResults(calculatorState).monthlyTimeSavings / 60)} hours

This means your team could handle ${Math.round(calculateResults(calculatorState).timeSavingsPercentage)}% more customer inquiries in the same amount of time!

Would you like to see how this affects your ROI?`,
            sender: 'agent',
            timestamp: new Date()
          },
          {
            id: (Date.now() + 5).toString(),
            text: `Let's calculate the ROI:

• First-year ROI: ${formatPercentage((calculateResults(calculatorState).yearlyProjectedSavings - calculatorState.agentLabor.agentImplementationCost) / calculatorState.agentLabor.agentImplementationCost * 100)}
• Implementation cost: ${formatCurrency(calculatorState.agentLabor.agentImplementationCost)}
• Annual savings: ${formatCurrency(calculateResults(calculatorState).yearlyProjectedSavings)}
• Net first-year benefit: ${formatCurrency(calculateResults(calculatorState).yearlyProjectedSavings - calculatorState.agentLabor.agentImplementationCost)}

This means for every dollar invested in AI implementation, you'll get ${formatPercentage((calculateResults(calculatorState).yearlyProjectedSavings - calculatorState.agentLabor.agentImplementationCost) / calculatorState.agentLabor.agentImplementationCost * 100)} back in the first year!

Would you like to:
1. See a detailed breakdown of any of these metrics?
2. Try different scenarios by adjusting the parameters?
3. Export this analysis for your team?
4. Explore how this would work for a different team size or salary?

Just let me know what interests you most!`,
            sender: 'agent',
            timestamp: new Date()
          }
        ];

        // Add all demo messages
        demoMessages.forEach(message => {
          addMessage(message);
        });
        return;
      }
      
      // Check for chart requests
      if (lowerQuery.includes('chart') || lowerQuery.includes('graph') || lowerQuery.includes('visual')) {
        handleChartRequest(lowerQuery);
        return;
      }
      
      // Check for calculator parameter update queries
      if (lowerQuery.includes('set') || lowerQuery.includes('update') || lowerQuery.includes('change')) {
        // Handle parameter updates
        if (handleParameterUpdate(query)) {
          return; // Parameter update was handled
        }
      }
      
      // Check for export request
      if (lowerQuery.includes('export') || lowerQuery.includes('download') || lowerQuery.includes('save chat')) {
        exportChatHistory();
        addMessage({
          id: Date.now().toString(),
          text: `I've exported your chat history as a CSV file. It should be downloading now.`,
          sender: 'agent',
          timestamp: new Date()
        });
        return;
      }
      
      // Check for clear/reset request
      if (lowerQuery.includes('clear chat') || lowerQuery.includes('reset chat') || lowerQuery.includes('start over')) {
        clearMessages();
        setShowIntro(true);
        addMessage({
          id: Date.now().toString(),
          text: `I've cleared our conversation history. Let's start fresh! How can I help you with AI labor cost calculations today?`,
          sender: 'agent',
          timestamp: new Date()
        });
        return;
      }
      
      // Use conversation context to provide more relevant responses
      let contextualResponse = "";
      if (conversationContext.length > 0) {
        const previousQueries = conversationContext.join(" ");
        
        if (lowerQuery.includes('more') || lowerQuery.includes('details') || lowerQuery.includes('elaborate')) {
          if (previousQueries.includes('roi')) {
            const firstYearROI = (results.yearlyProjectedSavings - calculatorState.agentLabor.agentImplementationCost) / 
                                calculatorState.agentLabor.agentImplementationCost * 100;
            
            contextualResponse = `Let me elaborate on the ROI analysis:

The first-year ROI for implementing AI agents would be ${formatPercentage(firstYearROI)}. This means that for every dollar invested in the implementation, you'll get ${formatPercentage(firstYearROI)} in return within the first year.

Implementation cost: ${formatCurrency(calculatorState.agentLabor.agentImplementationCost)}
Annual savings: ${formatCurrency(results.yearlyProjectedSavings)}
Net first-year benefit: ${formatCurrency(results.yearlyProjectedSavings - calculatorState.agentLabor.agentImplementationCost)}
Break-even point: ${Math.ceil(calculatorState.agentLabor.agentImplementationCost / results.monthlyCostSavings)} months

Would you like to see how these numbers would change with different parameters?`;
          } else if (previousQueries.includes('savings') || previousQueries.includes('cost')) {
            contextualResponse = `Here's a more detailed breakdown of the cost savings:

Per task:
- Human labor: ${formatCurrency(results.humanCostPerTask)}
- AI agent: ${formatCurrency(results.agentCostPerTask)}
- Savings: ${formatCurrency(results.costSavingsPerTask)} (${Math.round(results.costSavingsPercentage)}%)

Monthly:
- Tasks per month: ${results.tasksPerMonth}
- Total savings: ${formatCurrency(results.monthlyCostSavings)}

Yearly projection:
- Annual savings: ${formatCurrency(results.yearlyProjectedSavings)}

Implementation cost recovery:
- Initial investment: ${formatCurrency(calculatorState.agentLabor.agentImplementationCost)}
- Months to break even: ${Math.ceil(calculatorState.agentLabor.agentImplementationCost / results.monthlyCostSavings)}`;
          }
        }
      }
      
      if (contextualResponse) {
        addMessage({
          id: Date.now().toString(),
          text: contextualResponse,
          sender: 'agent',
          timestamp: new Date()
        });
        return;
      }
      
      // Check for calculator-related queries
      if (lowerQuery.includes('roi') || 
          lowerQuery.includes('savings') || 
          lowerQuery.includes('cost') || 
          lowerQuery.includes('calculate')) {
        
        let response = '';
        
        if (lowerQuery.includes('roi') || lowerQuery.includes('return on investment')) {
          const firstYearROI = (results.yearlyProjectedSavings - calculatorState.agentLabor.agentImplementationCost) / 
                              calculatorState.agentLabor.agentImplementationCost * 100;
          
          response = `Based on your inputs, the first-year ROI for implementing AI agents would be ${formatPercentage(firstYearROI)}. 
          The implementation cost of ${formatCurrency(calculatorState.agentLabor.agentImplementationCost)} would be recovered in approximately 
          ${Math.ceil(calculatorState.agentLabor.agentImplementationCost / results.monthlyCostSavings)} months.`;
        } 
        else if (lowerQuery.includes('savings') || lowerQuery.includes('save')) {
          response = `By implementing AI agents with your current configuration, you can expect:
          • ${formatCurrency(results.costSavingsPerTask)} savings per task (${Math.round(results.costSavingsPercentage)}% reduction)
          • ${formatCurrency(results.monthlyCostSavings)} monthly cost savings
          • ${formatCurrency(results.yearlyProjectedSavings)} projected annual savings`;
        }
        else if (lowerQuery.includes('cost comparison') || lowerQuery.includes('compare costs')) {
          response = `Cost comparison between human labor and AI agents:
          • Human labor cost per task: ${formatCurrency(results.humanCostPerTask)}
          • AI agent cost per task: ${formatCurrency(results.agentCostPerTask)}
          • Difference: ${formatCurrency(results.costSavingsPerTask)} (${Math.round(results.costSavingsPercentage)}% savings)`;
        }
        else if (lowerQuery.includes('time') || lowerQuery.includes('efficiency')) {
          response = `Time efficiency comparison:
          • Human time per task: ${Math.round(results.humanTimePerTask)} minutes
          • AI agent time per task: ${Math.round(results.agentTimePerTask)} minutes
          • Time savings: ${Math.round(results.timeSavingsPerTask)} minutes (${Math.round(results.timeSavingsPercentage)}% faster)
          • Monthly time savings: ${Math.round(results.monthlyTimeSavings / 60)} hours`;
        }
        else {
          response = `Based on your current configuration:
          
          Monthly savings: ${formatCurrency(results.monthlyCostSavings)}
          Annual savings: ${formatCurrency(results.yearlyProjectedSavings)}
          Time reduction: ${Math.round(results.timeSavingsPercentage)}%
          
          Would you like to see more detailed information about ROI, costs, or time savings?`;
        }
        
        addMessage({
          id: Date.now().toString(),
          text: response,
          sender: 'agent',
          timestamp: new Date()
        });
      }
      // Check for calculator toggle commands
      else if (lowerQuery.includes('show calculator') || lowerQuery.includes('open calculator')) {
        setShowCalculator(true);
        addMessage({
          id: Date.now().toString(),
          text: `I've opened the calculator panel for you. You can now see and adjust all parameters directly.`,
          sender: 'agent',
          timestamp: new Date()
        });
      }
      else if (lowerQuery.includes('hide calculator') || lowerQuery.includes('close calculator')) {
        setShowCalculator(false);
        addMessage({
          id: Date.now().toString(),
          text: `I've closed the calculator panel. You can still ask me about calculations or request to show the calculator again.`,
          sender: 'agent',
          timestamp: new Date()
        });
      }
      // Check for help or instructions queries
      else if (lowerQuery.includes('help') || lowerQuery.includes('how to') || lowerQuery.includes('what can you do')) {
        addMessage({
          id: Date.now().toString(),
          text: `I can help you with:
          
          • Calculating ROI for implementing AI agents
          • Comparing costs between human labor and AI agents
          • Estimating time and cost savings
          • Analyzing the break-even point for your investment
          • Creating visual charts and comparisons
          
          You can ask me questions like:
          • "What's the ROI for this configuration?"
          • "How much can I save monthly?"
          • "Compare time efficiency between humans and AI agents"
          • "Show me a cost comparison chart"
          
          You can also update parameters by saying things like:
          • "Update agent cost to $15 per hour"
          • "Set employee count to 10"
          • "Change efficiency multiplier to 3.5"
          
          Say "show calculator" to see the full calculator panel.`,
          sender: 'agent',
          timestamp: new Date()
        });
      }
      // Greeting or acknowledgment
      else if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
        addMessage({
          id: Date.now().toString(),
          text: `Hello! I'm your AI Labor Cost Calculator assistant. How can I help you today? You can ask me about ROI calculations, cost savings, or time efficiency comparisons based on your current configuration.`,
          sender: 'agent',
          timestamp: new Date()
        });
      }
      // Other queries
      else {
        addMessage({
          id: Date.now().toString(),
          text: `I understand you're asking about "${query}". To provide the most accurate information, I focus on calculating and analyzing labor costs between human workers and AI agents.
          
          Would you like me to help you with:
          • ROI calculations
          • Cost savings estimates
          • Time efficiency comparisons
          • Break-even analysis
          • Visual charts of the data
          
          You can also say "show calculator" to view and adjust all parameters.`,
          sender: 'agent',
          timestamp: new Date()
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle chart visualization requests
  const handleChartRequest = (query: string) => {
    const results = calculateResults(calculatorState);
    
    if (query.includes('cost') || query.includes('savings')) {
      // Cost comparison chart
      const costComparisonData = {
        labels: ['Human Labor', 'AI Agent'],
        datasets: [
          {
            label: 'Cost per Task ($)',
            data: [Math.round(results.humanCostPerTask), Math.round(results.agentCostPerTask)],
            backgroundColor: ['#ef4444', '#22c55e'],
          }
        ]
      };
      
      addMessage({
        id: Date.now().toString(),
        text: `Here's a visual comparison of the cost per task between human labor and AI agents:`,
        sender: 'agent',
        timestamp: new Date(),
        visual: {
          type: 'chart',
          data: {
            type: 'bar',
            title: 'Cost Comparison',
            data: costComparisonData,
            yAxisLabel: 'Cost ($)'
          }
        }
      });
    } 
    else if (query.includes('time') || query.includes('efficiency')) {
      // Time comparison chart
      const timeComparisonData = {
        labels: ['Human Labor', 'AI Agent'],
        datasets: [
          {
            label: 'Time per Task (minutes)',
            data: [Math.round(results.humanTimePerTask), Math.round(results.agentTimePerTask)],
            backgroundColor: ['#3b82f6', '#8b5cf6'],
          }
        ]
      };
      
      addMessage({
        id: Date.now().toString(),
        text: `Here's a visual comparison of the time required per task between human labor and AI agents:`,
        sender: 'agent',
        timestamp: new Date(),
        visual: {
          type: 'chart',
          data: {
            type: 'bar',
            title: 'Time Efficiency Comparison',
            data: timeComparisonData,
            yAxisLabel: 'Minutes'
          }
        }
      });
    }
    else if (query.includes('roi') || query.includes('projection') || query.includes('timeline')) {
      // ROI projection chart
      const roiProjectionData = {
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
        datasets: [
          {
            label: 'Human Costs',
            data: Array(6).fill(0).map((_, i) => Math.round(results.humanCostPerTask * results.tasksPerMonth * (i + 1))),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4
          },
          {
            label: 'AI Costs (incl. implementation)',
            data: Array(6).fill(0).map((_, i) => Math.round(
              calculatorState.agentLabor.agentImplementationCost + 
              (results.agentCostPerTask * results.tasksPerMonth * (i + 1))
            )),
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.4
          },
          {
            label: 'Cumulative Savings',
            data: Array(6).fill(0).map((_, i) => {
              const humanCost = results.humanCostPerTask * results.tasksPerMonth * (i + 1);
              const aiCost = calculatorState.agentLabor.agentImplementationCost + 
                            (results.agentCostPerTask * results.tasksPerMonth * (i + 1));
              return Math.round(humanCost - aiCost);
            }),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4
          }
        ]
      };
      
      addMessage({
        id: Date.now().toString(),
        text: `Here's a 6-month projection showing the cumulative costs and savings:`,
        sender: 'agent',
        timestamp: new Date(),
        visual: {
          type: 'chart',
          data: {
            type: 'line',
            title: '6-Month Cost Projection',
            data: roiProjectionData,
            yAxisLabel: 'Cumulative Cost ($)'
          }
        }
      });
    }
    else {
      // General overview chart
      const overviewData = {
        labels: ['Monthly Savings', 'Annual Savings', 'Implementation Cost', 'Break-Even (months)'],
        datasets: [
          {
            label: 'Financial Overview ($)',
            data: [
              Math.round(results.monthlyCostSavings), 
              Math.round(results.yearlyProjectedSavings),
              Math.round(calculatorState.agentLabor.agentImplementationCost),
              Math.ceil(calculatorState.agentLabor.agentImplementationCost / results.monthlyCostSavings) * 1000 // Scale for visibility
            ],
            backgroundColor: ['#22c55e', '#3b82f6', '#ef4444', '#f59e0b'],
          }
        ]
      };
      
      addMessage({
        id: Date.now().toString(),
        text: `Here's an overview of key financial metrics for the AI implementation:

• Monthly savings: ${formatCurrency(results.monthlyCostSavings)}
• Annual savings: ${formatCurrency(results.yearlyProjectedSavings)}
• Implementation cost: ${formatCurrency(calculatorState.agentLabor.agentImplementationCost)}
• Break-even point: ${Math.ceil(calculatorState.agentLabor.agentImplementationCost / results.monthlyCostSavings)} months

The chart below visualizes these key metrics (note: break-even months are scaled by 1000 for visibility):`,
        sender: 'agent',
        timestamp: new Date(),
        visual: {
          type: 'chart',
          data: {
            type: 'bar',
            title: 'Financial Overview',
            data: overviewData,
            yAxisLabel: 'Amount ($)'
          }
        }
      });
    }
  };
  
  // Helper function to handle parameter updates via chat
  const handleParameterUpdate = (query: string): boolean => {
    const { dispatch } = useContext(CalculatorContext);
    const lowerQuery = query.toLowerCase();
    
    // Extract number from the query
    const numberMatch = query.match(/\$?\s*(\d+(\.\d+)?)/);
    if (!numberMatch) return false;
    
    const value = parseFloat(numberMatch[1]);
    if (isNaN(value)) return false;
    
    // Check which parameter is being updated
    if (lowerQuery.includes('agent cost') || lowerQuery.includes('cost per hour')) {
      dispatch({
        type: 'UPDATE_AGENT_LABOR',
        payload: { agentCostPerHour: value }
      });
      
      addMessage({
        id: Date.now().toString(),
        text: `I've updated the agent cost per hour to $${value.toFixed(2)}.`,
        sender: 'agent',
        timestamp: new Date()
      });
      return true;
    }
    else if (lowerQuery.includes('employee') && lowerQuery.includes('count')) {
      dispatch({
        type: 'UPDATE_HUMAN_LABOR',
        payload: { employeeCount: value }
      });
      
      addMessage({
        id: Date.now().toString(),
        text: `I've updated the employee count to ${value}.`,
        sender: 'agent',
        timestamp: new Date()
      });
      return true;
    }
    else if (lowerQuery.includes('efficiency') || lowerQuery.includes('multiplier')) {
      dispatch({
        type: 'UPDATE_AGENT_LABOR',
        payload: { agentEfficiencyMultiplier: value }
      });
      
      addMessage({
        id: Date.now().toString(),
        text: `I've updated the efficiency multiplier to ${value}x.`,
        sender: 'agent',
        timestamp: new Date()
      });
      return true;
    }
    else if (lowerQuery.includes('salary')) {
      dispatch({
        type: 'UPDATE_HUMAN_LABOR',
        payload: { employeeSalary: value }
      });
      
      addMessage({
        id: Date.now().toString(),
        text: `I've updated the employee annual salary to $${value.toFixed(2)}.`,
        sender: 'agent',
        timestamp: new Date()
      });
      return true;
    }
    else if (lowerQuery.includes('implementation') || lowerQuery.includes('setup cost')) {
      dispatch({
        type: 'UPDATE_AGENT_LABOR',
        payload: { agentImplementationCost: value }
      });
      
      addMessage({
        id: Date.now().toString(),
        text: `I've updated the implementation cost to $${value.toFixed(2)}.`,
        sender: 'agent',
        timestamp: new Date()
      });
      return true;
    }
    
    return false;
  };
  
  // Message component that can render visual elements
  const MessageContent = ({ message }: { message: Message }) => {
    if (message.visual && message.visual.type === 'chart') {
      const chartData = message.visual.data;
      
      return (
        <>
          <div className="whitespace-pre-line mb-3">{message.text}</div>
          <div className="bg-white rounded-md p-3 border border-gray-200 h-60 mb-2">
            {chartData.type === 'bar' ? (
              <BarChart
                title={chartData.title}
                labels={chartData.data.labels}
                datasets={chartData.data.datasets}
                yAxisLabel={chartData.yAxisLabel}
              />
            ) : (
              <LineChart
                title={chartData.title}
                labels={chartData.data.labels}
                datasets={chartData.data.datasets}
                yAxisLabel={chartData.yAxisLabel}
              />
            )}
          </div>
        </>
      );
    }
    
    return <div className="whitespace-pre-line">{message.text}</div>;
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold flex items-center">
          <Bot className="mr-2" size={20} />
          AI Labor Cost Assistant
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex items-center text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full"
          >
            <Calculator className="mr-1" size={16} />
            Calculator
            {showCalculator ? 
              <ChevronUp className="ml-1" size={16} /> : 
              <ChevronDown className="ml-1" size={16} />
            }
          </button>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30"
          >
            <Info size={16} />
          </button>
        </div>
      </div>
      
      {showMenu && (
        <div className="bg-white border-x border-b border-gray-200 p-3 flex space-x-2 rounded-b-lg shadow-sm">
          <button
            onClick={() => {
              startGuidedTour();
              setShowMenu(false);
            }}
            className="flex items-center text-sm px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
          >
            <Info size={14} className="mr-1" />
            Guided Tutorial
          </button>
          <button
            onClick={() => {
              exportChatHistory();
              setShowMenu(false);
            }}
            className="flex items-center text-sm px-3 py-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100"
          >
            <Download size={14} className="mr-1" />
            Export Chat
          </button>
          <button
            onClick={() => {
              clearMessages();
              setShowIntro(true);
              setShowMenu(false);
            }}
            className="flex items-center text-sm px-3 py-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100"
          >
            <Trash2 size={14} className="mr-1" />
            Clear Chat
          </button>
        </div>
      )}
      
      <div 
        ref={messagesContainerRef}
        className="flex-grow overflow-y-auto p-4 bg-gray-50"
      >
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bot size={40} className="mx-auto mb-4 text-blue-500" />
            <p className="text-lg font-medium mb-2">AI Labor Cost Assistant</p>
            <p className="max-w-md mx-auto">
              Ask me questions about cost savings, ROI, or efficiency comparisons 
              between human labor and AI agents based on your calculator parameters.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-start mb-1">
                  <div 
                    className={`rounded-full p-1 mr-2 ${
                      message.sender === 'user' 
                        ? 'bg-blue-700' 
                        : 'bg-blue-100'
                    }`}
                  >
                    {message.sender === 'user' 
                      ? <User size={14} className="text-white" /> 
                      : <Bot size={14} className="text-blue-600" />
                    }
                  </div>
                  <div className={`text-xs ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.sender === 'user' ? 'You' : 'AI Assistant'}
                    <span className="mx-1">•</span>
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
                <div className={message.sender === 'user' ? 'text-white' : 'text-gray-800'}>
                  <MessageContent message={message} />
                </div>
              </div>
            </div>
          ))
        )}
        {isProcessing && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="ml-2 text-sm text-gray-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about costs, savings, or ROI analysis..."
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isProcessing}
        />
        <button
          type="submit"
          className={`bg-blue-600 text-white p-2 rounded-r-md ${
            isProcessing || !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
          disabled={isProcessing || !input.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;