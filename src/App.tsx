import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'; // Adjust the import path if necessary
import Feed from './Pages/Feed'; // Adjust the import path if necessary
import Analysis from './Pages/Analysis'; // Adjust the import path if necessary
import theme from './Theme/theme'; // Adjust the import path if necessary
import Layout, { User } from './Components/Layout';
import About from './Pages/About';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
if (!user) {
  return(
    <ChakraProvider theme={theme}>
      <Router>
        <Layout user={user}>
          <Routes>
          <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  )
}
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Layout user={user}>
          <Routes>
            {user ? (
              <>
                <Route path="/home" element={<Feed />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/about" element={<About />} />
                {/* Redirect to home or another route if needed */}
                <Route path="/" element={<Feed />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* Optionally add a redirect or a route for logged-out users */}
                {/* <Route path="*" element={<Home />} /> */}
              </>
            )}
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
};

export default App;
