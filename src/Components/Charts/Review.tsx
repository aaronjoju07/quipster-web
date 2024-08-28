import { Box, Text, UnorderedList, ListItem, Heading, Stack } from "@chakra-ui/react";
import { FC, Fragment } from "react";
import Markdown from 'react-markdown'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

interface ReviewProps {
  reviewText: string;
  isloading:boolean;
}

const Review: FC<ReviewProps> = ({ reviewText,isloading }) => {
  // Helper function to split and format the review text
  const parseReviewText = (text: string) => {
    const sections = text.split("\n\n").map((section, index) => {
      if (section.startsWith("**")) {
        // Extract and format headers
        const headingMatch = section.match(/\*\*(.*?)\*\*/);
        const content = section.replace(/\*\*(.*?)\*\*/, "").trim();

        if (headingMatch) {
          return (
            <Fragment key={index}>
              <Heading size="md" mt={4} mb={2} color="#2D3748">
                {headingMatch[1]}
              </Heading>
              <Text mb={2}>{content}</Text>
            </Fragment>
          );
        }
      } else if (section.trim().startsWith("*")) {
        // Format bullet points
        const items = section.trim().split("\n").map((item, itemIndex) => (
          <ListItem key={`${index}-${itemIndex}`}>
            {item.replace(/^\* /, "")}
          </ListItem>
        ));
        return (
          <UnorderedList key={index} styleType="disc" pl={4} mb={4}>
            {items}
          </UnorderedList>
        );
      } else {
        // Regular text block
        return (
          <Text key={index} mb={2}>
            {section}
          </Text>
        );
      }
    });
    return sections;
  };

  return (
    <>
    {isloading ?
    <Stack p={1}>
    <Skeleton height='23px' />
    <Skeleton height='18px' />
    <Skeleton height='18px' />
    <Skeleton height='18px' />
    <Skeleton height='20px' />
    <Skeleton height='18px' />
    <Skeleton height='18px' />
  </Stack>
    :(<Box>
      <Markdown >{reviewText}</Markdown>
    </Box>)
    }
    </>
  );
};

export default Review;
