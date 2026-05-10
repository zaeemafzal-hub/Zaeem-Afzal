import "@/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const HomePage = () => (
  <>
    <SmoothScroll />
    <CustomCursor />
    <Nav />
    <main className="relative">
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <TechStack />
      <Contact />
      <Footer />
    </main>
    <Toaster
      theme="dark"
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#0f0f0f",
          border: "1px solid #262626",
          color: "#f5f5f5",
          fontFamily: "General Sans, sans-serif",
        },
      }}
    />
  </>
);

function App() {
  return (
    <div className="App bg-[#050505] text-[#f5f5f5] min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
