import React from 'react';
import { AppRegistry } from 'react-native';
import App from './app.js';
import Json_package from '../package.json';

const appName= Json_package.name;

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});
