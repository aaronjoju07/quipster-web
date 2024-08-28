import { FC } from "react";
import WordCloud from "react-wordcloud";
import { Box } from "@chakra-ui/react";

// Define the prop type for WordCloudComponent
interface WordCloudComponentProps {
  data: { [key: string]: number };
}

const WordCloudComponent: FC<WordCloudComponentProps> = ({ data }) => {
  // Convert the data object into the format expected by react-wordcloud
  const words = Object.entries(data).map(([text, value]) => ({
    text,
    value,
  }));

  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [20, 60],
    colors: ["#808080", "#daa520", "#cd5c5c", "#90ee90", "#F08080"],
  };

  return (
    <Box
      h="73%"
      w="100%"
      borderRadius="md"
      boxShadow="base"
    >
      <WordCloud words={words} options={options} />
    </Box>
  );
};

export default WordCloudComponent;