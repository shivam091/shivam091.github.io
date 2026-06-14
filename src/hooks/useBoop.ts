import { useState, useEffect, useCallback } from 'react';

const BOOP_DURATION_MS = 150;

export function useBoop() {
  const [isBooped, setIsBooped] = useState(false);

  const trigger = useCallback(() => {
    setIsBooped(true);
  }, []);

  useEffect(() => {
    if (!isBooped) return;
    const id = window.setTimeout(() => setIsBooped(false), BOOP_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [isBooped]);

  return [isBooped, trigger] as const;
}
