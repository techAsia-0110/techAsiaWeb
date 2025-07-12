import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

const AnimatedStat = ({ to }) => {
  const nodeRef = useRef();

  // Extract the number and any suffix (like '+' or '%')
  const number = parseInt(to, 10);
  const suffix = to.toString().replace(number.toString(), '');

  useEffect(() => {
    const node = nodeRef.current;

    //count increment animation
    const controls = animate(0, number, {
      duration: 1, // Animation duration in seconds
      ease: "easeOut", 
      onUpdate(value) {
        // On each frame of the animation, update the text content
        node.textContent = Math.round(value);
      },
      onComplete() {
        // Once the animation is complete, set the final text with the suffix
        node.textContent += suffix;
      }
    });

    // Cleanup function to stop the animation if the component unmounts
    return () => controls.stop();
  }, [to, number, suffix]);

  return <span ref={nodeRef} />;
};

export default AnimatedStat;