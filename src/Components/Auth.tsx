import React from 'react';
import { Box, Button, Container, Flex, Image, Text } from '@chakra-ui/react';
import { signInWithPopup, UserCredential } from 'firebase/auth';
import { auth, provider } from '../Auth/firebase';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
    const navigate = useNavigate();
    const handleSignIn = async () => {
        try {
          const result: UserCredential = await signInWithPopup(auth, provider);
          // The signed-in user info
          const user = result.user;
        //   console.log('User Info:', user);
    
          // Save user info to local storage
          localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }));
    

          navigate('/home'); 
          window.location.reload();
    
        } catch (error) {
          console.error('Error signing in with Google:', (error as Error).message);
        }
      };

    return (
        <Container minHeight="100vh" p={0}>
            <Flex
                maxW={'3xl'}
                py={{ base: 20, md: 6 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                {/* Image Section */}
                <Box flex="1" display="flex" justifyContent="center" alignItems="center">
                    <Image
                        src='https://cdn.dribbble.com/users/33385/screenshots/15992381/media/d34d887ec7ae523d9a9abb61390a1ce7.png?resize=1600x1200&vertical=center'
                        alt='home image'
                        boxSize={{ base: '400px', md: '600px' }} // Adjust size as needed
                        objectFit='cover'
                        borderRadius='md'
                    />
                </Box>

                {/* Sign In Section */}
                <Box flex="1" display="flex" justifyContent="center" >
                    <Box textAlign="center">
                        <Text fontSize="xl" mb={9}>
                            Join us and unlock the full potential of your online presence.
                            <br />
                            Connect with your Google account to get started!
                        </Text>
                        {/* <Text fontSize="2xl" mb={4}>Sign in with Google</Text> */}
                        <Button colorScheme="blue" onClick={handleSignIn}>
                            Sign In with Google
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </Container>
    );
};

export default Auth;
