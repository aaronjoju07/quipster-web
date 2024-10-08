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

interface SentimentData {
  [year: string]: number;
}

interface Difference {
  year: number;
  difference: number;
}
const Dashboard: FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [geminiResponse, setGeminiResponse] = useState<string | null>(null);
  const [reviewLoading, setReviewLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
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

  useEffect(() => {
    if (data) {
      const fetchGeminiResponse = async () => {
        setReviewLoading(true)
        try {
          const response = await axios.post('http://127.0.0.1:5000/api/result', {
            sentimentScore: sentimentScore,
            categoryValues: categoryValues,
            posPercentageDifference: posPercentageDifference,
            negPercentageDifference: negPercentageDifference
          });
          setGeminiResponse(response.data.response);
          setReviewLoading(false)
        } catch (err) {
          console.error('Failed to fetch Gemini AI response:', err);
        }
      };

      fetchGeminiResponse();
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const positiveComments = data?.Positive || 120;
  const negativeComments = data?.Negative || 30;
  const Score = (data?.Overall_Score || 0.6) * 100;
  const sentimentScore = parseFloat(Score.toFixed(2));
  const categoryValues = data?.category_pos_neg || {};
  const yer_pos: SentimentData = data?.Sentimental_Yearwise_Freq_Pos || {};
  const yer_neg: SentimentData = data?.Sentimental_Yearwise_Freq_Neg || {};

  // Convert and sort data
  const sortedPos = Object.entries(yer_pos)
    .map(([year, value]) => ({ year: parseInt(year), value: value as number })) // Type assertion
    .sort((a, b) => b.year - a.year);

  const sortedNeg = Object.entries(yer_neg)
    .map(([year, value]) => ({ year: parseInt(year), value: value as number })) // Type assertion
    .sort((a, b) => b.year - a.year);

  // Calculate differences
  const calculatePercentageDifference = (sortedData: { year: number; value: number }[]): string => {
    if (sortedData.length < 2) {
      return 'Not enough data';
    }

    const mostRecent = sortedData[0];
    const secondMostRecent = sortedData[1];

    const difference = mostRecent.value - secondMostRecent.value;
    const percentageDifference = (difference / secondMostRecent.value) * 100;

    return `${percentageDifference.toFixed(2)}`;
  };

  // Usage in component
  const posPercentageDifference = calculatePercentageDifference(sortedPos);
  const negPercentageDifference = calculatePercentageDifference(sortedNeg);

  return (
    <Flex minH="100vh" p="5" gap="4" bg="white" overflowX="hidden">
      {/* First Column */}
      <Flex w="25%" direction="column" gap="1" minH="calc(100vh - 1rem)">
        <Box bg="white">
          <CommentSummary
            positive={positiveComments}
            negative={negativeComments}
          />
        </Box>
        <Box h={'530px'} borderRadius={'md'} boxShadow={'md'} m={1} >
          <CategoryBarChart data={categoryValues} />
        </Box>
      </Flex>

      {/* Second Column */}
      <Flex w="25%" direction="column" gap="5" minH="calc(100vh - 2rem)">
        <Box flex="1">
          <SentimentScore score={sentimentScore} />
        </Box>
        <Box flex="3" bg="">
          {/* <img src={Sent_Img} alt="Example" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
          <WordCloudComponent data={data.top_30_words} />
        </Box>
      </Flex>

      {/* Third Column */}
      <Flex w="50%" direction="column" gap="5" minH="calc(100vh - 2rem)">
        <Box flex="1" bg="">
          <StatsTitleDescription positiveChange={posPercentageDifference} negativeChange={negPercentageDifference} />
          <PNGraph pos={data.Sentimental_Monthwise_Freq_Pos} neg={data.Sentimental_Monthwise_Freq_Neg} />
        </Box>
        <Box flex="1" bg="white" p={2}>
          {geminiResponse && <Review reviewText={geminiResponse} isloading={reviewLoading} />}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
