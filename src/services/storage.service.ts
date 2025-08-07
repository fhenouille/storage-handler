const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

export const customStorage = { setItem };