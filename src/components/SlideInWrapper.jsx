import React, { useEffect, useRef, useState } from "react";

const SlideInWrapper = ({ children }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={isVisible ? "animate-slide-in" : ""}>
      {children}
    </div>
  );
};

export default SlideInWrapper;
