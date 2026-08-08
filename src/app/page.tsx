import Hero from "../components/homepage/Hero";
import About from "../components/aboutuspage/About";
import FiveCrafts from "../components/craftworkpage/components/FiveCrafts";
import WhyChooseUs from "../components/whypage/WhyChooseUs";
import Process from "../components/processpage/Process";
import Faq from "../components/faqpage/Faq";
import Gallery from "../components/gallerypage/Gallery";
import ContactInfoPanel from "../components/contactpage/Contactinfopanel";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main id="Home">
      <Hero />

      <section id="About">
        <About />
      </section>

      <section id="FiveCrafts">
        <FiveCrafts />
      </section>

      <section id="Process">
        <Process />
      </section>

      <section id="WhyChooseUs">
        <WhyChooseUs />
      </section>

      <section id="Gallery">
        <Gallery />
      </section>

      <section id="Faq">
        <Faq />
      </section>

      <section id="ContactInfoPanel">
        <ContactInfoPanel />
      </section>

      <Footer />
    </main>
  );
}