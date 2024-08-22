import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const PNGraph: FC = () => {
  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const positiveData = [20, 25, 30, 40];
  const negativeData = [5, 10, 7, 3];

  const chartOptions = (color: string) => ({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: color === "#8DB596" ? "Positive Comments" : "Negative Comments",
        color,
        font: {
          size: 18,
          family: "'Poppins', sans-serif",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
          lineWidth: 1,
        },
        ticks: {
          color,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
          lineWidth: 1,
        },
        ticks: {
          color,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 6,
        hoverRadius: 8,
        backgroundColor: color,
      },
    },
  });

  const positiveChartData = {
    labels,
    datasets: [
      {
        label: "Positive",
        data: positiveData,
        borderColor: "#8DB596",
        backgroundColor: "rgba(141, 181, 150, 0.3)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const negativeChartData = {
    labels,
    datasets: [
      {
        label: "Negative",
        data: negativeData,
        borderColor: "#F08080",
        backgroundColor: "rgba(240, 128, 128, 0.3)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <Flex h="18rem" gap="6" p="4" bg="#C0C0C0" borderRadius="lg" boxShadow="lg">
      <Box w="50%" p="4" bg="#ffefd5" borderRadius="md" boxShadow="base">
        <Line data={positiveChartData} options={chartOptions("#8DB596")} />
      </Box>
      <Box w="50%" p="4" bg="#ffefd5" borderRadius="md" boxShadow="base">
        <Line data={negativeChartData} options={chartOptions("#F08080")} />
      </Box>
    </Flex>
  );
};

export default PNGraph;
