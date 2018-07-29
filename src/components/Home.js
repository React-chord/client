import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles/styles';

const Home = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
        Welcome React Naive!
    </Text>
    <Text style={styles.instructions}>
        To get started, edit App.js
    </Text>
  </View>
);

export default connect(null, null)(Home);
