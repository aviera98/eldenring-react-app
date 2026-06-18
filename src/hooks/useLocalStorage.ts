import { useEffect, useState } from 'react';

const readStorageValue = <T>(key: string, initialValue: T) => {
  if (typeof window === 'undefined') {
    return initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);

    return item ? (JSON.parse(item) as T) : initialValue;
  } catch {
    return initialValue;
  }
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => readStorageValue(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore quota and serialization issues to keep UI responsive.
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};
