import React, { useMemo } from 'react';

const BackgroundHexagons = () => {
  const hexagons = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      // Pick a side: 0 for left, 1 for right (avoids middle)
      const side = Math.random() < 0.5 ? 0 : 1;
      const leftPos = side === 0 ? Math.random() * 25 : 75 + Math.random() * 25;

      return {
        id: i,
        left: leftPos,
        size: Math.random() * 6 + 2, // random size between 2rem and 8rem
        duration: Math.random() * 40 + 35, // slower speed between 35s and 75s
        delay: Math.random() * -60, // negative delay so they are pre-distributed
        opacity: Math.random() * 0.08 + 0.02, // more subtle opacity
        colorIndex: Math.floor(Math.random() * 4), // random color from player colors
      };
    });
  }, []);

  const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="bg-hex-container">
      {hexagons.map((hex) => (
        <div
          key={hex.id}
          className="bg-floating-hex"
          style={{
            left: `${hex.left}%`,
            fontSize: `${hex.size}rem`,
            animationDuration: `${hex.duration}s`,
            animationDelay: `${hex.delay}s`,
            opacity: hex.opacity,
            color: colors[hex.colorIndex],
          }}
        >
          ⬡
        </div>
      ))}
    </div>
  );
};

export default BackgroundHexagons;
