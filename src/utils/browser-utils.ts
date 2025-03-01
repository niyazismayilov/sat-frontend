import { createBrowserHistory } from 'history';
import { parse, ParsedQuery } from 'query-string';
import { isEmpty } from './validationHelper';

const history = createBrowserHistory();

history.listen(() => {
    window.scrollTo({ top: 0, left: 0 });
});

export const getValidUrl = (url: string): string => {
    const decodedUrl = window.decodeURIComponent(url);
    const normalizedUrl = decodedUrl.trim().replace(/\s/g, '');

    if (/^(:\/\/)/.test(normalizedUrl)) {
        return `http${normalizedUrl}`;
    }
    if (!/^(f|ht)tps?:\/\//i.test(normalizedUrl)) {
        return `http://${normalizedUrl}`;
    }

    return normalizedUrl;
};
export const getSearchParams = (): ParsedQuery<string | number | boolean> => {
    return parse(history.location.search, { parseNumbers: true, parseBooleans: true });
};

export const setSearchParams = (params: { [key: string]: unknown }): void => {
    const search = new URLSearchParams(history.location.search);
    Object.entries(params).forEach(([key, value]) => {
        if (!isEmpty(value)) {
            search.set(key, String(value).trim());
        } else {
            search.delete(key);
        }
    });
    search.sort();
    history.replace(`${history.location.pathname}?${search}`);
};

export const extractPageFromQueryString = (): number | undefined => {
    const { page } = getSearchParams();

    if (isEmpty(page)) {
        return undefined;
    }

    return Number(page);
};

export const extractPageSizeFromQueryString = (): number | undefined => {
    const { pageSize } = getSearchParams();

    if (isEmpty(pageSize)) {
        return 20;
    }

    return Number(pageSize);
};

export default history;
