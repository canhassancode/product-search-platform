"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

type LordIconProps = {
  iconName: string;
  size?: number;
  className?: string;
};

export type LordIconRef = {
  play: () => void;
};

const LordIcon = forwardRef<LordIconRef, LordIconProps>(({ iconName, size = 24, className = "" }, ref) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch(`/${iconName}.json`);
        if (!response.ok) {
          console.error(`Failed to load animation: ${iconName}.json`);
          return;
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error(`Error loading animation ${iconName}:`, error);
      }
    };

    loadAnimation();
  }, [iconName]);

  useEffect(() => {
    if (animationData && lottieRef.current && !hasPlayedOnce) {
      // Small delay to ensure the Lottie component is fully mounted
      setTimeout(() => {
        if (lottieRef.current) {
          lottieRef.current.goToAndPlay(0, true);
          setHasPlayedOnce(true);
        }
      }, 100);
    }
  }, [animationData, hasPlayedOnce]);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (lottieRef.current) {
        lottieRef.current.goToAndPlay(0, true);
      }
    },
  }));

  if (!animationData) {
    return <div style={{ width: size, height: size }} className={className} />;
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <Lottie lottieRef={lottieRef} animationData={animationData} loop={false} autoplay={false} style={{ width: size, height: size }} />
    </div>
  );
});

LordIcon.displayName = "LordIcon";

export default LordIcon;
