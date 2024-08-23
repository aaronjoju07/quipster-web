import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Text,
  Flex,
  Divider,
  IconButton,
  Tag,
  TagLabel,
  Icon,
  Code,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FaHeart, FaShare, FaComment } from 'react-icons/fa';
import { BiHappy, BiSad, BiMeh } from 'react-icons/bi';
import { formatTimeAgo } from '../utils/timeUtils'; // Adjust import path as needed

interface FeedCardProps {
  profileImage: string;
  username: string;
  email: string;
  category: string;
  content: string;
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative';
  fake_news: string;
  Likes: number;
  comments: string[];
  overall_percentage: number;
}

const FeedCard: React.FC<FeedCardProps> = ({
  profileImage,
  username,
  email,
  category,
  content,
  timestamp,
  sentiment,
  fake_news,
  Likes,
  comments = [],
  overall_percentage,
}) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const { isOpen: isContentOpen, onOpen: onContentOpen, onClose: onContentClose } = useDisclosure();
  const { isOpen: isCommentsOpen, onOpen: onCommentsOpen, onClose: onCommentsClose } = useDisclosure();

  const sentimentColor =
    sentiment === 'positive'
      ? 'green.400'
      : sentiment === 'neutral'
        ? 'gray.400'
        : sentiment === 'negative'
          ? 'red.400'
          : 'gray.200';

  const sentimentIcon =
    sentiment === 'positive'
      ? BiHappy
      : sentiment === 'neutral'
        ? BiMeh
        : sentiment === 'negative'
          ? BiSad
          : BiMeh;

  const sentimentText =
    sentiment === 'positive'
      ? 'Positive'
      : sentiment === 'neutral'
        ? 'Neutral'
        : sentiment === 'negative'
          ? 'Negative'
          : 'Unknown';

  const truncatedContent =
    isTruncated && content.length > 150 ? content.slice(0, 150) + '...' : content;

  // Determine background color based on fake_news value
  const boxBgColor = fake_news === 'Fake' ? 'red.100' : 'gray.100';

  // Round the overall_percentage to 2 decimal places
  const roundedPercentage = overall_percentage.toFixed(2);

  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.50"
      shadow="md"
      p={4}
      id={email}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Avatar src={profileImage} size="md" />
          <Box ml={3}>
            <Text fontWeight="bold">{username}</Text>
            <Text color="gray.500" hidden>{email}</Text> {/* Display email */}
          </Box>
        </Flex>
        <Text color="gray.500" fontSize="sm">{formatTimeAgo(timestamp)}</Text>
      </Flex>

      <Box mt={2} bg={boxBgColor} borderRadius="md">
        <Code fontSize="md" whiteSpace="pre-wrap">
          {truncatedContent}
        </Code>
        {content.length > 150 && (
          <Button size="xs" variant="link" colorScheme="blue" color="black" onClick={onContentOpen}>
            Read More
          </Button>
        )}
      </Box>

      {sentiment && (
        <Flex align="center" mt={2}>
          <Tag size="lg" variant="subtle" colorScheme={sentimentColor}>
            <Icon boxSize="20px" as={sentimentIcon} />
            <TagLabel ml={2}>
              {sentimentText} - {category}
            </TagLabel>
          </Tag>
        </Flex>
      )}

      {/* Display overall percentage */}
      <Text mt={2} fontSize="sm" color="gray.600">
        Overall Sentiment Score: {roundedPercentage}%
      </Text>

      <Divider my={4} />

      <Flex justify="space-between">
        <Flex align="center">
          <IconButton icon={<FaComment />} aria-label="Comment" variant="ghost" onClick={onCommentsOpen} />
          <Text ml={2}>{comments.length}</Text> {/* Display the count of comments */}
        </Flex>
        <Flex align="center">
          <IconButton icon={<FaHeart />} aria-label="Like" variant="ghost" />
          <Text ml={2}>{Likes}</Text> {/* Display the count of likes */}
        </Flex>
        <IconButton icon={<FaShare />} aria-label="Share" variant="ghost" />
      </Flex>

      {/* Modal for displaying full content */}
      <Modal isOpen={isContentOpen} onClose={onContentClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{username}'s Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text whiteSpace="pre-wrap">{content}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onContentClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for displaying comments */}
      {/* <Modal isOpen={isCommentsOpen} onClose={onCommentsClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <Box key={index} p={3} bg="gray.100" borderRadius="md">
                    <Text>{comment}</Text>
                  </Box>
                ))
              ) : (
                <Text>No comments yet.</Text>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCommentsClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
};

export default FeedCard;
