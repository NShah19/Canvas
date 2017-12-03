import React, { Component } from 'react';
import { Button, Text, StyleSheet, View , TouchableHighlight } from 'react-native';
import CountdownCircle from 'react-native-countdown-circle'
import selectedColor from './colors'

var location;

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
    
    //BRUIN BEAR (ID 1): 34.070957, -118.444994
    //BOELTER HALL (ID 2): Decimal Degrees: Latitude: 34.0686201 Longitude: -118.4428575
    //SCULPTURE GARDEN (ID 3): DROP A PIN LATER
    //SPROUL HALL (ID 4): DROP A PIN LATER
    //JANSS STEPS (ID 5): 34.072397, -118.443168

    //Get the coords and set a string (like Bruin Bear) based on the results of the current location
    //then send the string over to the backend 
    
    //make db query of that specific location and return the colors  
    
    //querying db every 10 seconds
    async queryDB() {
        try {
            let response = await fetch('http://localhost:3000/grids', 
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
        let responseJson = await response.json();
        this.setState({
            colors: responseJson
        }) 
        } catch(error){
            alert(error);
        }
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

    setId= () => {
        for(let i = 0; i < 25; i++){
            for(let j = 0; j < 25; j++){
                columns[i][j]
            }
        }
    }

    render() {
        //test
        /*if(this.state.latitude == 37.785834 && this.state.longitude == -122.406417){
            location = 'Bruin Bear' //Not actually bruin bear this is my room but 
            //saying for testing purposes
        }*/ //geolocation working
        var buttons = [];
        var columns = [];
        for(let i = 0; i < 20; i++){
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
                    //onTimeElapsed={() => alert('You may now select a color')}
                />
                </View>
                <Text style={styles.title}>
                    Choose your Pixel!
                </Text>
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
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