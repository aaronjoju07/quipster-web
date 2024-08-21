import React, { useState } from 'react';
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
import { db } from '../Auth/firebase';

// Define the type for the user data
export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

const Feed: React.FC = () => {
  
  const [user, setUser] = useState<User | null>(null); 
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tweetContent, setTweetContent] = useState('');
  const [loading, setLoading] = useState(false);

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
        <Feeds />
      </Box>

      {/* Floating Button */}
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

      {/* Modal for adding a new tweet */}
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
