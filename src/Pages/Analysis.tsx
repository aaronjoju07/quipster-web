import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const Analysis: React.FC = () => {
  return (
    <Flex
      minH="100vh"
      p={5}
      pt={20}
      gap={4}
      alignItems="center"
      bg="gray.100"
    >
      <Box w="25%" display="flex" flexDirection="column" gap={5}>
        <Box h="20%" bg="#E2E8F0">asd</Box>
        <Box h="20%" bg="#F7FAFC">asda</Box>
        <Box h="60%" bg="#F7FAFC">asd</Box>
      </Box>

      <Box w="25%" display="flex" flexDirection="column" gap={5}>
        <Box h="40%" bg="#F7FAFC">asd</Box>
        <Box h="60%" bg="#F7FAFC">asd</Box>
      </Box>

      <Box w="50%" display="flex" flexDirection="column" gap={5}>
        <Box h="72" bg="#F7FAFC"></Box>
        <Flex gap={5}>
          <Box w="50%" h="56" bg="#F7FAFC"></Box>
          <Box w="50%" h="56" bg="#F7FAFC"></Box>
        </Flex>
        <Box h="32" bg="#EDF2F7"></Box>
      </Box>
    </Flex>
  );
};

export default Analysis;
