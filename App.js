import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [name, setName] = useState("Lorena")
  const [input, setInput] = useState()

  useEffect(() => {
    async function searchName(){
      const storageName = await AsyncStorage.getItem('name');

      if (storageName !== null){
        setName(storageName)
      }
    }

    searchName()
  }, [])

  useEffect(() => {
    async function recordName(){
      await AsyncStorage.setItem('name', name)
    }

    recordName();
  }, [name])

  function switchName() {
     setName(input)
  }

  return (
    <View style={styles.container}>
      <TextInput style = {styles.input} onChangeText = {(text)=> setInput(text)}></TextInput>
      <Button style = {styles.button} title = "Switch Name" onPress={switchName}></Button>
      <Text style = {{fontSize: 20, marginTop: 10}}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  button: {
    width: '100%',
    marginBottom: 15
  },

  input: {
    borderWidth: 2,
    marginBottom: 5,
    marginTop: 10,
    borderColor: 'black',
    width: '100%'
  }
});
