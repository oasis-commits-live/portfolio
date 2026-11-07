import { useState, useEffect } from 'react';

export function useTypewriter(
  text: string,
  speed: number = 38,
  startDelay: number = 600
): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const delayTimeoutId = setTimeout(() => {
      if (!isMounted) return;

      intervalId = setInterval(() => {
        if (!isMounted) return;

        if (charIndex < text.length) {
          charIndex++;
          setDisplayed(text.slice(0, charIndex));
        } else {
          setDone(true);
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        }
      }, speed);
    }, startDelay);

    return () => {
      isMounted = false;
      clearTimeout(delayTimeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
