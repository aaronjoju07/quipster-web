import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";
import BarChart from "../Components/Charts/BarChart";
import PNGraph from "../Components/Charts/PNGraph";
import CommentSummary from "../Components/Charts/CommentSummary";
import WordCloudComponent from "../Components/Charts/WordCloudComponent";
import SentimentScore from "../Components/Charts/SentimentScore";
import Review from "../Components/Charts/Review";
import CategoryBarChart from "../Components/Charts/CategoryBarChart";
import Sent_Img from '../assets/home.png';

const Dashboard: FC = () => {
  // Sample data for comments
  const positiveComments = 120;
  const negativeComments = 30;
  const neutralComments = 50;
  const sentimentScore = 60;
  const reviewText = "The analysis indicates a predominantly positive sentiment, with some neutral and fewer negative reviews.";

  return (
    <Flex minH="100vh" p="4" gap="4" bg="gray.100" borderRadius={14} overflowX="hidden">
      {/* First Column */}
      <Flex w="25%" direction="column" gap="5" minH="calc(100vh - 2rem)">
        <Box flex="1">
          <CommentSummary 
            positive={positiveComments} 
            negative={negativeComments} 
            neutral={neutralComments} 
          />
        </Box>
        <Box flex="1" bg="">
          <CategoryBarChart />
        </Box>
      </Flex>

      {/* Second Column */}
      <Flex w="25%" direction="column" gap="5" minH="calc(100vh - 2rem)">
        <Box flex="1">
          <SentimentScore score={sentimentScore} />
        </Box>
        <Box flex="2">
          <img src={Sent_Img} alt="Example" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
      </Flex>

      {/* Third Column */}
      <Flex w="50%" direction="column" gap="5" minH="calc(100vh - 2rem)">
        <Box flex="1" bg="">
          <PNGraph />
        </Box>
        <Box flex="1" bg="">
          <WordCloudComponent />
        </Box>
        <Box flex="0.5" bg="">
          <Review reviewText={reviewText} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
