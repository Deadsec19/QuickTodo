import React from 'react';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import es from './locales/es.json';

const translations = { en, es };

const LocalizationContext = React.createContext();

export const LocalizationProvider = ({ children }) => {
    const [locale, setLocale] = React.useState(Localization.locale);

    const t = (key) => translations[locale][key] || key;

    return (
        <LocalizationContext.Provider value={{ t, locale, setLocale }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export { LocalizationContext };
