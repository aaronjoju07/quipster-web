import { Box, Text, CircularProgress, CircularProgressLabel, Flex } from "@chakra-ui/react";
import { FC } from "react";

interface SentimentScoreProps {
  score: number; // Sentiment score in percentage
}

const SentimentScore: FC<SentimentScoreProps> = ({ score }) => {
  const colorScheme = score >= 60 ? "green" : score >= 40 ? "yellow" : "red";
  

  return (
    <Box p="4" bg="" borderRadius="md" boxShadow="lg" textAlign="center" height="100%">
      <Text fontSize="xl" fontWeight="semibold" color="gray.700" mb="3">
        Sentiment Analysis Score
      </Text>
      <Flex justify="center" align="center" height="70%">
        <CircularProgress
          value={score}
          size="120px"
          thickness="10px"
          color={`#8DB04C`}
          trackColor="gray.50"
        >
          <CircularProgressLabel fontSize="2xl" fontWeight="bold" color="gray.700">
            {score}%
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>
    </Box>
  );
};

export default SentimentScore;
