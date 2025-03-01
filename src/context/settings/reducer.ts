import produce, { Draft } from 'immer';
import { Reducer } from 'react';
import { isEmpty } from 'utils/validationHelper';
export const LANGUAGE_KEY = '@settings/language';
export const THEME_TYPE_KEY = '@settings/themeType';

export enum PaletteType {
    DARK = 'dark',
    LIGHT = 'light',
}

export enum Language {
    AZ = 'az',
    EN = 'en',
    RU = 'ru',
}

export const languages: Language[] = [Language.AZ, Language.EN, Language.RU];
export const themeTypes: PaletteType[] = [PaletteType.LIGHT, PaletteType.DARK];

// #region State
export type SettingsState = {
    themeType: PaletteType;
    language: Language;
    isDarkMode: boolean;
};

export const INITIAL_SETTINGS_STATE: SettingsState = {
    themeType: PaletteType.LIGHT,
    language: Language.AZ,
    isDarkMode: false,
};
// #endregion

// #region Sync Actions
type SettingsLoadedAction = { type: 'SETTINGS_LOADED' };
type ThemeTypeToggledAction = { type: 'THEME_TYPE_TOGGLED' };
type LanguageChangedAction = { type: 'LANGUAGE_CHANGED'; language: Language };

export type SettingsAction = SettingsLoadedAction | ThemeTypeToggledAction | LanguageChangedAction;

const settingsLoaded = (draft: Draft<SettingsState>) => {
    const language = localStorage.getItem(LANGUAGE_KEY);
    if (language && !isEmpty(language) && languages.includes(language as Language)) {
        draft.language = language as Language;
    } else {
        localStorage.setItem(LANGUAGE_KEY, draft.language);
    }

    const themeType = localStorage.getItem(THEME_TYPE_KEY);
    if (themeType && !isEmpty(themeType) && themeTypes.includes(themeType as PaletteType)) {
        draft.themeType = themeType as PaletteType;
        draft.isDarkMode = themeType === 'dark';
    } else {
        localStorage.setItem(THEME_TYPE_KEY, draft.themeType);
    }
};

const toggleThemeType = (draft: Draft<SettingsState>) => {
    if (draft.themeType === PaletteType.LIGHT) {
        draft.themeType = PaletteType.DARK;
        draft.isDarkMode = true;
        localStorage.setItem(THEME_TYPE_KEY, PaletteType.DARK);
    } else {
        draft.themeType = PaletteType.LIGHT;
        draft.isDarkMode = false;
        localStorage.setItem(THEME_TYPE_KEY, PaletteType.LIGHT);
    }
};

const changeLanguage = (draft: Draft<SettingsState>, action: LanguageChangedAction) => {
    draft.language = action.language;
    localStorage.setItem(LANGUAGE_KEY, action.language);
};

export const reducer: Reducer<SettingsState, SettingsAction> = produce(
    (draft: Draft<SettingsState>, action: SettingsAction): void => {
        switch (action.type) {
            case 'SETTINGS_LOADED':
                settingsLoaded(draft);
                break;
            case 'THEME_TYPE_TOGGLED':
                toggleThemeType(draft);
                break;
            case 'LANGUAGE_CHANGED':
                changeLanguage(draft, action);
                break;
            default:
                break;
        }
    },
);
