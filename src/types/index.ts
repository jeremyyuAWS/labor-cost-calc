// Calculator State Types
export interface AgentLaborState {
  agentCostPerHour: number;
  agentHoursPerDay: number;
  agentEfficiencyMultiplier: number;
  agentImplementationCost: number;
}

export interface HumanLaborState {
  employeeSalary: number;
  employeeHoursPerDay: number;
  employeeCount: number;
  employeeOverheadPercentage: number;
}

export interface CalculatorState {
  agentLabor: AgentLaborState;
  humanLabor: HumanLaborState;
}

// Demo Scenario Types
export interface HumanCosts {
  employeeCount: number;
  averageSalary: number;
  benefitsPercentage: number;
  workHoursPerWeek: number;
  workWeeksPerYear: number;
  vacationDaysPerYear: number;
  trainingCostsPerYear: number;
  turnoverRate: number;
  replacementCostMultiplier: number;
  officeSpacePerEmployee: number;
  officeSpaceCostPerSqFt: number;
  equipmentCostPerEmployee: number;
  equipmentLifespanYears: number;
}

export interface AgentCosts {
  agentCount: number;
  averageCostPerAgent: number;
  implementationCost: number;
  maintenanceCostPercentage: number;
  trainingHoursRequired: number;
  trainingCostPerHour: number;
  upgradeCostPerYear: number;
  licensingCostPerAgent: number;
  supportCostPercentage: number;
  integrationCostPerYear: number;
}

export interface Performance {
  humanProductivityHoursPerDay: number;
  agentProductivityMultiplier: number;
  humanErrorRate: number;
  agentErrorRate: number;
  customerSatisfactionHuman: number;
  customerSatisfactionAgent: number;
  responseTimeHumanMinutes: number;
  responseTimeAgentMinutes: number;
}

export interface CalculationResults {
  humanCostPerTask: number;
  agentCostPerTask: number;
  humanTimePerTask: number;
  agentTimePerTask: number;
  costSavingsPerTask: number;
  timeSavingsPerTask: number;
  costSavingsPercentage: number;
  timeSavingsPercentage: number;
  tasksPerMonth: number;
  monthlyCostSavings: number;
  monthlyTimeSavings: number;
  yearlyProjectedSavings: number;
}