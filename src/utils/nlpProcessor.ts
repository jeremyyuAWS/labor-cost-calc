import { CalculatorState, CalculationResults } from '../types';

// Basic query intent detection
export const detectIntent = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('roi') || lowerQuery.includes('return on investment')) {
    return 'roi';
  }
  if (lowerQuery.includes('savings') || lowerQuery.includes('save')) {
    return 'savings';
  }
  if (lowerQuery.includes('cost comparison') || lowerQuery.includes('compare costs')) {
    return 'cost_comparison';
  }
  if (lowerQuery.includes('time') || lowerQuery.includes('efficiency')) {
    return 'time_efficiency';
  }
  if (lowerQuery.includes('chart') || lowerQuery.includes('graph') || lowerQuery.includes('visual')) {
    return 'visualization';
  }
  if (lowerQuery.includes('set') || lowerQuery.includes('update') || lowerQuery.includes('change')) {
    return 'parameter_update';
  }
  if (lowerQuery.includes('demo') || lowerQuery.includes('guide') || lowerQuery.includes('tutorial')) {
    return 'walkthrough';
  }
  if (lowerQuery.includes('help') || lowerQuery.includes('how to') || lowerQuery.includes('what can you do')) {
    return 'help';
  }
  if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
    return 'greeting';
  }
  if (lowerQuery.includes('show calculator') || lowerQuery.includes('open calculator')) {
    return 'show_calculator';
  }
  if (lowerQuery.includes('hide calculator') || lowerQuery.includes('close calculator')) {
    return 'hide_calculator';
  }
  if (lowerQuery.includes('export') || lowerQuery.includes('download') || lowerQuery.includes('save chat')) {
    return 'export';
  }
  if (lowerQuery.includes('clear chat') || lowerQuery.includes('reset chat') || lowerQuery.includes('start over')) {
    return 'clear_chat';
  }
  
  return 'unknown';
};

// Extract numerical values from queries
export const extractNumber = (query: string): number | null => {
  const numberMatch = query.match(/\$?\s*(\d+(\.\d+)?)/);
  if (!numberMatch) return null;
  
  return parseFloat(numberMatch[1]);
};

// Extract parameter to update
export const extractParameter = (query: string): string | null => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('agent cost') || lowerQuery.includes('cost per hour')) {
    return 'agentCostPerHour';
  }
  if (lowerQuery.includes('employee') && lowerQuery.includes('count')) {
    return 'employeeCount';
  }
  if (lowerQuery.includes('efficiency') || lowerQuery.includes('multiplier')) {
    return 'agentEfficiencyMultiplier';
  }
  if (lowerQuery.includes('salary')) {
    return 'employeeSalary';
  }
  if (lowerQuery.includes('implementation') || lowerQuery.includes('setup cost')) {
    return 'agentImplementationCost';
  }
  
  return null;
};

// Generate follow-up suggestions based on conversation
export const generateSuggestions = (
  intent: string, 
  state: CalculatorState, 
  results: CalculationResults
): string[] => {
  switch (intent) {
    case 'roi':
      return [
        'What's the break-even point?',
        'Show me an ROI chart',
        'How can I improve ROI?'
      ];
    case 'savings':
      return [
        'Show me a cost comparison chart',
        'How much time will I save?',
        'What if I increase efficiency to 3x?'
      ];
    case 'cost_comparison':
      return [
        'What's the monthly saving?',
        'Show me a cost chart',
        'How does time efficiency compare?'
      ];
    case 'time_efficiency':
      return [
        'Show me a time comparison chart',
        'What's my annual time saving?',
        'How does this affect cost?'
      ];
    default:
      return [
        'What's my ROI?',
        'Show me cost savings',
        'Compare time efficiency'
      ];
  }
};