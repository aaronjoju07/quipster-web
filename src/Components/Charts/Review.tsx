import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

interface ReviewProps {
  reviewText: string;
}

const Review: FC<ReviewProps> = ({ reviewText }) => {
  return (
    <Box
      h="100%"
      w="100%"
      bg="#F3E1AE"
      borderRadius="md"
      boxShadow="base"
      p="4"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Text fontSize="xl" fontWeight="bold" fontStyle="italic" color="#3A3A3A">
        {reviewText}
      </Text>
    </Box>
  );
};

export default Review;
