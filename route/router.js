import React from 'react';
import { StackNavigator } from 'react-navigation';
import RegisterForm from '../login/login_form';
import Login from '../login/login_screen';

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
  }, 
  {
    mode: 'modal',
    headerMode: 'none',
  });

  