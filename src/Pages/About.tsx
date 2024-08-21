import { Heading, HStack, Stack, Text, Box } from "@chakra-ui/react";
import WithSpeechBubbles from "../Components/TestimonialContent";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <Box>

    <Box p={6}>
      <Stack spacing={6} align={'center'}>
        <Heading as="h1">About the Project</Heading>
      </Stack>
      <HStack spacing={4} p={6} mt={8} align={'center'} justify={'center'}>
        {/* Placeholder for image */}
        <img src="src/assets/s1.png" alt="Project Overview" style={{ borderRadius: '8px', width: '530px', height: 'auto' }} />
        <Text fontSize="lg" textAlign="center">
          <strong>Project Overview:</strong>This project aims to deepen our grasp of data analysis and machine learning by integrating multiple models to analyze and classify tweets. We developed a comprehensive workflow that incorporates sentiment analysis, category detection, and fake news identification. By combining these models, we gain a nuanced understanding of both the emotional and factual content of tweets, enabling us to identify trends, detect misinformation, and derive insights into user engagement.
        </Text>
      </HStack>
      <WithSpeechBubbles />
    </Box>
      <Footer />
    </Box>
  );
}

export default About;
