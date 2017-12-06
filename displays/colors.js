import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ColorPicker, toHsv, fromHsv} from 'react-native-color-picker';
import { NavigationActions } from 'react-navigation'
import { index } from './grid'
import { location } from './canvas';

var selectedColor;

var colorObject = {
    h: 0,
    s: 0,
    v: 0 
}
//separate hsv values by slashes

export default class Color extends Component{
    
    constructor(props) {
        super(props);
        this.state = { 
            color: toHsv('white'),
            //index: props.id
        }//changes object to string
        this.onColorChange = this.onColorChange.bind(this)  
        this.onButtonPress = this.onButtonPress.bind(this)      
    }
    
    onColorChange(color){
        this.setState({color})
    }

    async updateDB(){
        try {
            //TODO: Make this response actually use location string to select appropriate db to update
            let response = await fetch('http://169.232.244.139:3000/grids/colorupdate/' + location + '/' + index + '/' + selectedColor + '.json',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
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

    generateRGBDatabaseEntry(color)
    {
        function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
        function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
        function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
        function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
        
        var R = hexToR(color.toString());
        var G = hexToG(color.toString());
        var B = hexToB(color.toString());
    
        return R.toString() + "-" + G.toString() + "-" + B.toString();
    };

    onButtonPress = () => {
        this.props.navigation.navigate('Canvas',{form: 'canvas'})
        selectedColor = fromHsv(this.state.color);
        //Accepts "#rrggbb" as a hex code RGB values
        selectedColor = this.generateRGBDatabaseEntry(selectedColor)
        this.updateDB();
        
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

