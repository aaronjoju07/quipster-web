import { FC } from "react";
import WordCloud from "react-wordcloud";
import { Box } from "@chakra-ui/react";

const words = [
  { text: "React", value: 50 },
  { text: "TypeScript", value: 30 },
  { text: "ChakraUI", value: 25 },
  { text: "JavaScript", value: 40 },
  { text: "WordCloud", value: 20 },
  { text: "Visualization", value: 15 },
  { text: "Graph", value: 35 },
  { text: "Dashboard", value: 30 },
  // Add more words and values as needed
];

const WordCloudComponent: FC = () => {
  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [20, 60],
    colors: ["#808080", "#daa520", "#cd5c5c", "#90ee90", "#F08080"],
  };

  return (
    <Box
      h="100%"
      w="100%"
      p="4"
      bg="#fafad2"
      borderRadius="md"
      boxShadow="base"
    >
      <WordCloud words={words} options={options} />
    </Box>
  );
};

export default WordCloudComponent;
