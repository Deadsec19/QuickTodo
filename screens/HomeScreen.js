import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';
import { useLocalization } from './LocalizationContext'; // Assuming LocalizationContext.js is in the screens directory

import InstructionScreen from './InstructionScreen';


function HomeScreen() {
  const { t, locale, setLocale } = useLocalization();

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks([
      { id: 1, title: t('welcomeMessage'), completed: false },
      { id: 2, title: t('startAddingTasksMessage'), completed: false },
      { id: 3, title: t('getOrganizedMessage'), completed: false },
    ]);
  }, [t]);


  const [newTask, setNewTask] = useState('');
  const [addSound, setAddSound] = useState(new Audio.Sound());
  const [completeSound, setCompleteSound] = useState(new Audio.Sound());
  const [deleteSound, setDeleteSound] = useState(new Audio.Sound());
  const [uncheckSound, setUncheckSound] = useState(new Audio.Sound());
  const [buttonSound, setButtonSound] = useState(new Audio.Sound());

  const [allTasksCompleted, setAllTasksCompleted] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Failed to load tasks', error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks', error);
    }
  };

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  useEffect(() => {
    const loadButtonSound = async () => {
      await buttonSound.loadAsync(require('../assets/button_sound.mp3'));
    };

    loadButtonSound();

    return () => {
      buttonSound.unloadAsync();
    };
  }, []);


  useEffect(() => {
    const loadSounds = async () => {
      await addSound.loadAsync(require('../assets/task_added.mp3'));
      await completeSound.loadAsync(require('../assets/task_completed.mp3'));
      await deleteSound.loadAsync(require('../assets/task_deleted.mp3'));
      await uncheckSound.loadAsync(require('../assets/uncheck_sound.mp3'));
    };

    loadSounds();

    return () => {
      addSound.unloadAsync();
      completeSound.unloadAsync();
      deleteSound.unloadAsync();
      uncheckSound.unloadAsync();
    };
  }, []);


  const toggleLocale = () => {
    // Define an array of supported languages
    const supportedLanguages = ['en', 'es', 'hi', 'ro', 'gu']; // Add more languages as needed

    // Get the index of the current locale in the array
    const currentIndex = supportedLanguages.indexOf(locale);

    // Calculate the index of the next language in the array
    const nextIndex = (currentIndex + 1) % supportedLanguages.length;

    // Set the next language as the new locale
    const newLocale = supportedLanguages[nextIndex];
    setLocale(newLocale);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks);

  const renderTask = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <View style={styles.deleteAction}>
          <Icon name="trash-o" size={20} color="white" />
        </View>
      )}
      friction={1}
      onSwipeableRightOpen={() => deleteTask(item.id)}
    >
      <TouchableOpacity onPress={() => toggleCompletion(item.id)}>
        <View style={styles.task}>
          <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
            {item.title}
          </Text>
          <Checkbox
            status={item.completed ? 'checked' : 'unchecked'}
            onPress={() => toggleCompletion(item.id)}
            color="#CDFADB"
            uncheckedColor="black" />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  const addTask = () => {
    if (newTask.trim() === '') {
      alert('Please enter a task.');
      return;
    }

    setTasks([...tasks, { id: tasks.length + 1, title: newTask }]);
    setNewTask('');

    addSound.replayAsync();
  };

  const toggleCompletion = (taskId) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task
    ));

    const allCompleted = tasks.every(task => task.completed);
    setAllTasksCompleted(allCompleted);

    const isCompleted = tasks.find(task => task.id === taskId).completed;

    if (isCompleted) {
      uncheckSound.replayAsync();
    } else {
      completeSound.replayAsync();
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    deleteSound.replayAsync();
  };


  const App = () => {
    const [firstTime, setFirstTime] = useState(true);

    useEffect(() => {
      const checkFirstTime = async () => {
        try {
          const value = await AsyncStorage.getItem('firstTime');
          if (value !== null && value === 'false') {
            setFirstTime(false);
          }
        } catch (error) {
          console.error('Error checking first time', error);
        }
      };

      checkFirstTime();
    }, []);

    useEffect(() => {
      const saveFirstTime = async () => {
        try {
          await AsyncStorage.setItem('firstTime', 'false');
        } catch (error) {
          console.error('Error saving first time', error);
        }
      };

      if (firstTime === true) {
        saveFirstTime();
      }
    }, [firstTime]);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {firstTime ? <InstructionScreen /> : <Text>Welcome back!</Text>}
      </View>
    );
  };


  return (
    <View style={styles.container}>


      <TouchableOpacity onPress={async () => {
        await buttonSound.replayAsync();
        toggleLocale();
      }} style={styles.languageButton}>
        <Icon name="language" size={24} color="black" />
      </TouchableOpacity>



      <Text style={styles.title}>{t('title')}</Text>

      <Text style={styles.completedTasksText}>
        {t('taskCompleted')
          .replace('completedTasksPlaceholder', completedTasks)
          .replace('totalTasksPlaceholder', totalTasks)}
      </Text>


      <View style={styles.progressBar}>
        <View style={{ width: `${progress * 100}%`, backgroundColor: '#CDFAD5', height: 10 }} />
      </View>

      <FlatList
        style={styles.flatList}
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTask} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder={t('enterTaskMessage')}
          selectionColor="grey" />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Icon name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'flex-start',
    backgroundColor: '#F6FDC3',
  },

  languageButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1,
    marginTop: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#ccc',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    overflow: 'hidden',
  },
  completedTasksText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFCF96',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 7,
    paddingLeft: 10,
    marginBottom: 12,
    width: '100%'
  },
  deleteAction: {
    backgroundColor: '#FF8080',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 15,
    width: '100%',
    height: '81%',
    borderRadius: 5,
    marginLeft: 'auto'
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5
  },
  input: {
    flex: 1,
    padding: 7,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default HomeScreen;
