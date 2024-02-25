import React from 'react';
import { View, Button, Alert } from 'react-native';
import { LocalizationContext } from './LocalizationContext';
import RNPickerSelect from 'react-native-picker-select';

const LanguagePicker = () => {
    const { setLocale } = React.useContext(LocalizationContext);

    const handleChangeLanguage = (value) => {
        setLocale(value);
        Alert.alert('Language Changed', 'Please restart the app to apply changes.');
    };

    return (
        <View>
            <RNPickerSelect
                onValueChange={handleChangeLanguage}
                items={[
                    { label: 'English', value: 'en' },
                    { label: 'Spanish', value: 'es' }
                ]}
            />
        </View>
    );
};

export default LanguagePicker;
