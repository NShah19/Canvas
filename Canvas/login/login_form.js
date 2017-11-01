import React, { Component } from 'react';
import { Button, View, TextInput, StyleSheet, Text, Modal, TouchableHighlight } from 'react-native';

export default class RegisterForm extends Component {

    constructor() {
        super();
        
        this.info = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            errors: [],
        }

    }


    render(){
        return (
            <View style={styles.container}>
            <Text style={styles.title}>
                Create an Account
            </Text>
            <TextInput
                onChangeText={(val) => this.setState({name: val})}
                style={styles.input}
                placeholder="Full Name"
            />
            <TextInput
                onChangeText={(val) => this.setState({email: val})}
                style={styles.input}
                placeholder="Email"
            />
            <TextInput
                onChangeText={(val) => this.setState({password: val})}
                style={styles.input}
                placeholder="Enter Password"
                secureTextEntry={true}
            />
            <TextInput
                onChangeText={(val) => this.setState({password_confirmation: val})}
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={true}
            />
            <Button 
                //onPress={this.onCreatePress.bind(this)}
                style={styles.input} 
                title="Create"
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        padding: '10%'
    },
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      padding: 10,
      paddingTop: 80
    },
    input: {
      height: 50,
      marginTop: 10,
      padding: 4,
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#48bbec',
      width: 300
    },
    button: {
      height: 50,
      backgroundColor: '#48BBEC',
      alignSelf: 'stretch',
      marginTop: 10,
      justifyContent: 'center'
    },
    buttonText: {
      fontSize: 22,
      color: '#FFF',
      alignSelf: 'center'
    },
    heading: {
      fontSize: 30,
    },
    error: {
      color: 'red',
      paddingTop: 10
    },
    loader: {
      marginTop: 20
    }
  });