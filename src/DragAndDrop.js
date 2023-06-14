//https://reactnative.dev/docs/panresponder?syntax=functional

import React, {useRef , useState} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text,TextInput} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);
  const [Boxs,appendBox] = useState([]);

  const createBox = (Boxs,appendBox,boxStyle)=>{
    console.log("createBoxs");
    let pan = useRef(new Animated.ValueXY()).current;
    let panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
    ).current;
    Boxs.push({pan:pan,panResponder:panResponder,boxStyle:boxStyle});
  }
  const renderBox = (BoxList)=>{
    console.log("renderBoxs");
    let allBox = [];
    if(isNaN(count))return [];
    if(BoxList)return [];
    console.log("boxlist count:"+BoxList.count);
    BoxList.array.forEach(box => {
      allBox.push([
        <Animated.View
          style={{
          transform: [{translateX: box.pan.x}, {translateY: box.pan.y}],
          }}
          {...box.panResponder.panHandlers}>
          <View style={box.boxStyle} />
        </Animated.View>
      ])
    });
    return allBox;
  }
  const renderNormalBox = ()=>{
    
    let allBox = [];
    if(isNaN(count))return [];
    for(let i=0; i< count;i++){
      allBox.push(<View style={styles.box1} />)
    }
    return allBox;
  }
  const manageBoxs = ()=>{
    console.log("manageBoxs");
    
    let lenght = Boxs.count||0;
    console.log("Boxs.count:"+lenght +"\ncount:"+count);
    if(lenght==count) return 0;
    if(lenght<count) {
      for(let i=0; i<count-lenght;i++) createBox(Boxs,appendBox,styles.box1);
    }
    if(lenght>count) {
      for(let i=0; i<lenght-count;i++) Boxs.pop();
    }
    return 1;
  }

/*
<Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}], backgroundColor: '#E6E6E6',
        }}
        {...panResponder.panHandlers}>
        <View style={styles.box1} />
      </Animated.View>
*/
  return (
    <View style={styles.container}>
      <Text style={styles.titleText} value={count}></Text>
      <TextInput id='text_0' value={count} onChangeText={setCount} onSubmitEditing={()=>manageBoxs()} keyboardType="numeric" style={{backgroundColor: 'red'}}></TextInput>
      {renderBox(Boxs)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box1: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
    margin: 1,
  },
  box2: {
    height: 150,
    width: 150,
    backgroundColor: 'red',
    borderRadius: 5,
  },
});

export default App;