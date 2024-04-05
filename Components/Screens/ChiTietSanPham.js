import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../CustomComponents/CustomButton';
import { API_ENDPOINT_DV } from '../../assets/LinkData/UrlData';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const addToRecentlyViewed = async (item) => {
  try {
    let viewedItems = await AsyncStorage.getItem('recentlyViewedItems');
    if (!viewedItems) {
      viewedItems = [];
    } else {
      viewedItems = JSON.parse(viewedItems);
    }
    // Thêm sản phẩm vào danh sách đã xem, giới hạn chỉ lưu tối đa 10 sản phẩm
    viewedItems = [item, ...viewedItems.filter(existingItem => existingItem.id !== item.id)].slice(0, 10);
    await AsyncStorage.setItem('recentlyViewedItems', JSON.stringify(viewedItems));
    console.log('Saved recently viewed items');
  } catch (error) {
    console.error('Error saving recently viewed items: ', error);
  }
};

const ChiTietSanPham = ({ route }) => {
  const { item } = route.params;
  // Tạo trạng thái cho trái tim
  const [isLiked, setIsLiked] = useState(item.yeuthich);

  useEffect(() => {
    setIsLiked(item.yeuthich); // Cập nhật isLiked dựa trên item.yeuthich
    addToRecentlyViewed(item);
  }, [item.yeuthich]); // Theo dõi sự thay đổi trong item.yeuthich

  // Hàm chuyển đổi trạng thái của trái tim
  const toggleLike = async () => {
    setIsLiked(prevIsLiked => !prevIsLiked); // Cập nhật địa phương trước khi gửi yêu cầu lên máy chủ

    try {
      // Gửi yêu cầu cập nhật trạng thái "yêu thích" của sản phẩm lên máy chủ
      const response = await fetch(API_ENDPOINT_DV+'/'+item.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          yeuthich: !isLiked, // Sử dụng !isLiked thay vì isLiked để tránh trạng thái lỗi
          image: item.image,
          name: item.name,
          doHot: item.doHot,
          imfor: item.imfor,
          price: item.price,
          arrDichVu: item.arrDichVu,
          loai: item.loai,
        }),
      });
      if (response.ok) {
        console.log(!isLiked);
        console.log('Updated like status successfully');
        // Nếu cập nhật thành công trên máy chủ, không cần cập nhật lại trạng thái địa phương
      } else {
        console.error('Failed to update like status');
        console.log(!isLiked);
      }
    } catch (error) {
      console.error('Error updating like status: ', error);
    }
  };

  // Hình ảnh trái tim tùy thuộc vào trạng thái
  const heartIcon = isLiked ? require('../image/iconTim.png') : require('../image/heart.png');

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };





  return (
    <ScrollView>
      <View style={st.container}>
        <Image
          source={{uri:item.image}}
          style={st.ImageSlide}
        />
        {/* IconBack va trai tim */}
        <View style={st.boxIcon}>
          <Pressable style={st.Icon} onPress={goBack}>
            <Image source={require('../image/iconBack.png')} style={st.Icon} />
          </Pressable>
          <Pressable onPress={toggleLike}> 
            <Image source={heartIcon} style={st.Icon} /> 
          </Pressable>
        </View>

        {/* View Text */}
        <View style={st.nameContainer}>
          <Text style={st.name}>{item.name}</Text>
          <Text style={st.doHot}>{item.doHot}</Text>
        </View>

        <View style={st.imforContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
            }}>
            {item.imfor}
          </Text>
        </View>

        {/* Hien thi commen */}

        <View style={st.containerService}>
        <Text style={st.titleService}>Dịch vụ:</Text>
          {item.arrDichVu.map((dichvu, index) => (
            <View key={index}  style={{flexDirection: 'row', padding: 5,alignItems:'center'}}>
              <Image
                source={require('../image/iconAvatar.png')}
                style={{width: 30, height: 30,marginRight:10}}></Image>
              <Text>{dichvu}</Text>
            </View>
          ))}
        </View>
        <TextInput
          style={{
            backgroundColor: 'white',
            marginHorizontal: 10,
            borderRadius: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: 'black',
          }}
          placeholder="Nhập comment"
        />
        {/* tien va them gio hang */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 150,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '600',
              }}>
              Price
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                }}>
                {item.price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
            </View>
          </View>

          <CustomButton
            title={'Add To Card'}
            width={195}
            height={50}></CustomButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default ChiTietSanPham;

const st = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f5e6cf',
    position: 'relative',
  },
  ImageSlide: {
    width: '100%',
    height: 300,
  },
  boxIcon: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  Icon: {
    width: 30,
    height: 30,
  },
  nameContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    top: 210,
    width: '100%',
    height: 90,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 20,
  },
  name: {
    color: '#ff9900',
    fontSize: 20,
    fontWeight: '600',
  },
  doHot: {
    color: '#ff9900',
    marginTop: 5,
  },
  imforContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 15,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  titleService: {
    fontSize: 18,
    fontFamily: 'italic',
    padding: 10,
  },
  containerService: {
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation:6
  },
});
