import React, { useState, useEffect } from 'react';

const AnimatedCounter = ({ 
  value, 
  duration = 2000, 
  formatter = (val) => val.toString(), 
  className = "text-lg font-bold text-gray-800" 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    const startValue = 0;
    const endValue = value;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);
      
      const currentValue = startValue + (endValue - startValue) * easedProgress;
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    };
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animate();
        }
      },
      { threshold: 0.5 }
    );
    
    const element = document.getElementById(`counter-${Math.random()}`);
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span 
      id={`counter-${Math.random()}`}
      className={className}
    >
      {formatter(displayValue)}
    </span>
  );
};

export default AnimatedCounter;