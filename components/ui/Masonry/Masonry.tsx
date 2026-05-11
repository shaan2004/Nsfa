"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

// Safely handles window resize events
const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex(q => window.matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => window.matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => window.matchMedia(q).removeEventListener('change', handler));
  }, [queries, values, defaultValue]);

  return value;
};

// Measures the exact width of the container to calculate columns
const useMeasure = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

/* --- OPTIMIZED SMART CARD USING NEXT/IMAGE --- */
const MasonryCard = ({ item, scaleOnHover, hoverScale }: any) => {
  const [imgSrc, setImgSrc] = useState(item.img);

  // Instantly swap extension if Next/Image throws a 404
  const handleError = () => {
    if (imgSrc.endsWith('.jpeg')) setImgSrc(imgSrc.replace('.jpeg', '.jpg'));
    else if (imgSrc.endsWith('.jpg')) setImgSrc(imgSrc.replace('.jpg', '.jpeg'));
  };

  return (
    <div
      className="absolute p-2 transition-all duration-300 ease-out"
      style={{
        transform: `translate(${item.x}px, ${item.y}px)`,
        width: item.w,
        height: item.h,
        willChange: 'transform',
      }}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0px_10px_30px_-10px_rgba(0,0,0,0.5)] border border-white/10 cursor-pointer">
        <div 
          className="w-full h-full transition-transform duration-300 ease-out"
          style={scaleOnHover ? { transformOrigin: 'center' } : {}}
          onMouseEnter={(e) => scaleOnHover && (e.currentTarget.style.transform = `scale(${hoverScale})`)}
          onMouseLeave={(e) => scaleOnHover && (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Image 
            src={imgSrc} 
            alt="Gallery Event" 
            fill 
            sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw" 
            className="object-cover" 
            onError={handleError} 
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default function Masonry({
  items,
  scaleOnHover = true,
  hoverScale = 0.98,
}: any) {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();

  // Calculate X, Y, Width, and Height for each image purely mathematically
  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map((child: any) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2; // Scaling logic from original script
      const y = colHeights[col];
      
      colHeights[col] += height;
      
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  // NEW: Mathematically calculate the absolute maximum height of the grid
  const containerHeight = useMemo(() => {
    if (grid.length === 0) return 0;
    return Math.max(...grid.map((item: any) => item.y + item.h));
  }, [grid]);

  return (
    // We apply the exact calculated height here so the scrollbar works perfectly
    <div ref={containerRef as any} className="relative w-full" style={{ height: containerHeight }}>
      {grid.map((item: any) => (
        <MasonryCard 
          key={item.id} 
          item={item} 
          scaleOnHover={scaleOnHover}
          hoverScale={hoverScale}
        />
      ))}
    </div>
  );
}