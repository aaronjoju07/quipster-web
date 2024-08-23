import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Flex
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import Feeds from '../Components/Feeds'; // Adjust import path as needed
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../Auth/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

const Feed: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [processCommentsData, setProcessCommentsData] = useState<any[]>([]); // Ensure it's an array
  const [error, setError] = useState<string | null>(null);
  const [tweetContent, setTweetContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true); // Track loading state of data fetch

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchData(user.email); // Call fetchData with user's email
      } else {
        setUser(null);
        setProcessCommentsData([]); // Clear data if no user
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchData = async (email: string | null) => {
    if (!email) return;

    setDataLoading(true); // Set loading state to true when fetching data

    try {
      const [filterResponse, processResponse, processCommentsResponse] = await Promise.all([
        axios.get('http://127.0.0.1:5000/process'),
        axios.get(`http://127.0.0.1:5000/filter_by_email?email=${email}`),
        axios.get('http://127.0.0.1:5000/process_comments')
      ]);

      // Handle responses
      setProcessCommentsData(processCommentsResponse.data.data || []); // Ensure data is correctly set
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'An error occurred');
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setDataLoading(false); // Set loading state to false when fetching data is done
    }
  };

  const handlePostTweet = async () => {
    if (!user) return;

    setLoading(true);

    try {
      await addDoc(collection(db, 'tweets'), {
        userId: user.uid,
        userEmail: user.email,
        username: user.displayName,
        userImgUrl: user.photoURL,
        tweet: tweetContent,
        timestamp: Timestamp.now(),
        sentiment: '' // sentiment is left empty as per requirement
      });

      setTweetContent('');
      onClose();
    } catch (error) {
      console.error('Error posting tweet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoading = (loading: boolean) => {
    setDataLoading(loading);
  };

  return (
    <Flex direction="column" height="100vh" overflow="hidden">
      <Box
        flex="1"
        overflowY="auto"
        p={4}
        bg="gray.100"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <Feeds data={processCommentsData} handleLoading={handleLoading} isLoading={dataLoading} />
      </Box>

      <IconButton
        icon={<FaPlus />}
        aria-label="Add Tweet"
        position="fixed"
        bottom="4"
        right="4"
        size="lg"
        colorScheme="teal"
        onClick={onOpen}
        borderRadius="full"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.600" // Dark overlay to blur background
          backdropFilter="blur(5px)" // Apply blur effect
        />
        <ModalContent>
          <ModalHeader>Post a New Tweet</ModalHeader>
          <ModalBody>
            <Textarea
              placeholder="What's on your mind?"
              value={tweetContent}
              onChange={(e) => setTweetContent(e.target.value)}
              mb={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlePostTweet} isLoading={loading}>
              Post
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Feed;
