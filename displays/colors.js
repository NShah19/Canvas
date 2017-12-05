import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ColorPicker, toHsv, fromHsv} from 'react-native-color-picker';
import { NavigationActions } from 'react-navigation'

var selectedColor;


export default class Color extends Component{
    constructor() {
        super();
        this.state = { 
            color: toHsv('white'),
            colors: []
        }//changes object to string
        this.onColorChange = this.onColorChange.bind(this)  
        this.onButtonPress = this.onButtonPress.bind(this)      
    }
    
    onColorChange(color){
        this.setState({color})
    }

    //move updateDB over to colors.js
    async updateDB(){
        try {
            let response = await fetch('http://164.67.207.154:3000/grids',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.colors)
            }
        )
        let res = await response.json();
        this.setState({
            colors: res
        })
        } catch(error){
            alert(error);
        }
    }

    onButtonPress = () => {
        //this.props.navigation.dispatch(NavigationActions.back())
        this.props.navigation.navigate('Canvas',{form: 'canvas'})
        selectedColor = fromHsv(this.state.color);
        alert(selectedColor);
    }

    render() {
        return (
            <View style={{flex: 1, padding: 15, backgroundColor: 'black'}}>
            <ColorPicker
              oldColor='white'
              color={this.state.color}
              selectedColor={this.state.color}
              onColorChange={this.onColorChange}
              onColorSelected={selectedColor => alert(`Color selected: ${selectedColor}`)}
              onOldColorSelected={color => alert(`Old color selected: ${color}`)}
              style={{flex: 1}}
            />
            <View>
                <Button
                    onPress={this.onButtonPress}
                    title="Select Color"
                    color="white"
                />
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create( {
    title: {
        color: 'white',
        alignItems: 'center'
    }
})

export {selectedColor} ;
