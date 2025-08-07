const subscribers: Record<string, Set<(value: string | null) => void>> = {};

const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
    if (subscribers[key]) {
        subscribers[key].forEach((setter) => setter(value));
    }
}

const getItem = (key: string) => {
    return localStorage.getItem(key);
}

const subscribe = (keyToObserve: string, subscriberSetter: (value: string | null) => void) => {
    if (!subscribers[keyToObserve]) {
        subscribers[keyToObserve] = new Set();
    }
    subscribers[keyToObserve].add(subscriberSetter);

    subscriberSetter(getItem(keyToObserve));

    return () => { subscribers[keyToObserve].delete(subscriberSetter); };
}

export const customStorage = { setItem, subscribe };
