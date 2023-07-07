import { View, Text, ScrollView, StyleSheet, PanResponder, Dimensions } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuButton from './custom.js';
import { Point, ClickEvents , Node} from './class.js';
import Dijkstra from './class.js';
import { Button } from 'react-native-web';
//const img1 = new Image();

const DijkstraPage = () => {

  /*___________________________________________________________________________________________________________*/
  const pinImg = { src: "/pin.png", width: 40, height: 40 };

  /*___________________________________________________________________________________________________________*/
  const Navigate = useNavigate();
  const [pins, setPins] = useState([]);
  const [renderFloor, setFloor] = useState(0);
  const [renderCount, triggerRender] = useState(false);
  const [temp, setTemp] = useState([]);
  const [Properties, setProperties] = useState([]);
  const [selectState, setSelect] = useState(false);
  const [clickState, setClickState] = useState(undefined);
  const [toolButton, setToolButton] = useState('Select mode');
  const [focusPin, setFocusPin] = useState();
  const [appendPin, setAppendPin] = useState(false);
  const [startPoint,setStartPoint] = useState();
  const [endPoint,setEndPoint] = useState(); 

  /*___________________________________________________________________________________________________________*/
  const canvas = useRef();


  /*___________________________________________________________________________________________________________*/
  const handleClick = (evt, gestureState) => {
    let canvasRect = canvas.current.getBoundingClientRect();
    //console.log('id: ' + evt.target.id);
    //console.log(JSON.stringify(gestureState));
    if (pins[evt.target.id] == undefined) {
      if (!selectState) {
        //console.log('click' + selectState);
        setFocusPin(createPin(pins, '', gestureState.x0 - canvasRect.x, gestureState.y0 - canvasRect.y, renderFloor, []));
      } else {
        if (!appendPin)
          setFocusPin(null);
      }
    } else {
      if (selectState) {
        if (!appendPin) {
          setFocusPin(pins[evt.target.id]);
        } else {
          if (temp.includes(pins[evt.target.id]) || focusPin === pins[evt.target.id]) console.log("already selected.");
          else {
            temp.push(pins[evt.target.id]);
            triggerRender(!renderCount);
          }
        }

      }
      //setProperties(pins[evt.target.id]);
      //triggerRender(!renderCount);

    }


    /*if(canvas.current != undefined){      //load image
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

  };
  /*________________________________________อย่ายุ่ง___________________________________________________________________*/

  const canvasClickTrigger = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        //console.log(gestureState);
        setClickState(new ClickEvents('Release', {
          evt: {
            changedTouches: evt.changedTouches,
            identifier: evt.identifier,
            locationX: evt.locationX,
            locationY: evt.locationY,
            pageX: evt.pageX,
            pageY: evt.pageY,
            target: evt.target,
            timestamp: evt.timestamp,
            touches: evt.touches
          }, gestureState:
          {
            dx: gestureState.dx,
            dy: gestureState.dy,
            moveX: gestureState.moveX,
            moveY: gestureState.moveY,
            numberActiveTouches: gestureState.numberActiveTouches,
            stateID: gestureState.stateID,
            vx: gestureState.vx,
            vy: gestureState.vy,
            x0: gestureState.x0,
            y0: gestureState.y0,
          }
        }));

      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
    })).current;
  /*_______________________________________Effect____________________________________________________________________*/
  //init
  useEffect(() => {
    setProperties(focusPin);
  }, [focusPin]);

  //state changed 
  useEffect(() => {
    //console.log("click"+selectState);
    if (clickState === undefined) return;
    //console.log(clickState.prop.gestureState);
    handleClick(clickState.prop.evt, clickState.prop.gestureState);
  }, [clickState]);

  /*_____________________________________Function______________________________________________________________________*/
  const createPin = (pinPool, name, x, y, floor, weightConnects) => {
    //console.log('before: '+JSON.stringify(pins));
    let pin = new Point(pinPool.length, name, x, y, floor, []);
    weightConnects.forEach(weight => {
      pin.connectPoint.push(weight);
    });
    pinPool.push(pin)
    triggerRender(!renderCount);
    return pin;
    //console.log('After: '+JSON.stringify(pins));
    //console.log('type '+typeof(pins));
    //console.log('pin created '+JSON.stringify(pin));
  }

  const appendConnectPins = (focusPin, connectPins) => {
    if (focusPin == null) return;
    connectPins.forEach((connectPin) => {
      pins[focusPin.index].connectPoint.push([1, connectPin.index]);
      console.log('append ' + [1, connectPin.index]);
    });
    setTemp([]);
    triggerRender(!renderCount);
  }

  const drawLine = (startPin, toPin) => {
    const ctx = canvas.current.getContext('2d');
    //let clickX = gestureState.x0 - canvasRect.x, clickY = gestureState.y0 - canvasRect.y;
    // set line stroke and line width
    ctx.strokeStyle = '#c0c0c0';
    ctx.fillStyle = '#c0c0c0';
    ctx.lineWidth = 5;
    let circleRadius = 5;

    ctx.beginPath();
    ctx.arc(startPin.x, startPin.y, circleRadius, 0, 2 * Math.PI);
    ctx.fill();

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(startPin.x, startPin.y);
    ctx.lineTo(toPin.x, toPin.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(toPin.x, toPin.y, circleRadius, 0, 2 * Math.PI);
    ctx.fill();
  }

  const navigate = ()=>{
    if(startPoint == undefined || endPoint == undefined)return;
    let AllNode = [];
    let startNode = new Node(startPoint.index,0,startPoint.connectPoint);
    let endNode = new Node(endPoint.index,0,endPoint.connectPoint);
    console.log(pins);
    pins.forEach((pin)=>{
      AllNode.push(new Node(pin.index,0,pin.connectPoint));
    });
    console.log(Dijkstra(AllNode,startNode,endNode));
  }

  /*_____________________________________Render______________________________________________________________________*/
  const renderPins = () => {
    let renderResult = [];
    let borderStyle = {};
    //let test = pins;
    //console.log("render "+ typeof(test));
    if (typeof (pins) != typeof ([{ type: 'object' }])) return [];
    pins.forEach((element) => {
      if (element.floor == renderFloor) {
        if (focusPin != null)
          if (focusPin.index == element.index) borderStyle = { borderColor: 'red', borderWidth: 3 }; else borderStyle = {};
        if (appendPin && temp.includes(element)) borderStyle = { borderColor: 'yellow', borderWidth: 1 };

        element.connectPoint.forEach((connectPinIndex) => {
          drawLine(element, pins[connectPinIndex[1]]);
        })

        renderResult.push(<View id={'V' + element.index} style={[borderStyle, { top: element.y - pinImg.height, left: element.x - (pinImg.width / 2), position: 'absolute' }]}>
          <img id={element.index} width={pinImg.width} height={pinImg.height} src={pinImg.src} alt="image" />
        </View>)
      }
    })
    //console.log(renderResult.length)
    return renderResult;
  }

  const renderProp = () => {
    let result = [];
    if (Properties === undefined || Properties.length) return;
  }

  const activeMode = () => {
    let result = [];
    //let allMode = [appendPin, selectState];
    if (appendPin) {
      result.push(<Text style={styles.Mode}>Append</Text>);
    }
    if (selectState) {
      result.push(<Text style={styles.Mode}>Select</Text>);
    } else {
      result.push(<Text style={styles.Mode}>Create</Text>);
    }
    return result;
  }

  /*____________________________________View_______________________________________________________________________*/
  return (
    <View id={"container"} style={styles.container} >

      <View style={styles.menu}>
        <MenuButton onPress={() => { Navigate('/QrCode') }} style={styles.menuButton} title='QR code' />
        <MenuButton style={styles.menuButton} title='Dijkstra' />
        <MenuButton onPress={() => { Navigate('/contact') }} style={styles.menuButton} title='Drag&Drop' />
      </View>
      <View style={styles.body}>
        <View id='panResponder' {...canvasClickTrigger.panHandlers} style={styles.canvasStyles}>

          <canvas ref={canvas} width='800' height='400' />
          {renderPins()}
        </View>
        <View style={styles.PropStyles}>
          <View style={styles.ModeLayer}> {activeMode()} </View>
          <View style={[styles.LayerHeader, {justifyContent:'center', alignItems: 'center', flexDirection: 'row' }]}>
            <Text>Floor: {renderFloor}</Text>
            <MenuButton style={styles.floorButton} title='0' onPress={() => setFloor(0)} />
            <MenuButton style={styles.floorButton} title='1' onPress={() => setFloor(1)} />
          </View>
          <View style={styles.propButtonLayer}>
            <View style={{ flexDirection:'row' }}>
              <MenuButton style={styles.propButton} title='Start location' onPress={() => setStartPoint(focusPin)} />
              <MenuButton style={styles.propButton} title='To destination' onPress={() => setEndPoint(focusPin)} />
              <MenuButton style={styles.propButton} title='Navigate' onPress={() => navigate()} />
            </View>
            <View style={{ flexDirection:'row' }}>
              <MenuButton style={styles.propButton} title={toolButton} onPress={() => { if (toolButton != 'Create Mode') setToolButton('Create Mode'); else setToolButton('Select Mode'); setSelect(!selectState) }} />
              <MenuButton style={styles.propButton} title='Clear Selected' onPress={() => setTemp([])} />
              <MenuButton style={styles.propButton} title='Edit Pins' onPress={() => setAppendPin(!appendPin)} />
              <MenuButton style={styles.propButton} title='Append Paths' onPress={() => appendConnectPins(focusPin, temp)} />
            </View>

          </View>
          <View style={styles.LayerHeader}><Text>Properties</Text></View>
          <View style={styles.LayerDetail}>{JSON.stringify(Properties)}</View>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
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
    alignSelf: 'center',
  },
  canvasStyles: {
    alignSelf: 'center',
    width:'800px' ,
    height:'100%',
    borderWidth: 1,
    borderColor: '#b5daff',
    margin: 5,
    //backgroundColor: 'green',
  },
  PropStyles: {
    flex: 1,
    margin: 5,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',

  },
  LayerDetail: {
    margin: 3,
    width: 'auto',
    backgroundColor: '#d0f5ff',
    fontSize: 16,
    //fontFamily: './Bai_Jamjuree/BaiJamjuree-LightItalic.ttf',
    textAlign: 'left',
  }
  ,
  LayerHeader: {
    margin: 3,
    backgroundColor: 'white',
    fontSize: 18,
    textAlign: 'left',
    borderBottomWidth: 0.1,
    borderColor: '#d0f5ff'
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
  propButtonLayer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  propButton: {
    width: 120,
    height: 20,
    margin: 5,
    backgroundColor: '#3cacff',
    alignContent: 'center',
    alignItems: 'center',
    Text: {
      color: 'white',
      alignItems: 'center',
      alignSelf: 'center',
    },
  },
  ModeLayer: {
    flexDirection: 'row',
  },
  Mode: {
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ffff00',
    backgroundColor: '#ffff00',
    color: 'red',
    alignItems: 'center',
  }
  ,floorButton:
  { 
    backgroundColor: '#5eaeff' ,
    margin: 5 ,
    borderRadius: 3,
    height: 20 , 
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    Text:{ color:'white',fontSize:16},
  },

});

export default DijkstraPage;