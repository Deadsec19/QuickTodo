import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const InstructionScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/instruction.png')} style={styles.image} />
            <Text>Instructions...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default InstructionScreen;
