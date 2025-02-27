import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Demo from '../components/sections/Demo';
import Pricing from '../components/sections/Pricing';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Demo />
      <Pricing />
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default Landing; 