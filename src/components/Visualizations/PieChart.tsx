import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  title: string;
  labels: string[];
  data: number[];
  backgroundColor: string[];
  borderColor?: string[];
}

const PieChart: React.FC<PieChartProps> = ({ 
  title, 
  labels, 
  data, 
  backgroundColor, 
  borderColor 
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderColor: borderColor || backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
        }
      },
    },
  };

  return (
    <div className="chart-container h-64">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;