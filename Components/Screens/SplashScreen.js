import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Signup');
        }, 3000);
        return () => {
            clearTimeout(timer);
        }
    }, [])
    return (
        <View style={styles.container}>
        
            <LottieView
                source={require('../assets/loading.json')}
                style={styles.animation}
                autoPlay
                loop
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',

    },
    animation: {
        width: 200,
        height: 260,

    },
});

export default SplashScreen;
