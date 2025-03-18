import React, { useEffect, useRef, useState, useCallback } from "react";

const SlideInWrapper = ({ children, className = "" }) => {
  const ref = useRef();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          // console.log("Element entered viewport");
          setIsVisible(true);
        } else if (entry.intersectionRatio === 0 && isVisible) {
          // console.log("Element completely out of viewport");
          setIsVisible(false);
        }
      },
      { threshold: [0, 0.5] } // Detects both full exit (0) and partial visibility (0.3)
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, [isVisible]);
  return (
    <div
      ref={ref}
      className={`${
        isVisible ? "animate-slide-in " : "opacity-0 "
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default SlideInWrapper;
