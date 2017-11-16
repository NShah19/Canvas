import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

export default class Login extends Component {

  render() {
      return (
          <View style={styles.wrapper}>
              <Image
                  style={styles.logo}
                  source={require('./canvas_logo.png')}
              />
              <View style={{flexDirection:'row'}} paddingTop={20}>
                <Button
                    onPress = {() =>  this.props.navigation.navigate('Info',{form: 'info'})}
                    title = "Login"
                    color = 'white'
                    paddingTop = "10%"
                    />
                <Button
                    onPress = {() => {}}
                    title = "Logout"
                    color = 'white'
                    paddingTop = {100}
                    />
                </View>
                <Button
                    onPress = {() => this.props.navigation.navigate('RegisterForm', {form: 'create'})}
                    color = "white"
                    title='Create an Account'
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
        fontWeight: 'bold',
    },
    logo: {
        width: 250,
        height: 80
    },
});