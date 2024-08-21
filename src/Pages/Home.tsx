import { Divider } from "@chakra-ui/react";
import Auth from "../Components/Auth";
import CallToActionWithAnnotation from "../Components/CallToActionWithAnnotation";

const Home = () => {
  const handleGetStarted = () => {
    // Handle "Get Started" button click
    // e.g., Scroll to section with id "sec1" or perform another action
    document.getElementById('sec1')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* hero */}
      <div className="container">
        <CallToActionWithAnnotation onGetStarted={handleGetStarted} />
      </div>
      {/* auth */}
      <Divider 
        borderColor="gray.700" 
      />      
      <div id="sec1" className="container">
        <Auth />
      </div>
    </div>
  );
};

export default Home;
