//https://reactnative.dev/docs/panresponder?syntax=functional

import React, { useRef, useState, useEffect } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text, TextInput, Pressable ,Button} from 'react-native';

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
  const [Boxs, setBoxs] = useState([
   /* { id: '0',pan:{}, offsetX: 0, offsetY: 0, cX: 0, cY: 0, prop: [{ backgroundColor: '#61dafb', width: 80, height: 80, borderRadius: 4, }], highlight: {} },
    { id: '1',pan:{}, offsetX: 0, offsetY: 0, cX: 0, cY: 0, prop: [{ backgroundColor: '#61dafb', width: 80, height: 80, borderRadius: 4, }], highlight: {} }
*/
  ]);
  const BoxFocusID = useRef(-1);
  //const pan = useRef(new Animated.ValueXY()).current;
  const [highlightStyle, setHighlightStyle] = useState({});
  //const [enableDrag,setEnableDrag] = useState(false);
  const count = useRef(-1);

  const genBoxsComponent = (Boxs, focusID) => {
    let components = [];  
    let pressableTag = (Box ,styles,index) => {
      return (<Pressable style={styles} id={'P'+Box.id} onPress={(evt) => focusElement(evt, index)} >
        <View id={Box.id} style={{ width: 'auto', height: '100%' }} />
      </Pressable>)
    }
  
    //let isIDValid = (Boxs[focusID] != undefined);
    Boxs.map((Box, index) => {
      if (Box.id == focusID) {
        components.push (<Animated.View id={'B'+Box.id} style={[Box.pan.getLayout(),{width:0}]}>
          {pressableTag(Box,[Box.prop, Box.highlight] ,Box.id)}
        </Animated.View>)
      }else{
        components.push (<Animated.View id={'B'+Box.id} style={[Box.pan.getLayout(),{width:0}]}> 
          {pressableTag(Box,[Box.prop],Box.id)}
        </Animated.View>)
      }
  
    })
  
    return components;
  }

  useEffect(() => {
    //count.current = count.current + 1;
    //console.log('drag: '+enableDrag);
  },[]);

  const focusElement = (evt, index) => {
    //console.log('id: ' + evt.currentTarget.id);
    if (Boxs[index] == undefined) return;

    BoxFocusID.current = (Number(index));
    //console.log(BoxFocusID);
    Boxs[index].highlight = { borderWidth: 1, borderColor: 'red' };
    setPropertyView(convertProp(Boxs[index].prop));
    //setEnableDrag(false);
  }

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        //console.log("enable "+enableDrag);
        if (Boxs[evt.target.id] == undefined) {
          setPropertyView([]);
          //if (Boxs[evt.target.id] == undefined) return;
          //let upDateborderWidth = (Boxs[BoxFocusID.current].prop.borderWidth == undefined) ? 0 : Boxs[BoxFocusID.current].prop.borderWidth;
          //Boxs[BoxFocusID.current].highlight = { borderWidth: upDateborderWidth };
          //style={[pan.getLayout(), { width: 0 }]}
          BoxFocusID.current = -1;
        }else{

        }

      },
      onPanResponderMove: (evt, gestureState) => {
        //console.log();
      
        //console.log(enableDrag.current);
        if (Boxs[evt.target.id] == undefined) return;
        //if (!enableDrag) return;
        console.log('Move');
        Boxs[evt.target.id].pan.setValue({ x: gestureState.dx + Boxs[evt.target.id].offsetX, y: gestureState.dy + Boxs[evt.target.id].offsetY })

      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        if (Boxs[evt.target.id] == undefined) return;
        //if (!enableDrag) return;
        Boxs[evt.target.id].offsetX = Boxs[evt.target.id].offsetX + gestureState.dx;
        Boxs[evt.target.id].offsetY = Boxs[evt.target.id].offsetY + gestureState.dy;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.log("Terminated");
      },
    },(e)=>console.log('f'))
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.panResponderLayer}>
        <View style={styles.LayerHeader}><Text>View</Text></View>
        <View style={styles.viewLayer} {...panResponder.panHandlers}>
          <View>
            {genBoxsComponent(Boxs, BoxFocusID.current)}
          </View>
        </View>
      </View>

      <View style={styles.propLayer}>
        <View style={styles.LayerHeader}><Text>Properties</Text></View>
        <View style={styles.LayerDetail}>
          <Button onPress={()=>{return Boxs.push({ id: Boxs.count+1,pan: new Animated.ValueXY(), offsetX: 0, offsetY: 0, cX: 0, cY: 0, prop: [{ backgroundColor: '#61dafb', width: 80, height: 80, borderRadius: 4, }], highlight: {} })}} title='Add Box'></Button>
          <Text>BoxFocusID: {BoxFocusID.current}</Text>
          <Text>render: {count.current}</Text>
          <Text> </Text>
          <Text>{propertyView}</Text>
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