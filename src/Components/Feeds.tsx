import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import FeedCard from './FeedCArd'; // Corrected import path

// Updated Tweet interface based on API response
interface Tweet {
  Comments: string[];
  Likes: number;
  category: string;
  email_id: string;
  fake_news: string;
  label: number;
  overall_percentage: number;
  overall_score: number;
  sentiment: 'Positive' | 'Negative' | 'Neutral'; // Adjusted to match API response
  text: string;
  timestamp: string; // Using string for initial API data
}

// Define the type for the Feeds props
interface FeedsProps {
  data: Tweet[]; // Expect data to be an array of Tweet objects
  handleLoading: (loading: boolean) => void; // Function to handle loading state
  isLoading: boolean; // To handle overall loading state
}

const Feeds: React.FC<FeedsProps> = ({ data, handleLoading, isLoading }) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    handleLoading(isLoading); // Call handleLoading with current isLoading state
  }, [isLoading, handleLoading]);

  useEffect(() => {
    setTweets(data); // Directly set the data array to state
  }, [data]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" color="teal.500" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      {tweets.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {tweets.map((tweet, index) => {
            // Convert timestamp string to Date object
            const timestamp = new Date(tweet.timestamp);

            // Determine sentiment with fallback
            const sentiment: 'positive' | 'negative' | 'neutral' = 
              ['Positive', 'Negative', 'Neutral'].includes(tweet.sentiment)
              ? tweet.sentiment.toLowerCase() as 'positive' | 'negative' | 'neutral'
              : 'neutral';

            return (
              <FeedCard
                key={index}
                profileImage={'https://cdn.dribbble.com/userupload/13825225/file/original-dd0914811f7fdd9cd7cfe1f83bbf4810.jpg?resize=1504x1128'}
                username={tweet.email_id || 'Unknown User'}
                email={tweet.email_id || 'No Email'}
                category={tweet.category}
                content={tweet.text}
                timestamp={timestamp} // Pass as Date object
                sentiment={sentiment} // Pass the validated sentiment
                fake_news={tweet.fake_news}
                Likes={tweet.Likes}
                comments={tweet.Comments}
                overall_percentage={tweet.overall_percentage}
              />
            );
          })}
        </SimpleGrid>
      ) : (
        <Box textAlign="center" p={4}>
          <p>No tweets available</p>
        </Box>
      )}
    </Box>
  );
};

export default Feeds;
