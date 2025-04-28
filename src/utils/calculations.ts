import { CalculatorState, CalculationResults } from '../types';

// Calculate hourly cost for employees
export const calculateEmployeeHourlyCost = (
  salary: number,
  overheadPercentage: number
): number => {
  const totalCost = salary * (1 + overheadPercentage / 100);
  const workingHoursPerYear = 2080; // 52 weeks * 40 hours
  return totalCost / workingHoursPerYear;
};

// Calculate results based on calculator state
export const calculateResults = (state: CalculatorState): CalculationResults => {
  // Human costs
  const humanHourlyCost = calculateEmployeeHourlyCost(
    state.humanLabor.employeeSalary,
    state.humanLabor.employeeOverheadPercentage
  );
  
  // Estimate task time (in minutes)
  const baseTaskTime = 60; // baseline assumption: 1 hour per task
  const humanTimePerTask = baseTaskTime;
  const agentTimePerTask = baseTaskTime / state.agentLabor.agentEfficiencyMultiplier;
  
  // Cost per task calculations
  const humanCostPerTask = (humanTimePerTask / 60) * humanHourlyCost * state.humanLabor.employeeCount;
  const agentCostPerTask = (agentTimePerTask / 60) * state.agentLabor.agentCostPerHour;
  
  // Include implementation cost amortized over 12 months, assuming 50 tasks per month
  const tasksPerMonth = 50;
  const implementationCostPerTask = state.agentLabor.agentImplementationCost / (tasksPerMonth * 12);
  const adjustedAgentCostPerTask = agentCostPerTask + implementationCostPerTask;
  
  // Savings calculations
  const costSavingsPerTask = humanCostPerTask - adjustedAgentCostPerTask;
  const costSavingsPercentage = (costSavingsPerTask / humanCostPerTask) * 100;
  
  const timeSavingsPerTask = humanTimePerTask - agentTimePerTask;
  const timeSavingsPercentage = (timeSavingsPerTask / humanTimePerTask) * 100;
  
  // Monthly and yearly projections
  const monthlyCostSavings = costSavingsPerTask * tasksPerMonth;
  const monthlyTimeSavings = timeSavingsPerTask * tasksPerMonth;
  const yearlyProjectedSavings = monthlyCostSavings * 12;
  
  return {
    humanCostPerTask,
    agentCostPerTask: adjustedAgentCostPerTask,
    humanTimePerTask,
    agentTimePerTask,
    costSavingsPerTask,
    timeSavingsPerTask,
    costSavingsPercentage,
    timeSavingsPercentage,
    tasksPerMonth,
    monthlyCostSavings,
    monthlyTimeSavings,
    yearlyProjectedSavings
  };
};

// Format monetary values
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Format percentage values
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(value / 100);
};