
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedResources from "./components/FeaturedResources";
import TopCreators from "./components/TopCreators";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function LandingPage() {

  return (

    <>
      <Navbar />
      <Hero />
      <Categories />
       <FeaturedResources/>
       <TopCreators/>
        <HowItWorks />
        <Testimonials/>
         <CTA />
         <Footer/>
    </>

  );

}

export default LandingPage;