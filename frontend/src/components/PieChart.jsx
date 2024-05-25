import React, { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchPieChart } from '../services/api';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ month }) => {
  const [data, setData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const getPieChartData = async () => {
      try {
        const response = await fetchPieChart(month);
        console.log('Pie Chart Data:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    getPieChartData();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [month]);

  if (!data || data.length === 0) return <div>No data available for pie chart.</div>;

  const chartData = {
    labels: data.map(d => d.category),
    datasets: [{
      label: 'Transactions',
      data: data.map(d => d.count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ],
    }],
  };

  return <Pie ref={chartRef} data={chartData} />;
};

export default PieChart;
