import React, { createContext, useReducer, ReactNode, useContext } from 'react';

// Define the state structure
interface AgentLaborState {
  agentCostPerHour: number;
  agentHoursPerDay: number;
  agentEfficiencyMultiplier: number;
  agentImplementationCost: number;
}

interface HumanLaborState {
  employeeSalary: number;
  employeeHoursPerDay: number;
  employeeCount: number;
  employeeOverheadPercentage: number;
}

interface CalculatorState {
  agentLabor: AgentLaborState;
  humanLabor: HumanLaborState;
}

// Define action types
type CalculatorAction = 
  | { type: 'UPDATE_AGENT_LABOR'; payload: Partial<AgentLaborState> }
  | { type: 'UPDATE_HUMAN_LABOR'; payload: Partial<HumanLaborState> }
  | { type: 'RESET_CALCULATOR' }
  | { type: 'SET_CALCULATOR_STATE'; payload: CalculatorState };

// Define the context type
interface CalculatorContextType {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
}

// Initial state
const initialState: CalculatorState = {
  agentLabor: {
    agentCostPerHour: 10,
    agentHoursPerDay: 8,
    agentEfficiencyMultiplier: 2,
    agentImplementationCost: 5000
  },
  humanLabor: {
    employeeSalary: 75000,
    employeeHoursPerDay: 8,
    employeeCount: 5,
    employeeOverheadPercentage: 30
  }
};

// Create the context
export const CalculatorContext = createContext<CalculatorContextType>({
  state: initialState,
  dispatch: () => null
});

// Reducer function
const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  switch (action.type) {
    case 'UPDATE_AGENT_LABOR':
      return {
        ...state,
        agentLabor: {
          ...state.agentLabor,
          ...action.payload
        }
      };
    case 'UPDATE_HUMAN_LABOR':
      return {
        ...state,
        humanLabor: {
          ...state.humanLabor,
          ...action.payload
        }
      };
    case 'RESET_CALCULATOR':
      return initialState;
    case 'SET_CALCULATOR_STATE':
      return action.payload;
    default:
      return state;
  }
};

// Provider component
interface CalculatorProviderProps {
  children: ReactNode;
}

export const CalculatorProvider: React.FC<CalculatorProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
};

// Custom hook to use the calculator context
export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  
  const setCalculatorState = (newState: CalculatorState) => {
    context.dispatch({ type: 'SET_CALCULATOR_STATE', payload: newState });
  };
  
  return {
    ...context,
    setCalculatorState,
  };
};