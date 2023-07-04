import { View, Text, ScrollView,StyleSheet,PanResponder,Image} from 'react-native';
import {useState, useRef } from 'react';
import {Link ,useNavigate} from 'react-router-dom';
import MenuButton from './custom.js';
import {Point} from './class.js';
//const img1 = new Image();

const Dijkstra = ()=>{ 
  const Navigate = useNavigate();
  const canvas = useRef();
  const [pins,setPins] = useState([]);
  const [renderFloor,setFloor] = useState(0);

  const canvasClickTrigger = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        //console.log(gestureState);
        createPin('_'+(pins.length+1),gestureState.x0,gestureState.y0,renderFloor,[]);

        /*if(canvas.current != undefined){
          console.log('click');
          const ctx = canvas.current.getContext('2d');
          //ctx.width = canvas.current.width = 400;
          //ctx.height = canvas.current.height = 300;
          //const img1 = new Image();
          //img1.src = './pin.png';
          //img1.onload = function () {
            //draw background image
            
          //ctx.drawImage(pinImage, gestureState.x0, gestureState.y0,30,30);
            //draw a box over the top
            //ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
            //ctx.fillRect(0, 0, 500, 500);
          //};
          
        }*/
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
    }),
  ).current;
  
  const createPin = (name,x,y,floor,weightConnects)=>{
    let all=pins;
    let pin = new Point(name,x,y,floor,[]);
    weightConnects.forEach(weight => {
      pin.connectPoint.push(weight);
    }); 
    all.push(pin);
    setPins(all);
    console.log('pin created '+JSON.stringify(pin));
  }

  const renderPins = ()=>{
    let renderResult = [];
    pins.forEach((element,index)=>{
       if(element.floor==renderFloor){
        renderResult.push(<View id={element.name} style={{top:element.y , left:element.x, position:'absolute'}}>
          <img width={40} height={40} src="/pin.png" alt="image" />
        </View>)
      }
    })
    console.log(renderResult.length)
    return renderResult;
  }
  
  return (

    <ScrollView>
    <View style={styles.container}>
      <View style={styles.menu}>
        <MenuButton onPress={()=>{Navigate('/QrCode')}} style={styles.menuButton} title='QR code' />
        <MenuButton style={styles.menuButton} title='Dijkstra' />
        <MenuButton onPress={()=>{Navigate('/contact')}} style={styles.menuButton} title='Drag&Drop' />
      </View>
      <View style={styles.body}>
        <View {...canvasClickTrigger.panHandlers} style={styles.canvasStyles}>
          <canvas ref={canvas} width='800' height='500' />
          {renderPins()}
        </View>
        <View style={styles.PropStyles}>
          <View>Floor</View>
          <View>Properties</View>
        </View>
      </View>
    </View>
  </ScrollView>
);}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: '#F5FCFF',
    },
    menu: {
      flexDirection: 'row',
      width: '100%',
      height: 30,
      paddingTop: 5,
      paddingHorizontal: 5,
      backgroundColor: 'white',
      boxShadow: '0px 2px 9px #F4AAB9',
    },
    body: {
      paddingTop: 10,
      height: '100%',
    },
    canvasStyles: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#b5daff',
      margin: 5,
    },
    PropStyles: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
  
    },
    menuButton: {
      width: 80,
      height: '100%',
      backgroundColor: 'white',
      alignContent: 'center',
      alignItems: 'center',
      borderColor: '#dadada',
      borderRightWidth: 1,
      Text: {
        color: '#003e9b',
        alignItems: 'center',
      },
    },
});

export default Dijkstra;