import { useEffect } from 'react';

export default function useOutsideClick(callback, ...refs) {
  useEffect(() => {
    function handleClickOutside(event) {
      const matchingRef = refs.find((ref) => {
        return ref.current && ref.current.contains(event.target);
      });
      if (!matchingRef) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback]);
}
