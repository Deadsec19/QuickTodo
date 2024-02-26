import React from 'react';
import { Button, View } from 'react-native';
import i18n from 'i18n-js';
import { useLocalization } from './LocalizationContext';

const LanguagePicker = () => {
    const { setLocale } = useLocalization();

    const changeLanguage = (language) => {
        i18n.locale = language;
        setLocale(language);
    };

    return (
        <View>
            <Button title="English" onPress={() => changeLanguage('en')} />
            <Button title="Hindi" onPress={() => changeLanguage('hi')} />
            <Button title="Romanian" onPress={() => changeLanguage('ro')} />
            <Button title="Gujarati" onPress={() => changeLanguage('gu')} />
            <Button title="Spanish" onPress={() => changeLanguage('es')} />
            {/* Add buttons for other languages */}
        </View>
    );
};

export default LanguagePicker;
