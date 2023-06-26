//https://reactnative.dev/docs/panresponder?syntax=functional

import React, { useRef, useState, useEffect } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text, TextInput, Pressable } from 'react-native';

const convertProp = (props) => {
  let supportFeature = [];
  let returnList = [];
  //console.log(props);
  props.map((item, index) => {
      if (typeof (item) == typeof ({})) {
        //console.log(item);
        Object.keys(item).forEach((propKey) => {
          if (!supportFeature.includes(propKey)) {
            returnList.push(<li key={returnList.count}>{propKey} : {item[propKey]}</li>);
          }
        });
      }
  });
  //console.log(returnList);
  return returnList;
}

const App = () => {
  const [propertyView, setPropertyView] = useState([]);
  const [Boxs, setBoxs] = useState([{ id: '0', offsetX: 0, offsetY: 0, cX: 0, cY: 0, prop: [{ backgroundColor: '#61dafb', width: 80, height: 80, borderRadius: 4, }], highlight: {} }]);
  const BoxFocusID = useRef(-1);
  const pan = useRef(new Animated.ValueXY()).current;
  const [highlightStyle, setHighlightStyle] = useState({});
  const enableDrag = useRef(false);
  const count = useRef(-1);

  useEffect(() => {
    count.current = count.current +1;
  })

  const focusElement = (evt, index) => {
    //console.log('id: ' + evt.currentTarget.id);
    if (Boxs[index] == undefined) return;

    BoxFocusID.current = (Number(index));
    //console.log(BoxFocusID);
    Boxs[index].highlight = { borderWidth: 1, borderColor: 'red' };
    setPropertyView(convertProp(Boxs[index].prop));
    enableDrag.current =false;
  }

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        if(!enableDrag.current){
            setPropertyView([]);
            if (Boxs[BoxFocusID.current] == undefined) return;
            let upDateborderWidth = (Boxs[BoxFocusID.current].prop.borderWidth == undefined)? 0 : Boxs[BoxFocusID.current].prop.borderWidth;
            Boxs[BoxFocusID.current].highlight = { borderWidth:upDateborderWidth};
            BoxFocusID.current = -1;
        }

      },
      onPanResponderMove: (evt, gestureState) => {
        //console.log(BoxFocusID.current);
        //console.log(enableDrag.current);
        if (Boxs[BoxFocusID.current] == undefined) return;
        if (!enableDrag.current) return;
        console.log('Move');
        pan.setValue({ x: gestureState.dx + Boxs[BoxFocusID.current].offsetX, y: gestureState.dy + Boxs[BoxFocusID.current].offsetY })
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        if (Boxs[BoxFocusID.current] == undefined) return;
        if (!enableDrag.current) return;
        Boxs[BoxFocusID.current].offsetX = Boxs[BoxFocusID.current].offsetX + gestureState.dx;
        Boxs[BoxFocusID.current].offsetY = Boxs[BoxFocusID.current].offsetY + gestureState.dy;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.log("Terminated");
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.panResponderLayer}>
        <View style={styles.LayerHeader}><Text>View</Text></View>
        <View style={styles.viewLayer} {...panResponder.panHandlers}>
          <View>
            {Boxs.map((Box, index) =>
              <Animated.View style={[pan.getLayout(), { width: 'auto' }]}>
                <Pressable id={Box.id} onPressIn={() => enableDrag.current=true} onPress={(evt) => focusElement(evt, index)} style={[Box.prop, Box.highlight]}>
                  <View style={{ width: 'auto', height: '100%' }} />
                </Pressable>
              </Animated.View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.propLayer}>
        <View style={styles.LayerHeader}><Text>Properties</Text></View>
        <View style={styles.LayerDetail}>
          <Text>{propertyView}</Text>
          <Text>BoxFocusID: {BoxFocusID.current}</Text>
          <Text>render: {count.current}</Text>
        </View>
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