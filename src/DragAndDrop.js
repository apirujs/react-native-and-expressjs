//https://reactnative.dev/docs/panresponder?syntax=functional

import React, {useRef , useState} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text,TextInput} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  const [propertyView,setPropertyView] = useState([]);

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        true,

      onPanResponderGrant: (evt, gestureState) => {
        setPropertyView(
          ['onPanResponderGrant',
            'moveX:\t'+gestureState.moveX,
           'moveY:\t'+gestureState.moveY,
           'stateID:\t'+gestureState.stateID,
           'x0:\t'+gestureState.x0,
           'y0:\t'+gestureState.y0,
           'dx:\t'+gestureState.dx,
           'dy:\t'+gestureState.dy,
           'vx:\t'+gestureState.vx,
           'vy:\t'+gestureState.vy
          ]);
      },
      onPanResponderMove: (evt, gestureState) => {
        setPropertyView(
          ['onPanResponderMove',
            'moveX:\t'+gestureState.moveX,
           'moveY:\t'+gestureState.moveY,
           'stateID:\t'+gestureState.stateID,
           'x0:\t'+gestureState.x0,
           'y0:\t'+gestureState.y0,
           'dx:\t'+gestureState.dx,
           'dy:\t'+gestureState.dy,
           'vx:\t'+gestureState.vx,
           'vy:\t'+gestureState.vy
          ]);
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        setPropertyView(
          ['onPanResponderRelease',
            'moveX:\t'+gestureState.moveX,
           'moveY:\t'+gestureState.moveY,
           'stateID:\t'+gestureState.stateID,
           'x0:\t'+gestureState.x0,
           'y0:\t'+gestureState.y0,
           'dx:\t'+gestureState.dx,
           'dy:\t'+gestureState.dy,
           'vx:\t'+gestureState.vx,
           'vy:\t'+gestureState.vy
          ]);
      },
      onPanResponderTerminate: (evt, gestureState) => {
        setPropertyView(
          ['onPanResponderTerminate',
            'moveX:\t'+gestureState.moveX,
           'moveY:\t'+gestureState.moveY,
           'stateID:\t'+gestureState.stateID,
           'x0:\t'+gestureState.x0,
           'y0:\t'+gestureState.y0,
           'dx:\t'+gestureState.dx,
           'dy:\t'+gestureState.dy,
           'vx:\t'+gestureState.vx,
           'vy:\t'+gestureState.vy
          ]);
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.panResponderLayer} {...panResponder.panHandlers}>Layer1</View>
      <View style={styles.propLayer}>
        <View style={styles.LayerHeader}><Text>Properties</Text></View>
        <View style={styles.LayerDetail}><Text>{propertyView.map((Text)=><li key={Text}>{Text}</li>)}</Text></View>
      </View>

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
    marginTop: '0px',
    padding: 15,
    flex: 0.7,
    height: '90%',
    backgroundColor: '#d0f5ff',
    borderWidth: 0.1,
    borderColor: '#d0f5ff',
    borderRadius: 5,
    overflow: 'scroll',
  },
  propLayer:{
    flex: 0.3,
    borderRadius: 5,
    flexDirection: 'column',
    padding: 0,
    borderWidth: 0.1,
    borderColor: '#d0f5ff',
    backgroundColor: '#FFFFFF',
  },
  LayerHeader:{
    margin: 3,
    backgroundColor: 'white',
    fontSize: 18,
    textAlign: 'left',
    borderBottomWidth: 0.1,
    borderColor: '#d0f5ff'
  },
  LayerDetail:{
    margin: 3,
    backgroundColor: '#d0f5ff',
    fontSize: 16,
    //fontFamily: './Bai_Jamjuree/BaiJamjuree-LightItalic.ttf',
    textAlign: 'left',
  },
  Text:{
    
  }
});

export default App;