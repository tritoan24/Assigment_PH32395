import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { API_ENDPOINT_DV } from '../../assets/LinkData/UrlData';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const [data1, setdata] = useState([]);
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);
  useEffect(() => {
    fetchData();
    fetchRecentlyViewedItems();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    fetchRecentlyViewedItems();

    }, [])
  );

  //ham lay du lieu da xem gan day
  const fetchRecentlyViewedItems = async () => {
    try {
      const viewedItems = await AsyncStorage.getItem('recentlyViewedItems');
      if (viewedItems !== null) {
        setRecentlyViewedItems(JSON.parse(viewedItems));
      }
    } catch (error) {
      console.error('Error retrieving recently viewed items: ', error);
    }
  };


  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINT_DV);
      const json = await response.json();
      setdata(json);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const filterData = (data, type) => {
    return data.filter(item => item.loai === type);
  };

  // Sử dụng hàm filterData để lọc ra các phần tử có thuộc tính loai bằng 1
  const filteredDataLoai1 = filterData(data1, 1);

  // Sử dụng hàm filterData để lọc ra các phần tử có thuộc tính loai bằng 2
  const filteredDataLoai2 = filterData(data1, 2);

  // Tạo const để hiển thị item
  const ItemFlatList = ({item}) => {
    // code de chuyển dư lieu sang màn hình chi tiết sản phẩm
    const navigation = useNavigation();
    const goToChiTietSP = () => {
      navigation.navigate('ChiTietSanPham', {item});
    };

    //
    return (
      // Dung TouOpacity de an chuyen man
      <TouchableOpacity onPress={goToChiTietSP}>
        <View
          style={{
            backgroundColor: '#ebeaea',
            marginHorizontal: 10,
            padding: 10,
            height: 205,
            borderRadius: 10,
          }}>
          {/* Anh san pham */}
          <Image
            source={{uri:item.image}}
            style={{width: 120, height: 120, borderRadius: 10}}
          />

          {/* Ten san pham */}
          <Text
            style={{
              fontSize: 15,
              marginVertical: 8,
              fontWeight: '700',
              color: '#fab907',
            }}>
            {item.name}
          </Text>
          {/* Gia tien va icon gio hang */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '500',
                }}>
                {item.price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </Text>
            </View>

            {/* Gio hang */}
            <Image
              source={require('../image/iconCart.png')}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Danh sách các hình ảnh sliderShow
  const images = [
    {id: 1, source: require('../image/banner1.jpg')},
    {id: 2, source: require('../image/banner2.jpg')},
    {id: 3, source: require('../image/banner4.jpg')},
  ];
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      let newIndex = (flatListRef.current?.index || 0) + 1;
      if (newIndex >= images.length) {
        // Nếu đến cuối danh sách, cuộn đến ảnh đầu tiên sau một khoảng thời gian nhất định
        flatListRef.current?.scrollToIndex({index: 0, animated: true});
        newIndex = 0; // Reset index về 0
      } else {
        // Cuộn đến ảnh tiếp theo
        flatListRef.current?.scrollToIndex({index: newIndex, animated: true});
      }
      flatListRef.current.index = newIndex;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // return tong
  return (
    <ScrollView>

    <View style={st.container}>
        {/* Icon Menu và avatar */}
        <View style={st.header}>
          <Image
            source={require('../image/iconMenuNew.png')}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <Image
            source={require('../image/iconCartNew.png')}
            style={{
              width: 35,
              height: 35,
            }}
          />
        </View>

        {/* Thanh tìm kiếm sản phẩm  */}
        <View style={st.searchContainer}>
          <Image
            source={require('../image/iconSearch.png')}
            style={{width: 15, height: 15, marginStart: 10, marginEnd: 5}}
          />
          <TextInput style={{height:40}} placeholder="Tìm kiếm........." />
        </View>

        {/* Slider Show */}
        <View
          style={{
            alignItems: 'center',
          }}>
          <FlatList
            ref={flatListRef}
            data={images}
            horizontal
            pagingEnabled
            style={{height: 200, width: 340, borderRadius: 10}}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <Image
                source={item.source}
                style={{
                  width: 340,
                  height: 200,
                  borderRadius: 10,
                }}
              />
            )}
            onScroll={event => {
              // Lấy vị trí trang hiện tại
              const index = Math.floor(
                event.nativeEvent.contentOffset.x /
                  event.nativeEvent.layoutMeasurement.width,
              );
              flatListRef.current.index = index;
            }}
          />
        </View>

  

        {/* san pham noi bat */}
        <Text
          style={{
            margin: 10,
            fontSize: 16,
            fontWeight: '600',
            color: '#ff9900',
          }}>
          Mèo
        </Text>

        {/* Hiển thị FlatList Mèo */}
        <FlatList
          data={filteredDataLoai1}
          style={{
            margin: 10,
          }}
          horizontal={true}
          renderItem={({item}) => <ItemFlatList item={item} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

        <Text
          style={{
            margin: 10,
            fontSize: 16,
            fontWeight: '600',
            color: '#ff9900',
          }}>
          Chó
        </Text>

        {/* Hiển thị FlatList Mèo */}
        <FlatList
          data={filteredDataLoai2}
          style={{
            margin: 10,
            }}
          horizontal={true}
          renderItem={({item}) => <ItemFlatList item={item} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
{/*hien thi san pham da xem gan day*/}
<Text    style={{
            margin: 10,
            fontSize: 16,
            fontWeight: '600',
            color: '#ff9900',
          }}>Recently Viewed Products</Text>
      <FlatList
      style={{margin: 10,}}
        data={recentlyViewedItems}
        horizontal={true}
          renderItem={({item}) => <ItemFlatList item={item} />}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        
      />
    </View>
    </ScrollView>

  );
};

export default Home;

const st = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f5e6cf',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#faf8f8',
  },
});
