import React from 'react';
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
  Code
} from '@chakra-ui/react';
import { FaHeart, FaShare, FaComment } from 'react-icons/fa';
import { BiHappy, BiSad, BiMeh } from 'react-icons/bi';
import { formatTimeAgo } from '../utils/timeUtils'; // Adjust import path as needed

interface FeedCardProps {
  profileImage: string;
  username: string;
  email: string;
  handle: string;
  content: string;
  timestamp: Date; // Updated to Date
  sentiment?: 'positive' | 'neutral' | 'negative'; // Sentiment prop
}

const FeedCard: React.FC<FeedCardProps> = ({
  profileImage,
  username,
  email,
  handle,
  content,
  timestamp,
  sentiment,
}) => {
  const sentimentColor = sentiment === 'positive' ? 'green.400' : sentiment === 'neutral' ? 'gray.400' : sentiment === 'negative' ? 'red.400' : 'gray.200';
  const sentimentIcon = sentiment === 'positive' ? BiHappy : sentiment === 'neutral' ? BiMeh : sentiment === 'negative' ? BiSad : BiMeh;
  const sentimentText = sentiment === 'positive' ? 'Positive' : sentiment === 'neutral' ? 'Neutral' : sentiment === 'negative' ? 'Negative' : 'Unknown';

  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.50"
      shadow="md"
      p={4}
      id={handle}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Avatar src={profileImage} size="md" />
          <Box ml={3}>
            <Text fontWeight="bold">{username}</Text>
            <Text color="gray.500" hidden >{email}</Text> {/* Display email */}
          </Box>
        </Flex>
        <Text color="gray.500" fontSize="sm">{formatTimeAgo(timestamp)}</Text>
      </Flex>

      <Box mt={2} bg="gray.100" borderRadius="md">
        <Code colorScheme="yellow" fontSize="md" whiteSpace="pre-wrap">
          {content}
        </Code>
      </Box>

      {sentiment && (
        <Flex align="center" mt={2}>
          <Tag size="lg" variant="subtle" colorScheme={sentimentColor}>
            <Icon boxSize="12px" as={sentimentIcon} />
            <TagLabel ml={2}>{sentimentText}</TagLabel>
          </Tag>
        </Flex>
      )}

      <Divider my={4} />

      <Flex justify="space-between">
        <IconButton icon={<FaComment />} aria-label="Comment" variant="ghost" />
        {/* <IconButton icon={<FaRetweet />} aria-label="Retweet" variant="ghost" /> */}
        <IconButton icon={<FaHeart />} aria-label="Like" variant="ghost" />
        <IconButton icon={<FaShare />} aria-label="Share" variant="ghost" />
      </Flex>
    </Box>
  );
};

export default FeedCard;
