import { createFileRoute } from "@tanstack/react-router";

import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/fx/Cursor";
import { Loader } from "@/components/fx/Loader";

import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Capabilities } from "@/components/site/Capabilities";
import { Services } from "@/components/site/Services";
import { Projects } from "@/components/site/Projects";
import { Explorations } from "@/components/site/Explorations";
import { About } from "@/components/site/About";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const title = "Yuu Studios - Design, Branding & Development";
const description =
  "Yuu Studios is an independent design, branding and development studio creating exceptional, cinematic digital experiences for ambitious brands.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <Loader />
      <Cursor />
      <div className="relative min-h-screen overflow-x-clip bg-void text-ink">
        {/* Ambient cinematic light beam */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          <div className="light-beam absolute -top-1/4 left-0 h-[150%] w-[150%] blur-3xl" />
          <div className="grain-layer absolute inset-0" />
        </div>

        <Nav />
        <main className="relative z-10">
          <Hero />
          <Marquee />
          <Capabilities />
          <Projects />
          <Explorations />
          <Services />
          <About />
          <WhyUs />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
