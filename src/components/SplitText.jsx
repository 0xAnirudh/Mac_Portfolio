import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(GSAPSplitText);

const SplitText = forwardRef(({
  text,
  className = '',
  style = {},
  delay = 90,
  duration = 1.5,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  tag = 'p',
  onLetterAnimationComplete
}, ref) => {
  const elRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    if (!elRef.current) return;
    const el = elRef.current;

    if (el._splitInstance) {
      try {
        el._splitInstance.revert();
      } catch (_) {
        /* ignore */
      }
      el._splitInstance = null;
    }

    const splitInstance = new GSAPSplitText(el, {
      type: splitType,
      smartWrap: true,
      autoSplit: splitType === 'lines',
      linesClass: 'split-line',
      wordsClass: 'split-word',
      charsClass: 'split-char',
      reduceWhiteSpace: false
    });

    const targets = (splitInstance.chars && splitInstance.chars.length)
      ? splitInstance.chars
      : (splitInstance.words && splitInstance.words.length)
        ? splitInstance.words
        : splitInstance.lines;

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      targets,
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: () => {
          onLetterAnimationComplete?.();
        }
      }
    );

    tlRef.current = tl;
    el._splitInstance = splitInstance;

    return () => {
      try {
        splitInstance.revert();
      } catch (_) {
        /* ignore */
      }
      el._splitInstance = null;
      tl.kill?.();
      tlRef.current = null;
    };
  }, [text, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to)]);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    play: () => {
      if (!tlRef.current) return Promise.resolve();
      return new Promise(resolve => {
        const tl = tlRef.current;
        const prev = tl.eventCallback('onComplete');
        tl.eventCallback('onComplete', function() {
          prev?.();
          tl.eventCallback('onComplete', prev || null);
          resolve();
        });
        tl.play();
      });
    },
    reverse: () => {
      if (!tlRef.current) return Promise.resolve();
      return new Promise(resolve => {
        const tl = tlRef.current;
        const prev = tl.eventCallback('onReverseComplete');
        tl.eventCallback('onReverseComplete', function() {
          prev?.();
          tl.eventCallback('onReverseComplete', prev || null);
          resolve();
        });
        tl.reverse();
      });
    },
    timeline: tlRef
  }));

  const Tag = tag || 'p';

  return (
    <Tag ref={elRef} style={style} className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}>
      {text}
    </Tag>
  );
});

export default SplitText;
