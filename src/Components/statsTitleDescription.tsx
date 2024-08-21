import { Container, Grid, GridItem, Flex, Box, Text, Heading } from '@chakra-ui/react'

function StatsTitleDescription() {
  return (
    <Container py={5} maxW={'container.lg'}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={6}>
        <GridItem w="100%" colSpan={{ base: 1, sm: 2, md: 2 }}>
          <Heading as={'h2'}>Sentiment Trends Overview</Heading>
        </GridItem>
        <GridItem w="100%">
          <Flex flexDirection={'column'}>
            <Flex alignItems={'center'}>
              <Text fontSize={'4xl'} fontWeight={'bold'}>
                20%
              </Text>
              <Box ml={2} color="green.500" fontSize="4xl">
                &#9650; {/* Unicode for up arrow */}
              </Box>
            </Flex>
            <Box fontSize={'sm'}>
              Percentage increase in positive sentiment week over week, highlighting growth in favorable opinions.
            </Box>
          </Flex>
        </GridItem>
        <GridItem w="100%">
          <Flex flexDirection={'column'}>
            <Flex alignItems={'center'}>
              <Text fontSize={'4xl'} fontWeight={'bold'}>
                20%
              </Text>
              <Box ml={2} color="red.500" fontSize="4xl">
                &#9660; {/* Unicode for down arrow */}
              </Box>
            </Flex>
            <Box fontSize={'sm'}>
              Percentage decrease in negative sentiment week over week, indicating a reduction in unfavorable opinions.
            </Box>
          </Flex>
          {/* <Chart /> */}
        </GridItem>
      </Grid>
    </Container>
  )
}

export default StatsTitleDescription