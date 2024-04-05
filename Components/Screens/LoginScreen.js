import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import TextInputD from '../CustomComponents/TextInputD';
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../CustomComponents/CustomButton';
import { API_ENDPOINT_Account } from '../../assets/LinkData/UrlData';


const LoginScreen = ({route}) => {
  const { getemail = '', getpassword = '' } = route.params || {};
  const [email, setemail] = useState(getemail);
  const [password, setpassword] = useState(getpassword);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const checkLogin = async () => {
    if (email === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(API_ENDPOINT_Account);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Kiểm tra xem email có tồn tại trong dữ liệu không
      const user = data.find(user => user.email === email);
      if (!user) {
        alert('Email not found');
        return;
      }
      // So sánh mật khẩu
      if (user.password === password) {
        navigation.navigate('BottonTab');
      } else {
        alert('Incorrect password');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred. Please try again later.');
    }
  }


  return (
    <View style={styles.container}>

      <Text style={styles.text}>Login</Text>
      <Text style={styles.title}>Email</Text>
      <TextInputD
        placeholder="Email"
        value={email}
        onChangeText={setemail}
      />
      <Text style={styles.title}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setpassword}
          secureTextEntry={!showPassword} // Ẩn hiện mật khẩu
        >

        </TextInput>
        <TouchableOpacity onPress={toggleShowPassword} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>

      </View>


      <View style={{ height: 30 }} />

      <CustomButton
        onPress={() => checkLogin()}
        title={"Login"} width={330} height={50} />

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 16, fontFamily: 'italic', }}>Already have an account?</Text>
        <Text onPress={() => navigation.navigate('Login')} style={{ fontSize: 16, fontFamily: 'italic', color: '#EE4266', marginLeft: 5 }}>Signup</Text>
      </View>
    </View>
  )
}


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
    alignSelf: 'flex-start',
    marginLeft: 22,
    fontFamily: 'italic',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginBottom: 17,
    elevation: 5,
    width: 330,
  },
  passwordInput: {
    flex: 1,
    height: 40,
  },
  toggleButton: {
    padding: 8,
  },
  toggleButtonText: {
    color: 'blue',
  },
});



export default LoginScreen
