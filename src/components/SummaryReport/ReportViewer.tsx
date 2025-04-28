import React, { useContext, useRef } from 'react';
import { Download, Printer, FileText, Share2 } from 'lucide-react';
import { CalculatorContext } from '../../context/CalculatorContext';
import { calculateResults } from '../../utils/calculations';
import { formatCurrency, formatPercentage, formatTime } from '../../utils/formatters';
import { BarChart } from '../Visualizations/BarChart';
import { LineChart } from '../Visualizations/LineChart';
import jsPDF from 'jspdf';

const ReportViewer: React.FC = () => {
  const { state } = useContext(CalculatorContext);
  const results = calculateResults(state);
  const reportRef = useRef<HTMLDivElement>(null);
  
  // Format date for report
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Chart data
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
  
  const roiProjectionData = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'],
    datasets: [
      {
        label: 'Cumulative Costs (Human)',
        data: Array(12).fill(0).map((_, i) => Math.round(results.humanCostPerTask * results.tasksPerMonth * (i + 1))),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4
      },
      {
        label: 'Cumulative Costs (AI)',
        data: Array(12).fill(0).map((_, i) => Math.round(state.agentLabor.agentImplementationCost + (results.agentCostPerTask * results.tasksPerMonth * (i + 1)))),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4
      },
      {
        label: 'Cumulative Savings',
        data: Array(12).fill(0).map((_, i) => {
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
  
  // Calculate breakeven point in months
  const calculateBreakevenPoint = () => {
    let month = 0;
    let implementationCost = state.agentLabor.agentImplementationCost;
    const monthlySavings = results.monthlyCostSavings;
    
    while (implementationCost > 0 && month < 36) {
      implementationCost -= monthlySavings;
      month++;
    }
    
    return implementationCost <= 0 ? month : 'More than 36';
  };
  
  const breakevenPoint = calculateBreakevenPoint();
  
  // Handle print report
  const handlePrintReport = () => {
    if (reportRef.current) {
      const printContents = reportRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      
      document.body.innerHTML = `
        <html>
          <head>
            <title>AI Labor Cost Analysis Report</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .report-section { margin-bottom: 20px; }
              .report-heading { font-size: 24px; margin-bottom: 16px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; }
              th { background-color: #f9fafb; }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `;
      
      window.print();
      document.body.innerHTML = originalContents;
    }
  };
  
  // Handle export as PDF
  const handleExportPDF = () => {
    if (reportRef.current) {
      const doc = new jsPDF('p', 'mm', 'a4');
      
      // Add title
      doc.setFontSize(18);
      doc.text('AI Labor Cost Analysis Report', 20, 20);
      doc.setFontSize(12);
      doc.text(`Generated on ${currentDate}`, 20, 30);
      
      // Executive Summary
      doc.setFontSize(14);
      doc.text('Executive Summary', 20, 45);
      doc.setFontSize(10);
      doc.text(`Annual cost savings: ${formatCurrency(results.yearlyProjectedSavings)}`, 25, 55);
      doc.text(`Time reduction: ${Math.round(results.timeSavingsPercentage)}%`, 25, 62);
      doc.text(`Monthly cost savings: ${formatCurrency(results.monthlyCostSavings)}`, 25, 69);
      doc.text(`Breakeven point: ${breakevenPoint} month${breakevenPoint !== 1 ? 's' : ''}`, 25, 76);
      
      // Cost and Savings
      doc.setFontSize(14);
      doc.text('Cost Comparison', 20, 90);
      doc.setFontSize(10);
      doc.text(`Human cost per task: ${formatCurrency(results.humanCostPerTask)}`, 25, 100);
      doc.text(`AI agent cost per task: ${formatCurrency(results.agentCostPerTask)}`, 25, 107);
      doc.text(`Savings per task: ${formatCurrency(results.costSavingsPerTask)}`, 25, 114);
      doc.text(`Time savings per task: ${Math.round(results.timeSavingsPerTask)} minutes`, 25, 121);
      
      // ROI Analysis
      doc.setFontSize(14);
      doc.text('ROI Analysis', 20, 135);
      doc.setFontSize(10);
      doc.text(`Implementation cost: ${formatCurrency(state.agentLabor.agentImplementationCost)}`, 25, 145);
      doc.text(`Monthly savings: ${formatCurrency(results.monthlyCostSavings)}`, 25, 152);
      doc.text(`First Year ROI: ${formatPercentage((results.yearlyProjectedSavings - state.agentLabor.agentImplementationCost) / state.agentLabor.agentImplementationCost * 100)}`, 25, 159);
      
      // Conclusion
      doc.setFontSize(14);
      doc.text('Conclusion & Recommendations', 20, 175);
      doc.setFontSize(10);
      const conclusionText = 'Based on our analysis, implementing AI agents for the specified tasks would provide significant cost and time savings. The initial implementation cost is projected to be recovered in the specified breakeven period.';
      
      // Split long text to fit page width
      const splitConclusion = doc.splitTextToSize(conclusionText, 170);
      doc.text(splitConclusion, 20, 185);
      
      // Add footer
      doc.setFontSize(8);
      doc.text('This is an AI-generated analysis based on the provided inputs. Actual results may vary.', 20, 280);
      doc.text('Lyzr AI Agent Platform', 170, 280, { align: 'right' });
      
      // Save the PDF
      doc.save('ai_labor_cost_analysis.pdf');
    }
  };
  
  // Handle export as CSV
  const handleExportCSV = () => {
    const headers = ['Metric', 'Human Labor', 'AI Agent', 'Difference', 'Percentage Change'];
    
    const data = [
      ['Cost Per Task', results.humanCostPerTask, results.agentCostPerTask, results.costSavingsPerTask, `${results.costSavingsPercentage}%`],
      ['Time Per Task (minutes)', results.humanTimePerTask, results.agentTimePerTask, results.timeSavingsPerTask, `${results.timeSavingsPercentage}%`],
      ['Monthly Cost', results.humanCostPerTask * results.tasksPerMonth, results.agentCostPerTask * results.tasksPerMonth, results.monthlyCostSavings, `${results.costSavingsPercentage}%`],
      ['Annual Cost', results.humanCostPerTask * results.tasksPerMonth * 12, results.agentCostPerTask * results.tasksPerMonth * 12, results.yearlyProjectedSavings, `${results.costSavingsPercentage}%`]
    ];
    
    let csvContent = headers.join(',') + '\n';
    
    data.forEach(row => { 
      csvContent += row.join(',') + '\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'ai_labor_cost_analysis.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">AI Labor Cost Analysis Report</h2>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrintReport}
            className="flex items-center space-x-1 bg-blue-50 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-100"
          >
            <Printer size={16} />
            <span>Print</span>
          </button>
          <button 
            onClick={handleExportCSV}
            className="flex items-center space-x-1 bg-green-50 text-green-600 px-3 py-1.5 rounded hover:bg-green-100"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center space-x-1 bg-purple-50 text-purple-600 px-3 py-1.5 rounded hover:bg-purple-100"
          >
            <FileText size={16} />
            <span>PDF</span>
          </button>
          <button className="flex items-center space-x-1 bg-gray-50 text-gray-600 px-3 py-1.5 rounded hover:bg-gray-100">
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>
      </div>
      
      <div ref={reportRef} className="space-y-8">
        {/* Report Header */}
        <div className="border-b pb-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">AI Labor Cost Analysis</h3>
              <p className="text-gray-500">Generated on {currentDate}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Prepared by</p>
              <p className="font-medium">Lyzr AI Agent Platform</p>
            </div>
          </div>
        </div>
        
        {/* Executive Summary */}
        <div className="report-section">
          <h3 className="text-lg font-semibold mb-3">Executive Summary</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2">
              Based on the provided inputs, implementing AI agents for this workload is projected to yield:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span className="font-medium">
                  {formatCurrency(results.yearlyProjectedSavings)}
                </span> in annual cost savings
              </li>
              <li>
                <span className="font-medium">
                  {Math.round(results.timeSavingsPercentage)}%
                </span> reduction in task completion time
              </li>
              <li>
                <span className="font-medium">
                  {formatCurrency(results.monthlyCostSavings)}
                </span> monthly cost savings
              </li>
              <li>
                <span className="font-medium">
                  {breakevenPoint}
                </span> month{breakevenPoint !== 1 ? 's' : ''} to break even on the implementation cost
              </li>
            </ul>
          </div>
        </div>
        
        {/* Input Parameters */}
        <div className="report-section">
          <h3 className="text-lg font-semibold mb-3">Input Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Human Labor</h4>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-1 font-medium">Annual Salary:</td>
                    <td className="py-1 text-right">{formatCurrency(state.humanLabor.employeeSalary)}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Number of Employees:</td>
                    <td className="py-1 text-right">{state.humanLabor.employeeCount}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Hours per Day:</td>
                    <td className="py-1 text-right">{state.humanLabor.employeeHoursPerDay} hours</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Overhead Percentage:</td>
                    <td className="py-1 text-right">{formatPercentage(state.humanLabor.employeeOverheadPercentage)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">AI Agent</h4>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-1 font-medium">Cost per Hour:</td>
                    <td className="py-1 text-right">{formatCurrency(state.agentLabor.agentCostPerHour)}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Hours per Day:</td>
                    <td className="py-1 text-right">{state.agentLabor.agentHoursPerDay} hours</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Efficiency Multiplier:</td>
                    <td className="py-1 text-right">{state.agentLabor.agentEfficiencyMultiplier}x</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Implementation Cost:</td>
                    <td className="py-1 text-right">{formatCurrency(state.agentLabor.agentImplementationCost)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Cost Comparison */}
        <div className="report-section">
          <h3 className="text-lg font-semibold mb-3">Cost Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64">
              <BarChart
                title="Cost per Task"
                labels={costComparisonData.labels}
                datasets={costComparisonData.datasets}
                yAxisLabel="Cost ($)"
              />
            </div>
            <div className="h-64">
              <BarChart
                title="Time per Task"
                labels={timeComparisonData.labels}
                datasets={timeComparisonData.datasets}
                yAxisLabel="Minutes"
              />
            </div>
          </div>
        </div>
        
        {/* ROI Projection */}
        <div className="report-section">
          <h3 className="text-lg font-semibold mb-3">ROI Projection (12 months)</h3>
          <div className="h-80 mb-8">
            <LineChart
              title="12-Month Cost Projection"
              labels={roiProjectionData.labels}
              datasets={roiProjectionData.datasets}
              yAxisLabel="Cumulative Cost ($)"
            />
          </div>
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Return on Investment Analysis</h4>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1 font-medium">Implementation Cost:</td>
                  <td className="py-1 text-right">{formatCurrency(state.agentLabor.agentImplementationCost)}</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">Monthly Savings:</td>
                  <td className="py-1 text-right">{formatCurrency(results.monthlyCostSavings)}</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">Breakeven Point:</td>
                  <td className="py-1 text-right">{breakevenPoint} month{breakevenPoint !== 1 ? 's' : ''}</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">First Year ROI:</td>
                  <td className="py-1 text-right">
                    {formatPercentage((results.yearlyProjectedSavings - state.agentLabor.agentImplementationCost) / state.agentLabor.agentImplementationCost * 100)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Conclusion */}
        <div className="report-section border-t pt-4">
          <h3 className="text-lg font-semibold mb-3">Conclusion & Recommendations</h3>
          <p className="mb-3">
            Based on our analysis, implementing AI agents for the specified tasks would provide significant cost and time savings. 
            The initial implementation cost of {formatCurrency(state.agentLabor.agentImplementationCost)} is projected to be recovered in {breakevenPoint} month{breakevenPoint !== 1 ? 's' : ''}.
          </p>
          <p className="text-sm text-gray-600 italic mt-6">
            Note: This is an AI-generated analysis based on the provided inputs. Actual results may vary based on specific business contexts.
            Review all assumptions carefully before making business decisions.
          </p>
          <div className="mt-2">
            <a 
              href="https://www.lyzr.ai/responsible-ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline text-sm"
            >
              Learn more about Lyzr's Responsible AI
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;