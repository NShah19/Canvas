import React, { Component } from 'react';
import { Button, Text, StyleSheet, View , TouchableHighlight } from 'react-native';
import {selectedColor} from './colors'
import {count} from './canvas'

var index;

export default class Grid extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: 'white',
            id: props.id
        }
    }

    colorNav(e) {
        //alert("Row/Column/Index: " + row + "/" + col + "/" + index)

        if(count == false){
            alert('Cannot select color yet');
        } else{
            alert(this.state.id)
            this.props.navigation.navigate('Color', {form: 'color', index: this.state.id})
        this.setState ({
            color: selectedColor
        }) 
            //alert(selectedColor)
        }
    }

    setIndex(i, j){
        index = i*20 + j;
        alert(index);
    }

    render() {
        return(
            <View style={square_style(this.color)} key={this.index}>
                <TouchableHighlight style={button_style(this.state.color)} 
                    onPress= {(e) => this.colorNav(e)}>
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

export{index};
