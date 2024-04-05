import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'


const TextInputD = (props) => {
  return (
    <View style={styles.container}>
      <TextInput {...props}
        style={styles.input}
      />
    </View>
  )
}

export default TextInputD

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'

  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 17,
    elevation: 5,
    width: 330,
  },
  
})