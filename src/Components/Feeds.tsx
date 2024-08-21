import React, { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../Auth/firebase'; // Adjust the path as needed
import FeedCard from './FeedCArd'; // Correct the import path as needed
import { Spinner, Box } from '@chakra-ui/react'; // Import Chakra UI components

// Define the type for tweet data
interface Tweet {
  id: string; // Add the id property here
  userId: string;
  username: string | null;
  email: string; // Add the email property here
  userImgUrl: string | null;
  tweet: string;
  timestamp: Timestamp;
  sentiment: string; // This will be a string from Firestore
}

const Feeds: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTweets = async () => {
      setLoading(true); // Ensure loading state is set to true before fetching
      try {
        const querySnapshot = await getDocs(collection(db, 'tweets'));
        const tweetsData: Tweet[] = querySnapshot.docs.map(doc => {
          const data = doc.data() as Omit<Tweet, 'id'>; // Exclude 'id' from the type
          return {
            id: doc.id,
            ...data
          };
        });
        setTweets(tweetsData);
      } catch (error) {
        console.error('Error fetching tweets:', error);
        // Consider setting an error state to display an error message
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, []); // Fetch tweets only once on component mount

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" color="teal.500" />
      </Box>
    );
  }

  return (
    <div>
      {tweets.length > 0 ? (
        tweets.map((tweet) => {
          // Determine sentiment with fallback
          const sentiment: 'positive' | 'neutral' | 'negative' | undefined = 
            ['positive', 'neutral', 'negative'].includes(tweet.sentiment) 
            ? tweet.sentiment as 'positive' | 'neutral' | 'negative' 
            : undefined;

          return (
            <FeedCard
              key={tweet.id}
              profileImage={tweet.userImgUrl || 'https://cdn.dribbble.com/userupload/9650949/file/original-e575ade7bf00f5e59879e7b614731e61.jpg?resize=2048x1536'}
              username={tweet.username || 'Unknown User'}
              email={tweet.email || 'No Email'} // Pass email to FeedCard
              handle={tweet.userId} // Assuming handle is the userId, adjust as needed
              content={tweet.tweet}
              timestamp={tweet.timestamp.toDate()} // Pass as Date object
              sentiment={sentiment} // Pass the validated sentiment
            />
          );
        })
      ) : (
        <Box textAlign="center" p={4}>
          <p>No tweets available</p>
        </Box>
      )}
    </div>
  );
};

export default Feeds;
