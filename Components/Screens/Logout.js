import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Logout = () => {

    const navigation = useNavigation();

    const back = () => {
        navigation.navigate('Setting');
    }

    const logOut = () => {
        navigation.navigate('Login');
    }
  return (
    <View style={st.container}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
    }}>
        <Pressable onPress={back}>
        <Image source={require('../image/iconBack.png')} style={{
            width: 26,
            height: 26,
            marginEnd: 50
        }}/>
        </Pressable>
        
        <View style={{
        alignItems: 'center',
        marginVertical: 10
      }}>
        <Text style={{
        fontSize: 20,
        fontWeight: '700',
        color: '#ff9900',
      }}>Separate Settings</Text>
      </View>
    </View>

    {/* Thiet lap nut */}
    <Pressable style={{
        margin: 10,
        padding: 10,
        backgroundColor: '#ff9900',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    }}>
        <Text style={{
            color: 'white'
        }}>Doi theme</Text>
    </Pressable>
{/* logout */}
    <Pressable onPress={logOut} style={{
        margin: 10,
        padding: 10,
        backgroundColor: '#ff9900',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    }}>
        <Text style={{
            color: 'white'
        }}>Logout</Text>
    </Pressable>

    <Pressable style={{
        margin: 10,
        padding: 10,
        backgroundColor: '#ff9900',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    }}>
        <Text style={{
            color: 'white'
        }}>Doi Password</Text>
    </Pressable>
    </View>
  )
}

export default Logout

const st = StyleSheet.create({
    container: {
        height: '100%',
    backgroundColor: '#f5e6cf',
    padding: 10
    },
})