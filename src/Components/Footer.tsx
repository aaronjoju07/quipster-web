import { Box, Text, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      py={6}
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      textAlign="center"
    >
      <Text fontSize={'sm'}>
        © 2024 Quipster. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
