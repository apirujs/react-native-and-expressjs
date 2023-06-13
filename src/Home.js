import { View, Text} from 'react-native';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './StyleSheet.js';

const Home = () => (
    <View style={styles.container}>
      <Text style={styles.heading}>hello world!</Text>
      <Text style={styles.description}>This is a simple webpage built with React Native Web.</Text>
      <Link to="/contact" style={styles.link}>Go to Contact Page</Link>
    </View>
  );

  export default Home;