import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import ClinicInfo from "@/components/sections/ClinicInfo";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Services />
        <About />
        <WhyChooseUs />
        <Team />
        <Testimonials />
        <CTA />
        <ClinicInfo />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
