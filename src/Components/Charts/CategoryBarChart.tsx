import { FC } from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface CategoryBarChartProps {
  data: {
    [category: string]: {
      Negative: number;
      Positive: number;
    };
  };
}

const CategoryBarChart: FC<CategoryBarChartProps> = ({ data }) => {
  const categories = Object.keys(data);
  const negativeValues = categories.map(category => data[category].Negative);
  const positiveValues = categories.map(category => data[category].Positive);

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Negative',
        data: negativeValues,
        backgroundColor: '#f56565',
        borderColor: 'darkred',
        borderWidth: 1,
      },
      {
        label: 'Positive',
        data: positiveValues,
        backgroundColor: 'rgba(75, 187, 120)',
        borderColor: 'darkgreen',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#212529', // Dark color for legend text
        },
      },
      tooltip: {
        backgroundColor: '#ffffff', // White background for tooltips
        titleColor: '#000000', // Black title color for tooltips
        bodyColor: '#000000', // Black body text color for tooltips
        borderColor: '#ddd', // Light grey border color for tooltips
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true, // Stack the bars horizontally
        grid: {
          display: false,
        },
        ticks: {
          color: '#212529', // Dark color for x-axis ticks
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        stacked: true, // Stack the bars vertically
        grid: {
          borderColor: '#ddd', // Light grey grid border
        },
        ticks: {
          color: '#212529', // Dark color for y-axis ticks
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <Box p="2" bg="#ffffff" borderRadius="md" boxShadow="base" h="full" w="full">
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default CategoryBarChart;