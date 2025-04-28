import React from 'react';
import { BarChart } from '../Visualizations/BarChart';
import { LineChart } from '../Visualizations/LineChart';

interface ChartRendererProps {
  chartType: 'bar' | 'line';
  title: string;
  labels: string[];
  datasets: any[];
  yAxisLabel?: string;
}

const ChartRenderer: React.FC<ChartRendererProps> = ({
  chartType,
  title,
  labels,
  datasets,
  yAxisLabel
}) => {
  return (
    <div className="bg-white rounded-md p-3 border border-gray-200 h-60 w-full">
      {chartType === 'bar' ? (
        <BarChart 
          title={title}
          labels={labels}
          datasets={datasets}
          yAxisLabel={yAxisLabel}
        />
      ) : (
        <LineChart
          title={title}
          labels={labels}
          datasets={datasets}
          yAxisLabel={yAxisLabel}
        />
      )}
    </div>
  );
};

export default ChartRenderer;