import { StyleSheet, Text, View ,Pressable, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ThongTinDienThoai = () => {

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
      }}>Phone Information</Text>
      </View>
    </View>
    {/* Thong tin dien thoai */}

<View style={{
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
  marginHorizontal: 10
}}>
      <View style={{
        width: 140,
        height: 120,
        backgroundColor: '#dedddd',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Text style={{
        color: 'black',
        fontSize: 16,
        fontWeight: '700'
      }}>Tên thiết bị</Text>
      <Text style={{
        color: 'black',
        fontSize: 14
      }}>OPPO A53</Text>
      </View>

      <View style={{
        width: 140,
        height: 120,
        backgroundColor: '#dedddd',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
      }}>
        <Text style={{
        color: 'black',
        fontSize: 16,
        fontWeight: '700'
      }}>Bộ nhớ</Text>
        <Text style={{
        color: 'black',
        fontSize: 14
      }}>Đã sử dụng 54,7GB/128GB</Text>
      </View>
      </View>

      <View style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#dedddd',
        borderRadius: 10
      }}>
        <Text style={{
          fontWeight: '900',
          color: 'black'
        }}>RAM</Text>
        <Text style={{
          color: 'black'
        }}>8GB</Text>
      </View>

      <View style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#dedddd',
        borderRadius: 10
      }}>
        <Text style={{
          fontWeight: '900',
          color: 'black'
        }}>Kiểu máy</Text>
        <Text style={{
          color: 'black'
        }}>CPH2127</Text>
      </View>

      <View style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#dedddd',
        borderRadius: 10
      }}>
        <Text style={{
          fontWeight: '900',
          color: 'black'
        }}>Phiên bản ColorOS</Text>
        <Text style={{
          color: 'black'
        }}>V12.1</Text>
      </View>
      
    
    </View>
  )
}

export default ThongTinDienThoai

const st = StyleSheet.create({
    container: {
        height: '100%',
    backgroundColor: '#f5e6cf',
    padding: 10
    },
})