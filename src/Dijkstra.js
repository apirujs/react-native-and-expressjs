import { View, Text, ScrollView, StyleSheet, PanResponder, Dimensions } from 'react-native';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuButton from './custom.js';
import { Point } from './class.js';
//const img1 = new Image();

const Dijkstra = () => {
  const Navigate = useNavigate();
  const canvas = useRef();
  const [pins, setPins] = useState([]);
  const [renderFloor, setFloor] = useState(0);
  const [renderCount, triggerRender] = useState(0);
  const [temp, setTemp] = useState([]);
  const pinImg = { src: "/pin.png", width: 40, height: 40 };
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const canvasClickTrigger = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        const canvasRect = canvas.current.getBoundingClientRect();
        console.log(evt.target.id);
        if (pins[evt.target.id] == undefined) {
          createPin((pins.length), gestureState.x0 - canvasRect.x, gestureState.y0 - canvasRect.y, renderFloor, []);
        } else {
          /*const ctx = canvas.current.getContext('2d');
          let clickX=gestureState.x0 - canvasRect.x, clickY = gestureState.y0 - canvasRect.y;
          // set line stroke and line width
          ctx.strokeStyle = "red";
          ctx.fillStyle = "red";
          ctx.lineWidth = 5;

          ctx.beginPath();
          ctx.arc(0, 0, 5, 0, 2 * Math.PI);
          ctx.fill();

          // draw a red line
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(clickX,clickY);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(clickX, clickY, 5, 0, 2 * Math.PI);
          ctx.fill();*/
        }


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

  const createPin = (name, x, y, floor, weightConnects) => {
    //console.log('before: '+JSON.stringify(pins));
    let pin = new Point(name, x, y, floor, []);
    weightConnects.forEach(weight => {
      pin.connectPoint.push(weight);
    });
    pins.push(pin)
    triggerRender(pins.length);
    //console.log('After: '+JSON.stringify(pins));
    //console.log('type '+typeof(pins));
    //console.log('pin created '+JSON.stringify(pin));
  }

  const renderPins = () => {
    let renderResult = [];
    //let test = pins;
    //console.log("render "+ typeof(test));
    if (typeof (pins) != typeof ([{ type: 'object' }])) return [];
    pins.forEach((element) => {
      if (element.floor == renderFloor) {
        renderResult.push(<View id={'V' + element.name} style={{ top: element.y - pinImg.height, left: element.x - (pinImg.width / 2), position: 'absolute' }}>
          <img id={element.name} width={pinImg.width} height={pinImg.height} src={pinImg.src} alt="image" />
        </View>)
      }
    })
    //console.log(renderResult.length)
    return renderResult;
  }

  return (
      <View id={"container"} style={styles.container} >

        <View style={styles.menu}>
          <MenuButton onPress={() => { Navigate('/QrCode') }} style={styles.menuButton} title='QR code' />
          <MenuButton style={styles.menuButton} title='Dijkstra' />
          <MenuButton onPress={() => { Navigate('/contact') }} style={styles.menuButton} title='Drag&Drop' />
        </View>
        <View style={styles.body}>
          <View id='panResponder' {...canvasClickTrigger.panHandlers} style={styles.canvasStyles}>
            <canvas ref={canvas} width='400' height='200' />
            {renderPins()}
          </View>
          <View style={styles.PropStyles}>
            <View>Floor</View>
            <View>Properties</View>
            <View></View>
          </View>
        </View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:Dimensions.get('window').width,
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
    backgroundColor: 'green',
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