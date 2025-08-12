import { useEffect, useState } from "react";
import { customStorage } from "./storage.service";

interface KeyStorageProps {
  /**
   * The current value stored under the given observed key.
   * Returns `null` if the key does not exist.
   */
  keyValue: string | null;

  updateKeyValue: (key: string, value: string) => void;

  removeKey: (key: string) => void;
}

export const useKeyStorage = (keyToObserve?: string): KeyStorageProps => {
  const [keyValue, setKeyValue] = useState<string | null>(null);

  useEffect(() => {
    if (keyToObserve) {
      const unsubscribe = customStorage.subscribe(keyToObserve, setKeyValue);
      return () => {
        unsubscribe();
      };
    }
  }, [keyToObserve]);

  const updateKeyValue = (key: string, keyValue: string) => {
    customStorage.setItem(key, keyValue);
  };

  const removeKey = (key: string) => {
    customStorage.setItem(key, null);
  };

  return { keyValue, updateKeyValue, removeKey };
};
