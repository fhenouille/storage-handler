// A dictionary that maps each key to a set of subscriber functions.
// Each subscriber function will be called when the corresponding key's value changes.
const subscribers: Record<string, Set<(value: string | null) => void>> = {};

const setItem = (key: string, value: string | null) => {
  if (value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, value);
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (subscribers[key]) {
    subscribers[key].forEach((setter) => {
      setter(value);
    });
  }
};

const getItem = (key: string) => {
  return localStorage.getItem(key);
};

// Subscribes a component to changes on a specific key.
// The subscriberSetter will be called whenever the value changes
const subscribe = (
  keyToObserve: string,
  subscriberSetter: (value: string | null) => void
) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!subscribers[keyToObserve]) {
    subscribers[keyToObserve] = new Set();
  }
  subscribers[keyToObserve].add(subscriberSetter);

  let lastItemValue = getItem(keyToObserve);
  subscriberSetter(lastItemValue);

  // Start polling every 500ms to detect external changes
  const intervalId = setInterval(() => {
    const currentItemValue = getItem(keyToObserve);
    if (currentItemValue !== lastItemValue) {
      lastItemValue = currentItemValue;
      subscriberSetter(currentItemValue);
    }
  }, 500);

  // Return an unsubscribe function to stop listening and clear the interval.
  return () => {
    subscribers[keyToObserve].delete(subscriberSetter);
    clearInterval(intervalId);
  };
};

export const customStorage = { setItem, subscribe };
