import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

interface CommentSummaryProps {
  positive: number;
  negative: number;
}

const CommentSummary: FC<CommentSummaryProps> = ({ positive, negative }) => {
  return (
    <Box bg="white" p="6" borderRadius="md" boxShadow="lg" textAlign="center">
      <Text fontSize="2xl" fontWeight="bold">
        Summary
      </Text>
      <Flex direction="column" mt="4" gap="4">
        <VStack spacing="2" bg="#FFFFFF" p="4" borderRadius="md" borderColor={'gray.400'} borderWidth={.1} boxShadow="sm">
          <Text fontSize="lg" fontWeight="semibold" color="black">
            Positive Comments
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="green.400">
            {positive}
          </Text>
        </VStack>
        <VStack spacing="2" bg="#FFFFFF" p="4" borderRadius="md" borderColor={'gray.400'} borderWidth={.1}  boxShadow="sm">
          <Text fontSize="lg" fontWeight="semibold" color="black">
            Negative Comments
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="red.400">
            {negative}
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default CommentSummary;
