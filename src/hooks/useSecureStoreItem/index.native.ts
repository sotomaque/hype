import { useCallback, useEffect, useState } from 'react';
import * as ExpoSecureStore from 'expo-secure-store';

const useSecureStoreItem = <T>(
  key: string,
  { initialValue }: { initialValue?: T } = {}
): [T | undefined, (newValue: T) => void] => {
  const [initialized, setInitialized] = useState(false);
  const [item, setItem] = useState<T | undefined>();

  const updateItem = useCallback(
    async (value) => {
      setItem(value);

      if (value) {
        await ExpoSecureStore.setItemAsync(key, JSON.stringify(value));
      } else {
        await ExpoSecureStore.deleteItemAsync(key);
      }
    },
    [key]
  );

  useEffect(() => {
    (async function loadInitialValue() {
      if (!initialized) {
        const cachedValue = await ExpoSecureStore.getItemAsync(key);
        const parsedValue = cachedValue ? JSON.parse(cachedValue) : cachedValue;

        setItem(parsedValue || initialValue);
        setInitialized(true);
      }
    });
  }, [initialized, initialValue, key]);

  return [item, updateItem];
};

export default useSecureStoreItem;
