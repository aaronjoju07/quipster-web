import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from './Nav'; // Adjust import path if needed


export interface User {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

interface LayoutProps {
    user: User | null; 
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, children }) => {
    
    return (
        <Flex direction="column" height="100vh" overflow="hidden">
            {/* Conditionally render Navbar only if user exists */}
            {user && (
                <Box p={4}>
                    <Navbar user={user} />
                </Box>
            )}
            <Box flex="1" overflowY="auto" p={4} bg="white"> {/* Fixed bg color value */}
                {children}
            </Box>
        </Flex>
    );
};

export default Layout;
