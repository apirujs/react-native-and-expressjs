import { View, Text} from 'react-native';
import {Link} from 'react-router-dom';
import styles from './StyleSheet.js';

const ContactPage = () => (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>
      <Text style={styles.description}>You can reach us at contact@example.com</Text>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </View>
  );

  export default ContactPage;