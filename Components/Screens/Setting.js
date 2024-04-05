import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Setting = () => {
  const navigation = useNavigation();

  const goThongTinCaNhan = () => {
    navigation.navigate('ThongTinCaNhan');
  }

  const goThongTinDienThoai = () => {
    navigation.navigate('ThongTinDienThoai');
  }

  const goLogout = () => {
    navigation.navigate('Logout');
  }
  return (
    <View style={st.container}>
      <View style={{
        alignItems: 'center',
        marginVertical: 10
      }}>
        <Text style={{
        fontSize: 24,
        fontWeight: '700',
        color: '#ff9900',
      }}>Setting</Text>
      </View>
{/* nut thong tin ca nhan */}
      <Pressable onPress={goThongTinCaNhan} style={{
        backgroundColor: '#ebeaea',
        padding: 15, 
        borderRadius: 10,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <Image source={require('../image/iconThongTin.png')} style={{
          width: 30,
          height: 30
        }}/>
        <Text style={{
          marginStart: 15,
          color: '#fc9a07',
          fontSize: 16,
          fontWeight: '600'
        }}>Personal Information</Text>
        </View>

        <Image source={require('../image/iconNext.png')} style={{
          width: 30,
          height: 30
        }}/>
        
      </Pressable>

      {/* nut Thong tin dien thoai */}
      <Pressable onPress={goThongTinDienThoai} style={{
        backgroundColor: '#ebeaea',
        padding: 15, 
        borderRadius: 10,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <Image source={require('../image/iconPhone.png')} style={{
          width: 30,
          height: 30
        }}/>
        <Text style={{
          marginStart: 15,
          color: '#fc9a07',
          fontSize: 16,
          fontWeight: '600'
        }}>Phone Information</Text>
        </View>

        <Image source={require('../image/iconNext.png')} style={{
          width: 30,
          height: 30
        }}/>
        
      </Pressable>

      {/* Nut thiet lap rieng */}
      <Pressable onPress={goLogout} style={{
        backgroundColor: '#ebeaea',
        padding: 15, 
        borderRadius: 10,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <Image source={require('../image/iconSetting.png')} style={{
          width: 30,
          height: 30
        }}/>
        <Text style={{
          marginStart: 15,
          color: '#fc9a07',
          fontSize: 16,
          fontWeight: '600'
        }}>
        Separate Settings</Text>
        </View>

        <Image source={require('../image/iconNext.png')} style={{
          width: 30,
          height: 30
        }}/>
        
      </Pressable>
    </View>
  )
}

export default Setting

const st = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f5e6cf',
    padding: 10
  }
})