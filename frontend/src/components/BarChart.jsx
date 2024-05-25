import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchBarChart } from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ month }) => {
  const [data, setData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const getBarChartData = async () => {
      try {
        const response = await fetchBarChart(month);
        console.log('Bar Chart Data:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    getBarChartData();
  }, [month]);

  useEffect(() => {
    // Destroy chart instance on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (!data) return <div>Loading...</div>;

  const chartData = {
    labels: data.map(d => d.range),
    datasets: [{
      label: 'Transactions',
      data: data.map(d => d.count),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar ref={chartRef} data={chartData} options={options} />;
};

export default BarChart;
