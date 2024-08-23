import { Box, Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import axios from 'axios';
import BarChart from "../Components/Charts/BarChart";
import PNGraph from "../Components/Charts/PNGraph";
import CommentSummary from "../Components/Charts/CommentSummary";
import WordCloudComponent from "../Components/Charts/WordCloudComponent";
import SentimentScore from "../Components/Charts/SentimentScore";
import Review from "../Components/Charts/Review";
import CategoryBarChart from "../Components/Charts/CategoryBarChart";
import Sent_Img from '../assets/home.png';
import StatsTitleDescription from "../Components/statsTitleDescription";

const Dashboard: FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/analysis');
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const positiveComments = data?.Positive || 120;
  const negativeComments = data?.Negative || 30;
  const Score = (data?.Overall_Score || 0.6) * 100;
  const sentimentScore = parseFloat(Score.toFixed(2));
  const categoryValues = data?.category_value_list || {};
  const reviewText = data?.reviewText || "The analysis indicates a predominantly positive sentiment, with some neutral and fewer negative reviews.";
console.log(categoryValues);

  return (
    <Flex minH="100vh" p="5" gap="4" bg="white" overflowX="hidden">
      {/* First Column */}
      <Flex w="25%" direction="column" gap="1" minH="calc(100vh - 1rem)">
        <Box flex="1" bg="white">
          <CommentSummary 
            positive={positiveComments} 
            negative={negativeComments} 
          />
        </Box>
        <Box flex="1" borderRadius={'md'} boxShadow={'lg'}>
          <CategoryBarChart data={categoryValues} />
        </Box>
      </Flex>

      {/* Second Column */}
      <Flex w="25%" direction="column" gap="5" minH="calc(100vh - 2rem)">
        <Box flex="1">
          <SentimentScore score={sentimentScore} />
        </Box>
        <Box flex="2" bg="#C0C0C0">
          <img src={Sent_Img} alt="Example" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
      </Flex>

      {/* Third Column */}
      <Flex w="50%" direction="column" gap="5" minH="calc(100vh - 2rem)">
        <Box flex="1" bg="">
          <StatsTitleDescription positiveChange="" negativeChange=""/>
          <PNGraph pos={data.Sentimental_Monthwise_Freq_Pos}  neg={data.Sentimental_Monthwise_Freq_Neg}  />
        </Box>
        <Box flex="1" bg="#C0C0C0">
          {/* Uncomment if WordCloudComponent is ready to use */}
          {/* <WordCloudComponent data={data.top_30_words} /> */}
        </Box>
        <Box flex="0.5" bg="#DCBCB1">
          <Review reviewText={reviewText} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
