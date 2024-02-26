import React, { createContext, useContext, useState } from 'react';

const LocalizationContext = createContext();

export const LocalizationProvider = ({ children }) => {
    const [locale, setLocale] = useState('en');

    const t = (key) => {
        const translations = {
            en: {
                welcomeMessage: 'Welcome to Your Todo List!',
                startAddingTasksMessage: 'Start Adding Tasks Here!',
                getOrganizedMessage: "Let's Get Organized!",
                enterTaskMessage: 'Enter a new task',
                taskCompleted: 'completedTasksPlaceholder out of totalTasksPlaceholder tasks completed',
                title: 'Quick Todo'
            },
            hi: {
                welcomeMessage: 'आपके टूडू सूची में आपका स्वागत है!',
                startAddingTasksMessage: 'यहाँ कार्यों को जोड़ना शुरू करें!',
                getOrganizedMessage: 'चलो संगठित होते हैं!',
                enterTaskMessage: 'नया कार्य दर्ज करें',
                taskCompleted: 'completedTasksPlaceholder कार्यों में से totalTasksPlaceholder पूरे हुए',
                title: 'त्वरित टूडू'
            },
            ro: {
                welcomeMessage: 'Bine ai venit la Lista Ta de Activități!',
                startAddingTasksMessage: 'Începeți adăugarea de sarcini aici!',
                getOrganizedMessage: 'Hai să ne organizăm!',
                enterTaskMessage: 'Introduceți o nouă sarcină',
                taskCompleted: 'completedTasksPlaceholder din totalTasksPlaceholder sarcini completate',
                title: 'Listă de Activități Rapide'
            },
            gu: {
                welcomeMessage: 'તમારી ટોડો લિસ્ટમાં આપનું સ્વાગત છે!',
                startAddingTasksMessage: 'અહીં કાર્યો ઉમેરવાનું શરૂ કરો!',
                getOrganizedMessage: 'ચાલો સંગઠિત થાઓ!',
                enterTaskMessage: 'નવું કાર્ય દાખલ કરો',
                taskCompleted: 'completedTasksPlaceholder કાર્યોમાંથી totalTasksPlaceholder પૂર્ણ થયા',
                title: 'ત્વરિત ટોડો'
            },
            es: {
                welcomeMessage: '¡Bienvenido a tu lista de tareas!',
                startAddingTasksMessage: '¡Comienza a agregar tareas aquí!',
                getOrganizedMessage: '¡Organízate!',
                enterTaskMessage: 'Ingrese una nueva tarea',
                taskCompleted: 'completedTasksPlaceholder de totalTasksPlaceholder tareas completadas',
                title: 'Lista de Tareas Rápidas'
            },
        };

        return translations[locale][key] || key;
    };

    return (
        <LocalizationContext.Provider value={{ t, locale, setLocale }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = () => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error('useLocalization must be used within a LocalizationProvider');
    }
    return context;
};