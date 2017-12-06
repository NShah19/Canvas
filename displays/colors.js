import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ColorPicker, toHsv, fromHsv} from 'react-native-color-picker';
import { NavigationActions } from 'react-navigation'
import { index } from './grid'

var selectedColor;

//separate hsv values by slashes

export default class Color extends Component{
    //index = (this.props.navigation.state.params.row    * 20) + this.props.navigation.state.params.col;
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

    async updateDB(){
        try {
            let response = await fetch('http://169.232.244.139:3000/grids/colorupdate/BruinBear/' + index + '/white.json',
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
        //alert(this.state.colors)
        } catch(error){
            alert(error);
        }
    }

    /*for(let i = 0; i < 20; i++){
        for(let j = 0; j < 20; j++){
            columns[i][j].colorChange(this.state.colors[i*20+j])
        }
    }*/

    onButtonPress = () => {
        //this.props.navigation.dispatch(NavigationActions.back())
        this.props.navigation.navigate('Canvas',{form: 'canvas'})
        selectedColor = fromHsv(this.state.color);
        this.updateDB();
        //alert(selectedColor);
        //alert(toHsv('white'))        
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

