//import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginForm from './App/Components/LoginForm';
import RegisterForm from './App/Components/RegisterForm';
import DashBoard from './App/Components/Home';
import App from './App/';

/*export default class PracticeProject1 extends Component {
  render() {
    return (
        <App />
    );
  }
}*/

const PracticeProject1 = StackNavigator({
  Home: { screen: App },
  LoginForm: { screen: LoginForm },
  RegisterForm: { screen: RegisterForm },
  DashBoard: { screen: DashBoard },
});

AppRegistry.registerComponent('PracticeProject1', () => PracticeProject1);
