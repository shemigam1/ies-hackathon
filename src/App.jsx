import { useEffect, useRef, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import CircuitBackground from "./components/CircuitBackground";
import ParticlesCanvas from "./components/ParticlesCanvas";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MissionSection from "./components/MissionSection";
import ArduinoSection from "./components/ArduinoSection";
import ConferenceSection from "./components/ConferenceSection";
import GallerySection from "./components/GallerySection";
import EventsSection from "./components/EventsSection";
import RegisterSection from "./components/RegisterSection";
import Footer from "./components/Footer";

function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);

    let animId;
    const animateRing = () => {
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringPosRef.current.x + "px";
        ringRef.current.style.top = ringPosRef.current.y + "px";
      }
      animId = requestAnimationFrame(animateRing);
    };
    animateRing();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #050810 0%, #0A0E1A 40%, #050810 100%)",
          position: "relative",
        }}
      >
        {/* Persistent backgrounds */}
        <CircuitBackground />
        <ParticlesCanvas />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Navigation */}
        <Navbar />

        {/* Page sections */}
        <main style={{ position: "relative", zIndex: 2 }}>
          <HeroSection />

          {/* YouTube Live Stream */}
          <section style={{ display: 'flex', justifyContent: 'center', padding: '2rem 1rem 4rem' }}>
            <div style={{ width: '100%', maxWidth: '900px', aspectRatio: '16/9' }}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/bDu1SZLcs1E"
                title="YouTube Live Stream"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '12px', border: '1px solid rgba(0,255,170,0.2)' }}
              />
            </div>
          </section>

          <AboutSection />
          <MissionSection />
          <ArduinoSection />
          <ConferenceSection />
          <GallerySection />
          {/* <EventsSection /> */}
          <RegisterSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
