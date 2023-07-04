import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";


const MenuButton = ({ onPress, style, title, onDuration }) => {
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
    <Animated.View style={[ style, moveTopAnim.getLayout(), {opacity: fadeAnim }]} >

      <Pressable onPress={() => { cOnpress(onPress); }} onHoverIn={()=>Animated.sequence([moveTopOn]).start} onHoverOut={()=>moveTopOut.start} >

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
  },
};

export default MenuButton;