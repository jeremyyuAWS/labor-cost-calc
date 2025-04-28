import { AgentLaborState, HumanLaborState, CalculatorState } from '../types';

// Default values for human labor inputs
export const defaultHumanLabor: HumanLaborState = {
  employeeSalary: 75000,
  employeeHoursPerDay: 8,
  employeeCount: 5,
  employeeOverheadPercentage: 30
};

// Default values for agent labor inputs
export const defaultAgentLabor: AgentLaborState = {
  agentCostPerHour: 10,
  agentHoursPerDay: 8,
  agentEfficiencyMultiplier: 2,
  agentImplementationCost: 5000
};

// Default calculator state
export const defaultCalculatorState: CalculatorState = {
  humanLabor: defaultHumanLabor,
  agentLabor: defaultAgentLabor
};

// Industry-specific presets
export const industryPresets = {
  customerService: {
    humanLabor: {
      employeeSalary: 45000,
      employeeHoursPerDay: 8,
      employeeCount: 15,
      employeeOverheadPercentage: 25
    },
    agentLabor: {
      agentCostPerHour: 8,
      agentHoursPerDay: 24,
      agentEfficiencyMultiplier: 3,
      agentImplementationCost: 15000
    }
  },
  softwareDevelopment: {
    humanLabor: {
      employeeSalary: 120000,
      employeeHoursPerDay: 8,
      employeeCount: 8,
      employeeOverheadPercentage: 35
    },
    agentLabor: {
      agentCostPerHour: 25,
      agentHoursPerDay: 24,
      agentEfficiencyMultiplier: 1.5,
      agentImplementationCost: 30000
    }
  },
  healthcare: {
    humanLabor: {
      employeeSalary: 85000,
      employeeHoursPerDay: 8,
      employeeCount: 12,
      employeeOverheadPercentage: 40
    },
    agentLabor: {
      agentCostPerHour: 15,
      agentHoursPerDay: 24,
      agentEfficiencyMultiplier: 2.2,
      agentImplementationCost: 45000
    }
  },
  retail: {
    humanLabor: {
      employeeSalary: 35000,
      employeeHoursPerDay: 8,
      employeeCount: 25,
      employeeOverheadPercentage: 20
    },
    agentLabor: {
      agentCostPerHour: 5,
      agentHoursPerDay: 24,
      agentEfficiencyMultiplier: 4,
      agentImplementationCost: 20000
    }
  }
};