import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Projects from './components/Projects';
import Stats from './components/Stats';
import News from './components/News';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Team />
      <Projects />
      <Stats />
      <News />
      <Footer />
    </main>
  );
}
