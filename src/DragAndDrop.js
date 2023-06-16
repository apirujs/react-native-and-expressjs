//https://reactnative.dev/docs/panresponder?syntax=functional

import React, {useRef , useState} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text,TextInput} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  const [Boxs,appendBox] = useState([]);

  
  return (
    <View style={styles.container}>
      <View style={styles.panResponderLayer}>Layer1</View>
      <View style={styles.propLayer}>Layer2</View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: '100vh',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    direction: 'ltr',
    flexWrap: 'wrap',
    backgroundColor: '#9bff9b',
    overflow: 'hidden',
  },
  panResponderLayer:{
    margin: '10px',
    padding: 15,
    flex: 0.7,
    height: '90%',
    backgroundColor: '#c0c0c0',
    //borderWidth: 1,
    borderRadius: 5,
    overflow: 'scroll',
  },
  propLayer:{
    flex: 0.3,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
});

export default App;