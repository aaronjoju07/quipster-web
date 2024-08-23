import { Container, Grid, GridItem, Flex, Box, Text, Heading } from '@chakra-ui/react';
import { FC } from 'react';

interface StatsTitleDescriptionProps {
  positiveChange: string;
  negativeChange: string;
}

const StatsTitleDescription: FC<StatsTitleDescriptionProps> = ({ positiveChange, negativeChange }) => {
  // Helper function to determine the arrow and format the value
  const getArrowAndFormattedValue = (value: string) => {
    const numericValue = parseFloat(value);
    const formattedValue = Math.abs(numericValue).toFixed(2); // Remove the minus sign and format the value
    const arrow = numericValue >= 0 ? '↑' : '↓'; // Arrow direction based on the value

    return { formattedValue, arrow };
  };

  const { formattedValue: formattedPositiveValue, arrow: positiveArrow } = getArrowAndFormattedValue(positiveChange);
  const { formattedValue: formattedNegativeValue, arrow: negativeArrow } = getArrowAndFormattedValue(negativeChange);

  return (
    <Container py={5} maxW={'container.lg'} backgroundColor={'white'} borderRadius={'md'} boxShadow="lg">
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={6}>
        <GridItem w="100%" colSpan={{ base: 1, sm: 2, md: 2 }}>
          <Heading as={'h2'}>Sentiment Trends Overview Year</Heading>
        </GridItem>
        <GridItem w="100%">
          <Flex flexDirection={'column'}>
            <Flex alignItems={'center'}>
              <Text fontSize={'4xl'} fontWeight={'bold'}>
                {formattedPositiveValue}%
              </Text>
              <Box ml={2} color={parseFloat(positiveChange) >= 0 ? "green.500" : "red.500"} fontSize="4xl">
                {positiveArrow}
              </Box>
            </Flex>
            <Box fontSize={'sm'}>
              Percentage increase in positive sentiment year over year, highlighting growth in favorable opinions.
            </Box>
          </Flex>
        </GridItem>
        <GridItem w="100%">
          <Flex flexDirection={'column'}>
            <Flex alignItems={'center'}>
              <Text fontSize={'4xl'} fontWeight={'bold'}>
                {formattedNegativeValue}%
              </Text>
              <Box ml={2} color={parseFloat(negativeChange) <= 0 ? "red.500" : "green.500"} fontSize="4xl">
                {negativeArrow}
              </Box>
            </Flex>
            <Box fontSize={'sm'}>
              Percentage decrease in negative sentiment year over year, indicating a reduction in unfavorable opinions.
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default StatsTitleDescription;
