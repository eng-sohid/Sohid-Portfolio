import Navbar from "../components/Navbar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import Footer from "../components/Footer";
import Education from "../components/sections/Education";
import Services from "../components/sections/Services";

import Preloader from "../components/Preloader";
import Cursor from "../components/Cursor";
import SmoothScroll from "../components/motion/SmoothScroll";
import ScrollProgress from "../components/ScrollProgress";
import Parallax from "../components/motion/Parallax";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <SmoothScroll />
      <ScrollProgress />
      <Parallax />

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
