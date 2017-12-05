import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ColorPicker, toHsv, fromHsv} from 'react-native-color-picker';
import { NavigationActions } from 'react-navigation'

var selectedColor;


export default class Color extends Component{
    index = (this.props.navigation.state.params.row * 20) + this.props.navigation.state.params.col;
    constructor() {
        super();
        this.state = { 
            color: toHsv('white')
        }//changes object to string
        this.onColorChange = this.onColorChange.bind(this)  
        this.onButtonPress = this.onButtonPress.bind(this)      
    }
    
    onColorChange(color){
        this.setState({color})
    }

    onButtonPress = () => {
        //this.props.navigation.dispatch(NavigationActions.back())
        this.props.navigation.navigate('Canvas',{form: 'canvas'})
        selectedColor = fromHsv(this.state.color);
        alert(selectedColor);
    }

    async updateDB(){
        try {
            let response = await fetch('http://localhost:3000/grids',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({firstParam: location, secondParam: index, thirdParam: this.state.color})
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
