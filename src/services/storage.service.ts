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

    let lastItemValue = getItem(keyToObserve);
    subscriberSetter(lastItemValue);

    const intervalId = setInterval(() => {
        const currentItemValue = getItem(keyToObserve);
        if (currentItemValue !== lastItemValue) {
            lastItemValue = currentItemValue;
            subscriberSetter(currentItemValue);
        }
    }, 500);

    return () => {
        subscribers[keyToObserve].delete(subscriberSetter);
        clearInterval(intervalId);
    };
}

export const customStorage = { setItem, subscribe };
