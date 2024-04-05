import { Button, StyleSheet, Text, View,Image, ImageBackground,Alert } from 'react-native'
import React, { useState } from 'react'
import TextInputD from '../CustomComponents/TextInputD'
import CustomButton from '../CustomComponents/CustomButton';

const SignupScreen = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [repeatpassword, setrepeatpassword] = useState('');
  const signupData = () => {
    if (!email || !password || !repeatpassword ) {
      // Hiển thị cảnh báo nếu có trường nào đó chưa được điền
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
  }

  // Kiểm tra tính hợp lệ của email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
  }

  // Kiểm tra tính hợp lệ của mật khẩu
  if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long');
      return;
  }

  // Kiểm tra mật khẩu và mật khẩu lặp lại có khớp nhau không
  if (password !== repeatpassword) {
      Alert.alert('Passwords Do Not Match', 'Please make sure passwords match');
      return;
  }

    navigation.navigate('Details', {
      email: email,
      password: password,
      repeatpassword: repeatpassword
    })
  }


  return (
    <View style={styles.container}>
   
      <Text style={styles.text}>Signup</Text>
      <Text style={styles.title}>Email</Text>
      <TextInputD
        placeholder="Email"
        value={email}
        onChangeText={setemail}
      />
      <Text style={styles.title}>Password</Text>
      <TextInputD
        placeholder="Password"
        value={password}
        onChangeText={setpassword}
      />
      <Text style={styles.title}>Repeatpassword</Text>
      <TextInputD
        placeholder="Repeat Password"
        value={repeatpassword}
        onChangeText={setrepeatpassword}
      />
      <View style={{ height: 30 }} />

      <CustomButton
        onPress={() => signupData()}
        title={"Continue"} width={330} height={50} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{fontSize: 16, fontFamily: 'italic',}}>Already have an account?</Text>
        <Text onPress={() => navigation.navigate('Login')} style={{fontSize: 16, fontFamily: 'italic', color: '#EE4266', marginLeft: 5}}>Login</Text>
        </View>
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    alignSelf:'flex-start',
    marginLeft: 22,
    fontFamily: 'italic',
    fontSize: 16,
  },
  



})