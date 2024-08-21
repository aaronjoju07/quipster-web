// Navbar.tsx
import React, { useState } from 'react';
import { Box, Button, Flex, Link, Spacer, Avatar, Text, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Auth/firebase';
import { signOut } from 'firebase/auth';
import { User } from '../Pages/Feed';

interface NavbarProps {
    user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Clear user data from local storage
            localStorage.removeItem('user');

            // Sign out from Firebase
            await signOut(auth);
            // Navigate to the root
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            p={1}
            bg="gray.100"
            borderBottom="1px"
            borderColor="gray.100"
            borderRadius={12}
        >
            {/* Navigation Links */}
            <Flex align="center">
                <Link
                    as="button"
                    onClick={() => navigate('/home')}
                    fontSize="lg"
                    fontWeight="bold"
                >
                    <Box p={2}>
                        <HStack>

                        <img
                            src={'src/assets/qlogo.png' || 'default_logo.png'} // Fallback to a default logo
                            alt="Logo"
                            style={{ height: '40px', width: 'auto' }} // Adjust height as needed
                            />
                        <Text>Quipster</Text>
                            </HStack>
                    </Box>
                </Link>
                <Link
                    as="button"
                    onClick={() => navigate('/analysis')}
                    p={4}
                    fontSize="lg"
                >
                    Analysis
                </Link>
                <Link
                    as="button"
                    onClick={() => navigate('/about')}
                    p={4}
                    fontSize="lg"
                >
                    About
                </Link>
            </Flex>

            <Spacer />

            {/* User Profile with Popover */}
            <Box p={1} borderEnd={'120px'}>
                <Popover>
                    <PopoverTrigger>
                        <Button
                            variant="link"
                            p={0}
                            onClick={() => setIsOpen(!isOpen)}
                            disabled={!user} // Disable button if user is null
                        >
                            <Avatar
                                src={user?.photoURL || undefined}
                                name={user?.displayName || "User"}
                                size="md"
                                ml={4}
                            />
                        </Button>
                    </PopoverTrigger>
                    {user && (
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>
                                <Text fontWeight="bold">{user.displayName}</Text>
                            </PopoverHeader>
                            <PopoverBody>
                                <Text>{user.email}</Text>
                                <Button mt={4} onClick={handleLogout} colorScheme="red" width="full">
                                    Logout
                                </Button>
                            </PopoverBody>
                        </PopoverContent>
                    )}
                </Popover>
            </Box>
        </Flex>
    );
};

export default Navbar;
