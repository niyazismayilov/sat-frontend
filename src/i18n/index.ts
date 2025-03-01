import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { namespaces } from './config';
import Backend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend'; // primary use cache
import HttpApi from 'i18next-http-backend'; // fallback http load
import { VERSION } from 'config';
import { LANGUAGE_KEY } from 'context/settings/reducer';

// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        ns: namespaces,
        defaultNS: 'common',
        fallbackLng: 'az',
        debug: false,
        load: 'languageOnly',
        lng: localStorage.getItem(LANGUAGE_KEY) || 'az',
        backend: {
            backends: [
                LocalStorageBackend, // primary
                HttpApi, // fallback
            ],
            backendOptions: [
                {
                    prefix: 'i18next_res_',
                    expirationTime: 5 * 60 * 1000,
                },
                {
                    loadPath: `/lang/{{lng}}/{{ns}}.json`,
                    queryStringParams: {
                        hash: VERSION,
                    },
                },
            ],
        },
        react: {
            // Turn off the use of React Suspense
            useSuspense: false,
        },
    });

export default i18n;
