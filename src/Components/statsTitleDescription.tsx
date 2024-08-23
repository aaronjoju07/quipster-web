import { Container, Grid, GridItem, Flex, Box, Text, Heading } from '@chakra-ui/react';
import { FC } from 'react';

interface StatsTitleDescriptionProps {
  positiveChange: string;
  negativeChange: string;
}

const StatsTitleDescription: FC<StatsTitleDescriptionProps> = ({ positiveChange, negativeChange }) => {
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
                {positiveChange}%
              </Text>
              <Box ml={2} color="green.500" fontSize="4xl">
                &#9650; {/* Unicode for up arrow */}
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
                {negativeChange}%
              </Text>
              <Box ml={2} color="red.500" fontSize="4xl">
                &#9660; {/* Unicode for down arrow */}
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
