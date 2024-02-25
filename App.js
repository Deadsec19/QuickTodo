import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import { LocalizationProvider } from './LocalizationContext';
import LanguagePicker from './LanguagePicker';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <LocalizationProvider>
      <LanguagePicker />
      {/* Your existing app content here */}
    </LocalizationProvider>
  );
};



export default App;
