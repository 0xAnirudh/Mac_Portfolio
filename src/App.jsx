import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// import { Navbar, SplitText, Welcome } from "#components";
import Navbar from "#components/Navbar.jsx"
import SplitText from "#components/SplitText.jsx"
import Welcome from "#components/Welcome.jsx"

const App = () => {
  const helloRef = useRef(null);
  const splitRef = useRef(null);
  const [overlayPresent, setOverlayPresent] = useState(true);

  useEffect(() => {
    helloRef.current?.play();
    const t = setTimeout(() => splitRef.current?.play(), 400);
    return () => clearTimeout(t);
  }, []);

  const [showText, setShowText] = useState(true);
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      const targets = [];
      if (helloRef.current?.el) targets.push(helloRef.current.el);
      if (splitRef.current?.el) targets.push(splitRef.current.el);
      if (targets.length) gsap.to(targets, { opacity: 0, duration: 1, ease: 'power2.out' });
    }, 6000);

    const hideTimer = setTimeout(() => setShowText(false), 8000);
    const overlayTimer = setTimeout(() => setOverlayPresent(false), 10000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      clearTimeout(overlayTimer);
    };
  }, []);

  const handleOverlayAnimationEnd = () => {};

  return (
    <>
      {overlayPresent && (
        <div className="page-load-overlay" onAnimationEnd={handleOverlayAnimationEnd}>
          <div className="flex items-center justify-center h-full w-full">
            <div className="flex flex-col items-center justify-center gap-2">
              {showText && (
                <>
                  <SplitText
                    ref={helloRef}
                    text="hello"
                    className="text-5xl font-light leading-tight text-center text-gray-300 overflow-visible" 
                    style={{ fontFamily: "'Borel', sans-serif" }}
                    delay={150}
                    duration={1.20}
                    ease="power3.out"
                    splitType="words"
                    from={{ opacity: 0, y: 20 }}
                    to={{ opacity: 1, y: 0 }}
                  />
                  <SplitText
                    ref={splitRef}
                    text="Anirudh!"
                    className="text-7xl font-Regular text-center text-white" 
                    style={{ fontFamily: "'Space Mono', monospace" }}
                    delay={130}
                    duration={1.20}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <main>
        <Navbar/>
        <Welcome/>
      </main>
    </>
  )
}

export default App 
