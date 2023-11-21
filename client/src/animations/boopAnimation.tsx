import { animated} from 'react-spring';
import useBoop from '../hooks/useBoop';
import React, { useEffect, useState } from 'react';


// components/Boop.jsx
interface Props {
  children: React.ReactNode;
  rotation: number;
  timing: number;
  
}

export const Boop = ({ children, ...boopConfig }: Props) => {
    const [style, trigger] = useBoop(boopConfig);
     
    return (
      <animated.span onMouseEnter={trigger as React.MouseEventHandler<HTMLSpanElement>} style={style}>
        {children}
      </animated.span>
    );
  };


  export const BoopSu = ({ rotation = 0, timing = 150, children }: Props) => {
    const [isBooped, setIsBooped] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const style: any = {
      display: 'inline-block',
      backfaceVisibility: 'hidden',
      transform: isBooped
        ? `rotate(${rotation}deg)`
        : `rotate(0deg)`,
      transition: `transform ${timing}ms`,
    };
    useEffect(() => {
      if (!isBooped) {
        return;
      }
      const timeoutId = window.setTimeout(() => {
        setIsBooped(false);
      }, timing);
      return () => {
        window.clearTimeout(timeoutId);
      };
    }, [isBooped, timing]);
    const trigger = () => {
      setIsBooped(true);
    };
    return (
      <span onMouseEnter={trigger} style={style}>
        {children}
      </span>
    );
  };