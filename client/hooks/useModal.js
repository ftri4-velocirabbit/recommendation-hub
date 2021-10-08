import { useState, useCallback } from 'react';

/**
 * Custom hook to control a MUI modal.
 * @returns `[isOpen, handleOpen, handleClose]`
 */
export default function useModal(initialIsOpen = false) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  // modal actions
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return [isOpen, handleOpen, handleClose];
}
