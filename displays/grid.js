import React, { Component } from 'react';
import { Button, Text, StyleSheet, View , TouchableHighlight } from 'react-native';
import {selectedColor} from './colors'
import {count} from './canvas'


export default class Grid extends Component {
    constructor(){
        super();
        this.state = {
            color: 'white'
        }
    }

    colorChange() {
        if(count == false){
            alert('Cannot select color yet');
        } else{
            this.props.navigation.navigate('Color',{form: 'color'})
           // this.setState ({
             //   color: selectedColor
            //})
            alert(selectedColor)
        }
       
    }

    
    render() {
        return(
            <View style={square_style(this.color)} key={this.index}>
                <TouchableHighlight style={button_style(this.state.color)} 
                    onPress= {() =>  this.colorChange()}>
                    <Text>
                    </Text>
                </TouchableHighlight> 
            </View>
        )
    }
    //match the position of the button with the index in the color array
}

button_style = function(color){
    return{
        backgroundColor: color,
        width:14,
        height:14,
        borderWidth: 0.25,     
        borderColor:'black', 
        borderRadius: 1, 
        borderStyle: 'solid' 
    }
}
square_style = function(color){
    return{
        width: 14,
        height: 14,
        backgroundColor: color,
        borderColor:'black',        
        borderWidth: 0.25,
    }
}
/*
const styles = StyleSheet.create({
    
        square: {
            width: 14,
            height: 14,
            backgroundColor: 'white',
            borderColor:'black',        
            borderWidth: 0.25,
        },
    
        buttonStyle: {
            backgroundColor: 'white',
            width:14,
            height:14,
            borderWidth: 0.25,     
            borderColor:'black', 
            borderRadius: 1, 
            borderStyle: 'solid' 
        },
    
    });
*/
