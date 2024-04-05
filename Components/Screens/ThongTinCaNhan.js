import { BackHandler, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ThongTinCaNhan = () => {
    const navigation = useNavigation();

    const back = () => {
        navigation.navigate('Setting');
    }
  return (
    <View style={st.container}> 
    {/* header */}
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
      }}>Personal Information</Text>
      </View>
    </View>

    {/* view thong tin */}
    <View style={{
        backgroundColor: '#ebeaea',
        marginHorizontal: 20,
        padding: 10,
        alignItems: 'center',
        height: 350,
        justifyContent:'center',
        marginTop: 110
    }}>
        {/* avatar */}
      
      <Image source={require('../image/iconAvatar.png')} style={{
        width: 100,
        height: 100
      }}/>
      
      {/* Thong tin */}
      <Text style={st.textSt}>Họ và tên: Nguyễn Trí Toán</Text>
      <Text style={st.textSt}>Lớp: MD18305</Text>
      <Text style={st.textSt}>Mã sinh viên: PH32395</Text>
    </View>
      
      
    </View>
  )
}

export default ThongTinCaNhan

const st = StyleSheet.create({
    container: {
        height: '100%',
    backgroundColor: '#f5e6cf',
    padding: 10
    },
    textSt : {
        color: 'black',
        fontSize: 18,
        fontWeight: '500',
        marginTop: 20
    }
})