import i18next from './i18n';

interface Config {
    loadPath: string;
    crossDomain: boolean;
}

export const load = async (config: Config) => {
    const { loadPath, crossDomain } = config;
    await i18next.init({
        fallbackLng: 'en',
        load: 'languageOnly', // en vs en-US
        // React already does escaping
        interpolation: {
            escapeValue: false,
        },
        debug: false,
        backend: {
            loadPath,
            crossDomain,
        },
    });
    return i18next;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const t = (key: string, options?: any) => i18next.t(key, options) as string;
