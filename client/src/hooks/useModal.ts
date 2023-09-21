import { useState } from 'react';

export const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeModal2 = () => setIsOpen(false);
  return [isOpen, openModal, closeModal, closeModal2] as const;
};
