import { utcNow, fromISODate } from './dateTimeHelper';

export const clearStorage = () => localStorage.clear();
export const setItem = (key, data) => localStorage.setItem(key, data);
export const getItem = (key) => localStorage.getItem(key);
const removeItem = (key) => localStorage.removeItem(key);

export const LANGUAGE_KEY = 'i18nextLng';

export const setCache = ({ key, data, expiresAt, timeAmount, timeUnit }) => {
    const expires = (expiresAt && fromISODate(expiresAt).toUTC()) || utcNow().plus({ [timeUnit]: timeAmount });
    const cacheEntry = JSON.stringify({ data, expiresAt: expires.toISO() });
    setItem(key, cacheEntry);
};

export const getFromCache = (key) => {
    const cacheEntry = JSON.parse(getItem(key));
    if (!cacheEntry) {
        return null;
    }

    const isStale = fromISODate(cacheEntry.expiresAt).toUTC() <= utcNow();
    if (!isStale) {
        return cacheEntry.data;
    }

    removeItem(key);
    return null;
};

export const setLangugage = (language) => {
    setItem(LANGUAGE_KEY, language);
};

export const getLangugage = () => {
    return getItem(LANGUAGE_KEY);
};
