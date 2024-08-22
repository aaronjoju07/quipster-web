import { FC } from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const CategoryBarChart: FC = () => {
  const categories = ["Sports", "Politics", "Business"];
  const values = [50, 30, 20]; // Example values for each category

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Comment Categories",
        data: values,
        backgroundColor: ["#a9a9a9", "#deb887", "#fff8dc"], // Colors for each category
        borderColor: ["#4C1D95", "#D97706", "#047857"], // Border colors for each bar
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          borderColor: '#ddd',
        },
        ticks: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <Box p="2" bg="#ffebcd" borderRadius="md" boxShadow="base" h="full" w="full">
      <Bar data={data} options={options} />
    </Box>
  );
};

export default CategoryBarChart;
