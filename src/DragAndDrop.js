import React, {Component,useState} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text} from 'react-native';

class App extends Component {
  pan = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {dx: this.pan.x, dy: this.pan.y},
    ]),
    onPanResponderRelease: () => {
      this.pan.extractOffset();
    },
  });



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Drag this box!</Text>
        <Animated.View
          style={{
            transform: [{translateX: this.pan.x}, {translateY: this.pan.y}],
          }}
          {...this.panResponder.panHandlers}>
          <View style={styles.box} />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{translateX: this.pan.x}, {translateY: this.pan.y}],
          }}
          {...this.panResponder.panHandlers}>
          <View style={styles.box} />
        </Animated.View>
      </View>
    );
  }
}

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
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default App;