import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {API_ENDPOINT_DV} from '../../assets/LinkData/UrlData';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
const Favorite = () => {
  const [data, setdata] = useState([]);
  // Tạo trạng thái cho trái tim
  useEffect(() => {
    fetchData();
  }, []);
  // Sử dụng useFocusEffect để cập nhật dữ liệu mỗi khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );
  // Hàm lấy dữ liệu từ máy chủ
  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINT_DV);
      const json = await response.json();
      setdata(json);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  // Hàm lọc dữ liệu
  const filterData = () => {
    return data.filter(item => item.yeuthich === true);
  };
  // Hàm hiển thị mỗi sản phẩm
  const Item = ({item}) => {
    const [isLiked, setIsLiked] = useState(item.yeuthich);
    const navigation = useNavigation();
    
  // Cập nhật trạng thái trái tim khi item.yeuthich thay đổi
    useEffect(() => {
      setIsLiked(item.yeuthich);
    }, [item.yeuthich]); // Theo dõi sự thay đổi trong item.yeuthich
    // Hàm chuyển đổi trạng thái của trái tim
    const toggleLike = async () => {
      setIsLiked(prevIsLiked => !prevIsLiked); // Cập nhật địa phương trước khi gửi yêu cầu lên máy chủ

      try {
        // Gửi yêu cầu cập nhật trạng thái "yêu thích" của sản phẩm lên máy chủ
        const response = await fetch(API_ENDPOINT_DV + '/' + item.id, {
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
          fetchData()
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
    const heartIcon = isLiked
    ? require('../image/iconTim.png')
    : require('../image/heart.png');


    const goToChiTietSP = () => {
      navigation.navigate('ChiTietSanPham', {item});
    };
    return (
    <TouchableOpacity onPress={goToChiTietSP}
      style={{
          backgroundColor: '#ebeaea',
          margin: 10,
          padding: 15,
          borderRadius: 15,
          position: 'relative',
        }}>
      
        {/* Ảnh */}

        <Image
          source={{uri: item.image}}
          style={{
            width: 290,
            height: 290,
            borderRadius: 15,
          }}
        />
        <Pressable
          onPress={toggleLike}
          style={{
            position: 'absolute',
            marginTop: 20,
            right: 24,
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={heartIcon}
          />
        </Pressable>

        {/* Ten san pham va gia */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#fc9a07',
              fontWeight: '700',
            }}>
            {item.name}
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: 'black',
            }}>
            {item.price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </Text>
        </View>
        {/* Noi dung san pham */}
        <Text
          style={{
            color: 'black',
            marginTop: 10,
          }}>
          {item.imfor}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={st.container}>
      <View
        style={{
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: '#ff9900',
          }}>
          Favorite Prodect
        </Text>
      </View>

      <FlatList
        data={filterData()}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Favorite;

const st = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f5e6cf',
    paddingHorizontal: 10,
  },
});
