import React, { Component } from 'react';
import { Button, Text, StyleSheet, View , TouchableHighlight } from 'react-native';
import CountdownCircle from 'react-native-countdown-circle'
import selectedColor from './colors'
import { fromHsv, toHsv } from 'react-native-color-picker'
import { timer } from 'react-timer-hoc'

var location;
var count;

export default class Canvas extends Component {
    /*<Button style={styles.buttonStyle}
                        title=""
                    />
                    */
    constructor() {
        super();

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            colors: []
        }
    }

    componentDidMount() {
        //before component mounts we would wanna set the color as well
        this.watchId = navigator.geolocation.watchPosition(
            (position) =>{
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                //alert(this.state.latitude + "," + this.state.longitude)

            },
            (error) => this.setState({
                error: error.message
            }),
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 1000, 
                distanceFilter: 3,           
            },
        );
    }
    
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId)
    }
    //componentDidMount method is called when the component is mounted
    /*
    <Text>Latitude: {this.state.latitude}</Text>
    <Text>Longitude: {this.state.longitude}</Text>
    */
    //BRUIN BEAR (ID 1): 34.070988, -118.445003 to 34.071174, -118.445009
    //BOELTER HALL (ID): 34.069069, -118.442955 to 34.069714, -118.441966
    //SCULPTURE GARDEN (ID 3): 34.075118, -118.439990 to 34.075648 to -118.440761
    //SPROUL HALL (ID 4): 34.072153, -118.449949 to 34/071781, -118.450281 
    //JANSS STEPS (ID 5): 34.072169, -118.443119 to 34.072171, -118.443722

    //Get the coords and set a string (like Bruin Bear) based on the results of the current location
    //then send the string over to the backend 
    
    //make db query of that specific location and return the colors  
    
    //querying db every 10 seconds
    async queryDB() {
        try {
            let response = await fetch('https://arcane-woodland-58063.herokuapp.com/grids', 
                //deploy backend to heroku and call get URL  
                {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(location)
            }
        )
        let responseJson = await response.text();
        alert(responseJson)
        this.setState({
            colors: responseJson
        }) 
        alert(responseJson)
        } catch(error){
            alert(error);
        }
    }

    timeup(){
        count = true;
    }

    colorNavigate(){
        if(count == false){
            alert('Cannot select color yet');
        }
        else {
            this.props.navigation.navigate('Color',{form: 'color'})
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
        if(this.state.latitude == 37.785834 && this.state.longitude == -122.406417){
            location = 'Bruin Bear' //Not actually bruin bear this is my room but 
            //alert(location);//saying for testing purposes
        } //geolocation working
        var buttons = [];
        var columns = [];
        count = false;
        for(let i = 0; i < 20; i++){
            buttons.push(
                <View style={styles.square} key={i}>
                    <TouchableHighlight style={styles.buttonStyle} 
                        onPress= {() => this.colorNavigate()}>
                        <Text>
                        </Text>
                    </TouchableHighlight> 
                </View>
            )
        }//Make buttons
        for(let j = 0; j < 20; j++){
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
                    onTimeElapsed={() => this.timeup()}
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
                <Button
                    title = "Refresh"
                    onPress = {() => this.queryDB()}
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