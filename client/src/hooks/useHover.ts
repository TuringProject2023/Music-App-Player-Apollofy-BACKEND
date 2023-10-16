import { useState } from 'react';

export const useHover = (initialValue = false) => {
  const [isHovered, setIsHovered] = useState(initialValue);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return [isHovered, handleMouseEnter, handleMouseLeave] as const;
};
