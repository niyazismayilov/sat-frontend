export const isEmpty = (value: any): boolean => {
    return value === null || value === 'null' || value === undefined || value === '' || value === 'undefined';
};

export const isEmptyObject = (object: any): boolean =>
    object && Object.values(object).every((x) => x === null || x === '');
