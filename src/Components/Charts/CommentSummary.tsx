import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

interface CommentSummaryProps {
  positive: number;
  negative: number;
  neutral: number;
}

const CommentSummary: FC<CommentSummaryProps> = ({ positive, negative, neutral }) => {
  return (
    <Box bg="#F3E1AE" p="6" borderRadius="md" boxShadow="lg" textAlign="center">
      <Text fontSize="2xl" fontWeight="bold">
        Comment Summary
      </Text>
      <Flex direction="column" mt="4" gap="4">
        <VStack spacing="2" bg="#FFFFFF" p="4" borderRadius="md" boxShadow="sm">
          <Text fontSize="lg" fontWeight="semibold" color="#8DB596">
            Positive Comments
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="#333">
            {positive}
          </Text>
        </VStack>
        <VStack spacing="2" bg="#FFFFFF" p="4" borderRadius="md" boxShadow="sm">
          <Text fontSize="lg" fontWeight="semibold" color="#F08080">
            Negative Comments
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="#333">
            {negative}
          </Text>
        </VStack>
        <VStack spacing="2" bg="#FFFFFF" p="4" borderRadius="md" boxShadow="sm">
          <Text fontSize="lg" fontWeight="semibold" color="#B0B0B0">
            Neutral Comments
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="#333">
            {neutral}
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default CommentSummary;
