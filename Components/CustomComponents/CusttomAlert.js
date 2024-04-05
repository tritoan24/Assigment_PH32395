import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Dimensions, Image  } from 'react-native';

const CusttomAlert = ({ onClose, title }) => {
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
  
    return (
      <View style={[styles.container, { top: (windowHeight - 150) / 2, left: (windowWidth - 255) / 2 }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Image source={require('../image/cross.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFBE98',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    position: 'absolute',
    width:270
  },
  text: {
    fontSize: 20,
    color: '#333',
    fontFamily:'italic'
  },
  closeButton: {
    position: 'absolute',
    top: 3,
    right: 2,
    padding: 2,
 

  },
 
});

export default CusttomAlert;
