//https://reactnative.dev/docs/panresponder?syntax=functional

import React, { useRef, useState, useEffect } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text, TextInput, Pressable } from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  const [propertyView, setPropertyView] = useState([]);
  const [Boxs, setBoxs] = useState([{ ID: '01', offsetX: 0, offsetY: 0, cX: 0, cY: 0 }]);
  const [BoxFocusID, setBoxFocusID] = useState('');
  const pan = useRef(new Animated.ValueXY()).current;


  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        /*setPropertyView(
          ['onPanResponderGrant',
            'moveX:\t' + gestureState.moveX,
            'moveY:\t' + gestureState.moveY,
            'stateID:\t' + gestureState.stateID,
            'x0:\t' + gestureState.x0,
            'y0:\t' + gestureState.y0,
            'dx:\t' + gestureState.dx,
            'dy:\t' + gestureState.dy,
            'vx:\t' + gestureState.vx,
            'vy:\t' + gestureState.vy
          ]);*/
        setPropertyView([Boxs[0].offsetX, Boxs[0].offsetY]);
      },
      onPanResponderMove: (evt, gestureState) => {
        pan.setValue({ x: gestureState.dx + Boxs[0].offsetX, y: gestureState.dy + Boxs[0].offsetY })
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        /*setPropertyView(
          ['onPanResponderRelease',
            'moveX:\t' + gestureState.moveX,
            'moveY:\t' + gestureState.moveY,
            'stateID:\t' + gestureState.stateID,
            'x0:\t' + gestureState.x0,
            'y0:\t' + gestureState.y0,
            'dx:\t' + gestureState.dx,
            'dy:\t' + gestureState.dy,
            'vx:\t' + gestureState.vx,
            'vy:\t' + gestureState.vy
          ]);*/
        Boxs[0].offsetX = Boxs[0].offsetX + gestureState.dx;
        Boxs[0].offsetY = Boxs[0].offsetY + gestureState.dy;
        setPropertyView([Boxs[0].offsetX, Boxs[0].offsetY]);
      },
      onPanResponderTerminate: (evt, gestureState) => {
        /*setPropertyView(
          ['onPanResponderTerminate',
            'moveX:\t' + gestureState.moveX,
            'moveY:\t' + gestureState.moveY,
            'stateID:\t' + gestureState.stateID,
            'x0:\t' + gestureState.x0,
            'y0:\t' + gestureState.y0,
            'dx:\t' + gestureState.dx,
            'dy:\t' + gestureState.dy,
            'vx:\t' + gestureState.vx,
            'vy:\t' + gestureState.vy
          ]);*/
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.panResponderLayer}>
        <View style={styles.LayerHeader}><Text>View</Text></View>
        <View style={styles.viewLayer} {...panResponder.panHandlers}>
          <View>
            <Animated.View style={[pan.getLayout()]}>
              <Pressable id='01' onPress={(evt)=>{console.log('id: '+evt.currentTarget.id);}} style={styles.box}>
                <View style={{ width: 'auto', height: 'auto'}} />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      </View>

      <View style={styles.propLayer}>
        <View style={styles.LayerHeader}><Text>Properties</Text></View>
        <View style={styles.LayerDetail}><Text>{propertyView.map((Text) => <li key={Text}>{Text}</li>)} count:{count}</Text></View>
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
  panResponderLayer: {
    margin: '10px',
    marginTop: '0px',
    flex: 0.7,
    height: '90%',
    backgroundColor: 'white',
    borderColor: '#d0f5ff',
    borderRadius: 5,

  },
  viewLayer: {
    padding: 15,
    flexWrap: 'wrap',
    overflow: 'scroll',
    backgroundColor: '#d0f5ff',
    height: '100%',
  },
  propLayer: {
    flex: 0.3,
    borderRadius: 5,
    flexDirection: 'column',
    padding: 0,
    borderWidth: 0.1,
    borderColor: '#d0f5ff',
    backgroundColor: '#FFFFFF',
  },
  LayerHeader: {
    margin: 3,
    backgroundColor: 'white',
    fontSize: 18,
    textAlign: 'left',
    borderBottomWidth: 0.1,
    borderColor: '#d0f5ff'
  },
  LayerDetail: {
    margin: 3,
    backgroundColor: '#d0f5ff',
    fontSize: 16,
    //fontFamily: './Bai_Jamjuree/BaiJamjuree-LightItalic.ttf',
    textAlign: 'left',
  },
  Text: {

  }
  , box: {
    backgroundColor: '#61dafb',
    width: 80,
    height: 80,
    borderRadius: 4,
  },
});

export default App;