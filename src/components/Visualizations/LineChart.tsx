import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor?: string;
    tension?: number;
  }[];
  yAxisLabel?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  title,
  labels,
  datasets,
  yAxisLabel
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel || '',
        }
      },
      x: {
        title: {
          display: false,
        },
        ticks: {
          padding: 10
        }
      }
    },
    layout: {
      padding: {
        bottom: 15
      }
    }
  };

  const data = {
    labels,
    datasets: datasets.map(dataset => ({
      ...dataset,
      fill: false,
      tension: dataset.tension || 0.1,
    })),
  };

  return (
    <div className="chart-container h-64">
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;