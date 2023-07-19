import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";

class AnimatedSet {
  constructor(value,animatedMethod,focusAttribute,mouseTrigger,callbackFunction) {
     this.value = value;
     this.animatedMethod = animatedMethod;
     this.focusAttribute =  focusAttribute;
     this.mouseTrigger = mouseTrigger;
     this.callbackFunction = callbackFunction;
    }
}

export const TestButton = ({onPress, style ,onDuration ,title}) => {
  let anim = [];
  style = StyleSheet.flatten(style);
  const opacityValue = useRef(new Animated.Value(1)).current;
  const fadeOut = Animated.timing(opacityValue, {
    toValue: 0.1,
    duration:
      typeof onDuration === "undefined"
        ? cdefault.anim.onDuration
        : onDuration,
    useNativeDriver: false,
  });
  const fadeIn = Animated.timing(opacityValue, {
    toValue: 1,
    duration:
      typeof onDuration === "undefined"
        ? cdefault.anim.onDuration
        : onDuration,
    useNativeDriver: false,
  });

  const [colorValue,setColor] = useState("#D1F3FF");
  //console.log("renderBB");
  //if(colorValue!="#D1F3FF") setColor("#FFFFFF");
  anim.push(new AnimatedSet(opacityValue,()=> Animated.sequence([fadeOut,fadeIn]).start(), "opacity", "onPress",onPress));
  anim.push(new AnimatedSet(colorValue,()=>{return setColor("#FFFFFF");}, null, "onHoverIn",null));
  anim.push(new AnimatedSet(colorValue,()=>{return setColor("#D1F3FF");}, null, "onHoverOut",null));
  return (
  <Button style={[style,{boxShadow: 'inset 0px 2px 3px #F4AAB9'}]} title={title} animatedSets={anim} />)
}

const Button = ({ style, title, animatedSets }) => {
  const [buttonProps, setButtonProps] = useState({});
  const [animatedStyle, setAnimatedStyle] = useState([]);
  const supportAttributes = ["onPress", "onPressIn","onHoverIn","onHoverOut"];
  useEffect(() => {
    let onPressDeclared = false;
    if (title == null) title = "Button";
    if (animatedSets === undefined) return;
    else {
      let focusAttribute = [];
      animatedSets.forEach((item) => {
        let key = item.focusAttribute;
        if (!focusAttribute.includes(key) && key!=null) {
          focusAttribute.push(key);
          
          animatedStyle.push({ [key]: item.value });
        }
        if (supportAttributes.includes(item.mouseTrigger)) {
          let newProp = String(item.mouseTrigger);
            onPressDeclared = true;
            setButtonProps(prevProps => (
              { ...prevProps, [newProp]: () => { PressCallback(item.animatedMethod, item.callbackFunction); } }
            )
            );
          
        };

      });
    }
    console.log(animatedStyle);
  }, []);

  const PressCallback = (inputFunction, callback) => {
    //console.log('press');
    try {
      if (typeof inputFunction == "function") {
        return inputFunction();
      }

    } catch (err) {
      console.log(err);
    } finally {
      if (typeof callback == "function") {
        //console.log('press');
        return callback();
      }
    }
  };

  return (
    <Animated.View style={animatedStyle} >

      <Pressable {...buttonProps} style={style}>

        <Text style={typeof StyleSheet.flatten(style).Text === "undefined" ? cdefault.Text : StyleSheet.flatten(style).Text}>{title}</Text>

      </Pressable>

    </Animated.View>
  );
};

export const MenuButton = ({ onPress, style, title, onDuration }) => {
  const [opacity, setOpacity] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const moveTopAnim = useRef(new Animated.ValueXY()).current;
  const fadeIn = Animated.timing(fadeAnim, {
    toValue: 1,
    duration:
      typeof onDuration === "undefined"
        ? cdefault.anim.onDuration
        : onDuration,
    useNativeDriver: false,
  });


  const fadeOut = Animated.timing(fadeAnim, {
    toValue: 0,
    duration:
      typeof onDuration === "undefined"
        ? cdefault.anim.onDuration
        : onDuration,
    useNativeDriver: false,
  });

  const moveTopOn = Animated.timing(moveTopAnim.y, {
    toValue: cdefault.anim.move,
    duration:
      typeof onDuration === "undefined"
        ? cdefault.anim.onDuration
        : onDuration,
    useNativeDriver: false,
  });
  const moveTopOut = Animated.timing(moveTopAnim.y, {
    toValue: 0,
    duration:
      typeof onDuration === "undefined"
        ? cdefault.anim.onDuration
        : onDuration,
    useNativeDriver: false,
  });

  const cOnpress = (callback) => {
    try {
      Animated.sequence([fadeOut, fadeIn]).start();
    } catch (err) {
      console.log(err);
    } finally {
      if (typeof callback == "function") {
        //console.log('press');
        return callback();
      }
    }
  };
  //initial
  useEffect(() => {
    if (title == null) title = "Button";
    //console.log(cdefault.hover.onDuration);
  }, []);

  return (
    <Animated.View style={[moveTopAnim.getLayout(), { opacity: fadeAnim }]} >

      <Pressable style={style} onPressIn={() => moveTopOn.start()} onPressOut={() => moveTopOut.start()} onPress={() => { return cOnpress(onPress); }} >

        <Text style={typeof StyleSheet.flatten(style).Text === "undefined" ? cdefault.Text : StyleSheet.flatten(style).Text}>{title}</Text>

      </Pressable>

    </Animated.View>
  );
};

const cdefault = {
  Text: {
    color: "Black",
    fontSize: 16,
    alignItems: "center",
  },
  anim: {
    onDuration: 100,
    move: 10,
    offset: 1,
    idleAttributeValue: 1,
    transference: 'decrease',
    focusAttribute: 'opacity',
    transferDuration: 100,
  }
};
