import React, { Component } from 'react';
import { Button, Text, StyleSheet, View , TouchableHighlight } from 'react-native';
import CountdownCircle from 'react-native-countdown-circle'
import selectedColor from './colors'

export default class Canvas extends Component {
    /*<Button style={styles.buttonStyle}
                        title=""
                    />
                    */
    constructor() {
        super();

        this.state = {
            i: Number,
            j: Number
        }

    }
    //convert lat, long coordinates to an id to match the grid id in the database
    //ex: if lat, long is 1200, 1200 then grid id = 1 and location = 'Bruin Bear'    
    
    //querying db every 10 seconds
    async queryDB() {
        try {
            let response = await fetch('url', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //
                })
            }
        )
        } catch(error){
            alert(error);
        }
    }

    setId= () => {
        for(let i = 0; i < 25; i++){
            for(let j = 0; j < 25; j++){
                columns[i][j]
            }
        }
    }

    render() {

        var buttons = [];
        var columns = [];
        //FEATURE TO ADD LATER
        //Based on Geolocation, limit the pixels that you can select
        //Use the key values to remember (i and j) to remember which buttons were which colors
        //when storing in the database (relational databases)
        //think about creating separate class for buttons so that each button has a unique ID
        for(let i = 0; i < 25; i++){
            buttons.push(
                <View style={styles.square} key={i}>
                    <TouchableHighlight style={styles.buttonStyle} 
                        onPress= {() =>  this.props.navigation.navigate('Color',{form: 'color'})}>
                        <Text>
                        </Text>
                    </TouchableHighlight> 
                </View>
            )
        }//Make buttons
        for(let j = 0; j < 25; j++){
            columns.push (
                <View flexDirection='column' key={j}>
                    { buttons }
                </View>
            )
        }//Make columns
//25 x 25 grid

        return (
            <View style={styles.wrapper}>
                <View >
                <CountdownCircle
                    seconds={10}
                    radius={30}
                    borderWidth={8}
                    color="#ff003f"
                    bgColor="#fff"
                    textStyle={{ fontSize: 15 }}
                    //onTimeElapsed={() => alert('You may now select a color')}
                />
                </View>
                <Text style={styles.title}>
                    Choose your Pixel!
                </Text>
                <View flexDirection='row'>
                    { columns }
                </View>
                <View padding = {20} flexDirection='row' alignItems='center'>
                <Button
                    alignItems='center'
                    title = "Back to Main Menu     "
                    onPress = {() =>  this.props.navigation.navigate('Login',{form: 'login'})}
                    color = "white"
                />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    buttonChange: {
        backgroundColor: 'white',
        width:14,
        height:14,
        borderWidth: 0.25,     
        borderColor:'black', 
        borderRadius: 1, 
        borderStyle: 'solid' 
    },

    square: {
        width: 14,
        height: 14,
        backgroundColor: 'white',
        borderColor:'black',        
        borderWidth: 0.25,
    },
    wrapper: {
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
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
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        padding: 30,
        paddingLeft: 30,
        paddingRight: 30,
    },
    logo: {
        width: 300,
        height: 80
    },
});