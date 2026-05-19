import Hero from './components/Hero';
import About from './components/About';
import CTAStrip from './components/CTAStrip';
import QuoteSection from './components/QuoteSection';
import WhyWorkWithUs from './components/WhyWorkWithUs';
import OurApproach from './components/OurApproach';
import Services from './components/Services';
import Team from './components/Team';
import Projects from './components/Projects';
import Stats from './components/Stats';
import News from './components/News';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <CTAStrip />
      <Hero />
      <About />
      <QuoteSection
        image="/hero6.png"
        label="A Quiet Belief"
        quote="Great architecture is not born from ambition alone — it is drawn from patience, from listening, from the quiet understanding of how people truly want to live."
        attribution="Aureon Studio"
      />
      <OurApproach />
      <QuoteSection
        image="/hero4.png"
        quote="It was a transition from listening to what our needs and problems were, and what kind of aspirations we had, and then converting those into solutions."
        attribution="— Client"
      />
      <WhyWorkWithUs />
      <Services />
      <Team />
      <Projects />
      <Stats />
      <News />
      <Footer />
    </main>
  );
}
