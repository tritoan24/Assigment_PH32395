import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Components/Screens/Home';
import Favorite from './Components/Screens/Favorite';
import Setting from './Components/Screens/Setting';

const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconImage;

          if (route.name === 'Home') {
            iconImage = require('./Components/image/home.png');
          } else if (route.name === 'Favorite') {
            iconImage = require('./Components/image/heart.png');
          } else if (route.name === 'Setting') {
            iconImage = require('./Components/image/setting.png');
          }

          return <Image source={iconImage} style={{ width: size, height: size }} />;
        },
      })}
    >
      <Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
      <Tab.Screen name='Favorite' component={Favorite} options={{ headerShown: false }} />
      <Tab.Screen name='Setting' component={Setting} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
