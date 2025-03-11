import logo from 'assets/logo1.png';

declare global {
    interface Window {
        _env_: any;
    }
}

export const socialShareLink = {
    instagram: (url: string): string => `https://www.instagram.com/sharer.php?=${encodeURIComponent(url)}`,
    facebook: (url: string): string => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: (url: string): string => `http://twitter.com/share?url=${encodeURIComponent(url)}`,
    linkedin: (url: string): string => `https://www.linkedin.com/sharing/share-offsite?url=${encodeURIComponent(url)}`,
    telegram: (url: string): string => `https://t.me/share/url?url=${encodeURIComponent(url)}`,
    whatsappWeb: (url: string): string => `https://web.whatsapp.com/send?text=${encodeURIComponent(url)}`,
    whatsappMobile: (url: string): string => `https://wa.me/?text=${encodeURIComponent(url)}`,
};

const env = {
    ...process.env,
    ...window._env_,
};

export const headerHeight = 113;
export const headerTopHeight = 44;

export const VERSION = env.REACT_APP_VERSION;
export const ENVIRONMENT = env.APP_ENV;
export const API_URL = env.REACT_APP_API_URL;
export const GOOGLE_CLIENT_ID = env.REACT_APP_GOOGLE_CLIENT_ID || '';
export const FB_APP_ID = env.REACT_APP_FB_ID;
export const imageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif'];

export const mobileSizes = ['xs', 'sm'];
export { logo };
