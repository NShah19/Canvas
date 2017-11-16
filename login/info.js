import React, { Component }from 'react';
import { Alert, Button, View, TextInput, StyleSheet, Text, Modal, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

    }
    
    checkInput = () => {
        const { username } = this.state;
        const { password } = this.state;
        if((username == "") ||  (password == "")){
            Alert.alert("Enter Missing Text Fields");
        }
        else {
            this.props.navigation.navigate('Canvas',{form: 'canvas'});
        }
        //can add password match check later on API call
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Login
                </Text>
                <TextInput
                    placeholder="Username"
                    onChangeText={username => this.setState({username})}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    onChangeText={ password => this.setState({ password })}
                    style={styles.input}
                    secureTextEntry={true}
                />
                <Text style={styles.note}>
                    *Slide down to go back
                </Text>
                <Button
                    onPress = {this.checkInput}
                    title="Continue"
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
    note: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        padding: '10%'
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