import React from 'react'
import SplashScreen from './Components/Screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import SignupScreen from './Components/Screens/SignupScreen';
import SignupCtScreen from './Components/Screens/SignupCtScreen';
import LoginScreen from './Components/Screens/LoginScreen';
import BottonTab from './BottonTab';
import ChiTietSanPham from './Components/Screens/ChiTietSanPham';
import ThongTinCaNhan from './Components/Screens/ThongTinCaNhan';
import ThongTinDienThoai from './Components/Screens/ThongTinDienThoai';
import Logout from './Components/Screens/Logout';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='BottonTab' component={BottonTab} options={{headerShown: false}}/>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={SplashScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupScreen} />
        <Stack.Screen name="Details" component={SignupCtScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="User" component={LoginScreen} />
        <Stack.Screen name='ChiTietSanPham' component={ChiTietSanPham} options={{headerShown: false}}/>
        <Stack.Screen name='ThongTinCaNhan' component={ThongTinCaNhan} options={{headerShown: false}}/>
        <Stack.Screen name='ThongTinDienThoai' component={ThongTinDienThoai} options={{headerShown: false}}/>
        <Stack.Screen name='Logout' component={Logout} options={{headerShown: false}}/>


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

