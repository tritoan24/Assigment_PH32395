import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import TextInputD from '../CustomComponents/TextInputD';
import { launchImageLibrary } from 'react-native-image-picker';
import { launchCamera } from 'react-native-image-picker';
import CustomButton from '../CustomComponents/CustomButton';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CusttomAlert from '../CustomComponents/CusttomAlert';





const SignupCtScreen = ({ route,navigation }) => {
    const { email, password, repeatpassword } = route.params;
    const [phone, setphone] = useState('');
    const [address, setaddress] = useState('');
    // Ảnh đại diện
    const [imageUri, setImageUri] = useState(null);
    const [name, setname] = useState('');
    const defaultImageSource = require('../image/user.png');
    // State để theo dõi nút giới tính được chọn
    const [selectedButton, setSelectedButton] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const postData = async () => {

      
        const data = {
            name: name,
            phone: phone,
            address: address,
            birthday: date.toLocaleString(),
            image: imageUri,
            gender: selectedButton,
            email: email,
            password: password,
        }
        if (!name || !phone || !address || !date || !selectedButton) {
            // Hiển thị cảnh báo nếu có trường nào đó chưa được điền
            Alert.alert('Missing Information', 'Please fill in all fields');
            return;
        }
        if (!phone.trim()) {
            alert('Please enter your phone number');
            return false;
          } else if (!/^\d+$/.test(phone)) {
            alert('Phone number must contain only digits');
            return false;
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
    
        await fetch('http://10.24.45.238:3000/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.status == 201)
                    setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
                navigation.navigate('User', {
                    getemail: email,
                    getpassword: password,
                  })

            })
            .catch((ex) => {
                console.log(ex);
            });



    }



    const [date, setDate] = useState(new Date(159805173));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        console.log('selected date:', currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
        });
    };

    const showDatepicker = () => {
        showMode('date');
        console.log('currentDate', date);

    };






    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setImageUri(imageUri);
                console.log('imageUri', imageUri);

                const base64Image = response.base64;
            console.log('base64Image', base64Image);
            }
        });
    };

    const handleCameraLaunch = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.error) {
                console.log('Camera Error: ', response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setImageUri(imageUri);
                console.log(imageUri);
                const base64Image = response.base64;
            console.log('base64Image', base64Image);
            }
        });
    }


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <Image source={imageUri ? { uri: imageUri } : defaultImageSource} style={{ width: 200, height: 200, borderRadius: 100, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#525252' }} />
                <TouchableOpacity onPress={handleCameraLaunch} style={{ position: 'absolute', right: 20, top: 110 }}>
                    <Image source={require('../image/photo-camera.png')} style={styles.Choiceiamge} />
                </TouchableOpacity>
                <TouchableOpacity onPress={openImagePicker} style={{ position: 'absolute', right: 20, top: 50 }}>
                    <Image source={require('../image/image-.png')} style={styles.Choiceiamge} />
                </TouchableOpacity>
            </View>
            <TextInputD
                placeholder="Name"
                value={name}
                onChangeText={setname}
            />
            <TextInputD
                placeholder="Phone Number"
                value={phone}
                onChangeText={setphone}
            />
            <TextInputD
                placeholder="address"
                value={address}
                onChangeText={setaddress}
            />


            <SafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                borderRadius:10,elevation:5,backgroundColor:'#f1f1f1',
                height:47,marginRight:14,marginLeft:14}}>
                <Text style={styles.birthday}>Birthday: </Text>
                    <Text onPress={showDatepicker} style={styles.date}>
                        {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`} </Text>
                </View>
            </SafeAreaView>



            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                <CustomButton title={"Male"} width={80} height={40} backgroundColor={'#2d663f'} selected={selectedButton === "Male"} onPress={() => setSelectedButton('Male')} />
                <CustomButton title={"Female"} width={80} height={40} backgroundColor={'#cc15a4'} selected={selectedButton === "Female"} onPress={() => setSelectedButton('Female')} />
                <CustomButton title={"Other"} width={80} height={40} backgroundColor={'#6b16b1'} selected={selectedButton === "Other"} onPress={() => setSelectedButton('Other')} />
            </View>
            <View
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
                <CustomButton title={"Signup"} width={315} height={50} onPress={postData} />
            </View>
            {showAlert && <CusttomAlert onClose={() => setShowAlert(false)} title={"Đăng Ký Thành Công"} />}

        </View>

    );
}

const styles = StyleSheet.create({
    Choiceiamge: {
        width: 30,
        height: 30
    },
    container: {
        justifyContent: 'center',
        height: '100%',

    },
    date: {
        fontSize: 20,
        fontFamily: 'italic',
    },
    birthday: {
        position: 'absolute',
        left: 20,
        fontSize: 16,
    }

});

export default SignupCtScreen;
