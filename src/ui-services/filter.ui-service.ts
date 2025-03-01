import { getSearchParams } from 'utils/browser-utils';

export const extractFilterFromQS = (): any => {
    const { page, pageSize, ...searchParams } = getSearchParams();
    const filter: any = searchParams as any;

    return filter;
};
