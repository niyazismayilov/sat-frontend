import produce, { Draft } from 'immer';
import { Reducer } from 'react';
export const MANAGER_SIDEBAR_COLLAPSED = '@layout/collapsed';

// #region State
export type LayoutState = {
    managerSidebarCollapsed: boolean;
};

export const INITIAL_LAYOUT_STATE: LayoutState = {
    managerSidebarCollapsed: false,
};
// #endregion

const collapseSidebar = (draft: Draft<LayoutState>, action: SetSidebarCollapsedAction) => {
    if (action.collapsed) {
        localStorage.setItem(MANAGER_SIDEBAR_COLLAPSED, 'true');
    } else {
        localStorage.setItem(MANAGER_SIDEBAR_COLLAPSED, 'false');
    }
    draft.managerSidebarCollapsed = action.collapsed;
};
const sidebarLoaded = (draft: Draft<LayoutState>) => {
    const collapsed = localStorage.getItem(MANAGER_SIDEBAR_COLLAPSED);
    if (collapsed === 'true') {
        draft.managerSidebarCollapsed = true;
    } else {
        draft.managerSidebarCollapsed = false;
    }
};

// #region Sync Actions
type SetSidebarCollapsedAction = { type: 'SET_MANAGER_SIDEBAR_COLLAPSED'; collapsed: boolean };
type SidebarLoadedAction = { type: 'SIDEBAR_LOADED' };

export type LayoutAction = SetSidebarCollapsedAction | SidebarLoadedAction;

export const reducer: Reducer<LayoutState, LayoutAction> = produce(
    (draft: Draft<LayoutState>, action: LayoutAction): void => {
        switch (action.type) {
            case 'SIDEBAR_LOADED':
                sidebarLoaded(draft);
                break;
            case 'SET_MANAGER_SIDEBAR_COLLAPSED':
                collapseSidebar(draft, action);
                break;
            default:
                break;
        }
    },
);
// #endregion
