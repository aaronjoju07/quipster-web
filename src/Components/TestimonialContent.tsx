'use client'

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
}

const Testimonial = (props: Props) => {
  const { children } = props

  return <Box>{children}</Box>
}

const TestimonialContent = (props: Props) => {
  const { children } = props

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  )
}

const TestimonialHeading = (props: Props) => {
  const { children } = props

  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  )
}

const TestimonialText = (props: Props) => {
  const { children } = props

  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  )
}

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string
  name: string
  title: string
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  )
}

export default function WithSpeechBubbles() {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>Project Development Insights</Heading>
          <Text>Feedback and reflections from our team on working on this project.</Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Creative Problem-Solving</TestimonialHeading>
              <TestimonialText>
                Throughout this project, we encountered various challenges that required innovative solutions and adaptive thinking.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://media.licdn.com/dms/image/D4E03AQEdVoFxX3RV7g/profile-displayphoto-shrink_200_200/0/1705822432374?e=2147483647&v=beta&t=Z5ObXgZw-UjLwin8Kw3uo4vdvSdDU2J7MsWBQ2LSbq0'
              }
              name={'Aaron Joju'}
              title={'Team Lead'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Enhanced Collaboration</TestimonialHeading>
              <TestimonialText>
                This project significantly improved our team collaboration and communication, leading to a more cohesive and efficient workflow.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://media.licdn.com/dms/image/v2/D5603AQEV6dUp2DP13Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1706789954317?e=2147483647&v=beta&t=Mihzv567k0J8tSdL_zj0MatH9IsFNW0bq0M9JKFzMoE'
              }
              name={'Sona Sabu'}
              title={'Project Coordinator'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Efficient Project Management</TestimonialHeading>
              <TestimonialText>
                Our approach to project management helped streamline tasks and ensure timely completion of key milestones.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
              }
              name={'Akhil Babay'}
              title={'Technical Lead'}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  )
}
