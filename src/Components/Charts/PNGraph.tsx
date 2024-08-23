import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

interface PNGraphProps {
  pos: { [key: string]: number };
  neg: { [key: string]: number };
}

const PNGraph: FC<PNGraphProps> = ({ pos, neg }) => {
  // Extract labels and data from pos and neg
  const labels = Array.from(new Set([...Object.keys(pos), ...Object.keys(neg)])).sort();
  const positiveData = labels.map(label => pos[label] || 0);
  const negativeData = labels.map(label => neg[label] || 0);

  const chartOptions = (color: string) => ({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: color === "black" ? "Positive Comments" : "Negative Comments",
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
    <Flex h="18rem" gap="6" p="4" bg="" borderWidth={0.1} borderRadius="md" boxShadow="lg">
      <Box w="50%" p="4" bg="white" borderRadius="md" >
        <Line data={positiveChartData} options={chartOptions("black")} />
      </Box>
      <Box w="50%" p="4" bg="white" borderRadius="md" >
        <Line data={negativeChartData} options={chartOptions("gray.900")} />
      </Box>
    </Flex>
  );
};

export default PNGraph;
