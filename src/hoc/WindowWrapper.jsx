import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { useLayoutEffect, useRef } from "react";

const WindowWrapper = (Component, windowKey) => {

  const Wrapped = (props) => {
      const {focusWindow, windows} = useWindowStore();
      const {isOpen, zIndex} = windows[windowKey];
      const ref = useRef(null);

      useGSAP(() => {
        const el = ref.current;
        if (!el) return;

        gsap.killTweensOf(el);

        if (isOpen) {
          el.style.display = "block";
          
          gsap.fromTo(
            el,
            { scale: 0.8, opacity: 0, y: 40 },
            { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
          );
          return;
        }

        gsap.to(el, {
          scale: 0.9,
          opacity: 0,
          y: 20,
          duration: 0.22,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      }, [isOpen]);

      useGSAP(() => {
        const el = ref.current;
        if(!el) return;

        const [instance] = Draggable.create(el, {onPress: () => focusWindow (windowKey)});

        return () => instance.kill();
      }, []);

      useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.display = isOpen ? "block" : "none";
      }, []);

      return (
        <section 
          id={windowKey} 
          ref={ref} 
          style={{zIndex}}
          className="absolute">
            <Component {...props}/>
        </section>
      );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.Name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper