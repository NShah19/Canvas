import React from 'react';
import { StackNavigator } from 'react-navigation';
import RegisterForm from '../login/login_form';
import Login from '../login/login_screen';
import Info from '../login/info';
import Canvas from '../displays/canvas'
import Color from '../displays/colors'
export default Home = StackNavigator({
    Login: {
      screen: Login,
    },
    RegisterForm: {
      screen: RegisterForm,
      navigationOptions: {
          title: 'Create an Account',
      },
    },
    Info: {
      screen: Info,
    },
    Canvas: {
      screen: Canvas,
    },
    Color: {
      screen: Color,
    }
  }, 
  {
    headerMode: 'none',
  });

  