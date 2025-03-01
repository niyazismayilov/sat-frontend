import produce, { Draft } from 'immer';
import { DateTime } from 'luxon';
import { Reducer } from 'react';
import { extractFilterFromQS } from 'ui-services/filter.ui-service';
import { setSearchParams } from 'utils/browser-utils';

// #region State
export type VIDEO_FILTER = {
    filter: VideoFilterState;
};

export type VideoFilterState = Omit<any, 'status'> & {
    title: string;
    status: string;
    createdAt: DateTime | null;
};
export const INITIAL_VIDEO_FILTER_STATE: VIDEO_FILTER = {
    filter: {
        title: '',
        status: '',
        createdAt: null,
    },
};

const setFilter = (draft: Draft<VIDEO_FILTER>, action: any) => {
    draft.filter = action.filter;
    setSearchParams(action.filter);
};

const initFilter = (draft: Draft<VIDEO_FILTER>) => {
    const filter = extractFilterFromQS();
    draft.filter = filter;
};

// #region Sync Actions
type SetFilterAction = { type: 'SET_FILTER'; filter: VIDEO_FILTER };
type InitFilterAction = { type: 'INIT_FILTER' };

export type VideoAction = SetFilterAction | InitFilterAction;

export const reducer: Reducer<VIDEO_FILTER, VideoAction> = produce(
    (draft: Draft<VIDEO_FILTER>, action: VideoAction): void => {
        switch (action.type) {
            case 'SET_FILTER':
                setFilter(draft, action);
                break;

            case 'INIT_FILTER':
                initFilter(draft);
                break;
            default:
                break;
        }
    },
);
// #endregion
