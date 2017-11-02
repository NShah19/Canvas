import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

export default class Login extends Component {

  render() {
      return (
          <View style={styles.wrapper}>
              <Button
                onPress = {() => this.props.navigation.navigate('RegisterForm', {form: 'create'})}
                color = "white"
                title='Create an Account'
                />
              <Image
                  style={styles.logo}
                  source={require('./canvas_logo.png')}
              />
              <Button
                onPress = {() => {}}
                title = "Login"
                color = 'white'
                />
              <Button
                onPress = {() => {}}
                title = "Logout"
                color = 'white'
                />
          </View>
      );
  }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'purple',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    logo: {
        width: 300,
        height: 80
    },
});