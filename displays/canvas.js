import React, { Component } from 'react';
import { Button, Text, StyleSheet, View , TouchableHighlight } from 'react-native';
import CountdownCircle from 'react-native-countdown-circle'
import selectedColor from './colors'

var location = "Out of Range";

function isWithinRadius(x1, y1, x2, y2, r){
    var distance = Math.hypot((x2 - x1), (y2 - y1));
    if (distance <= r)
        return true;
    return false;
}

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
            colors: [],
            bruinBear: {latitude: 34.070988, longitude: -118.445003, radius: 0.000186097},
            boelter: {latitude: 34.069069, longitude: -118.442955, radius: 0.00127966},
            sculptureGarden: {latitude: 34.075118, longitude: -118.439990, radius: 0.000935597},
            sproulHall: {latitude: 34.072153, longitude: -118.449949, radius: 0.000498606},
            janssSteps: {latitude: 34.072169, longitude: -118.443119, radius: 0.000603003}
        }

    }
    

    componentWillMount() {
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
        if(isWithinRadius(latitude, longitude, bruinBear.latitude, bruinBear.longitude, bruinBear.radius))
            location = "Bruin Bear";
        else if (isWithinRadius(latitude, longitude, boelter.latitude, boelter.longitude, boelter.radius))
            location = "Boelter";
        else if (isWithinRadius(latitude,longitude, sculptureGarden.latitude, sculptureGarden.longitude, sculptureGarden.radius))
            location = "Sculpture Garden";
        else if(isWithinRadius(latitude, longitude, sproulHall.latitude, sproulHall.longitude, sproulHall.radius))
            location = "Sproul Hall";
        else if(isWithinRadius(latitude, longitude, janssSteps.latitude, janssSteps.longitude, janssSteps.radius))
            location = "Janss Steps";
    }
    
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId)
    }
    //componentDidMount method is called when the component is mounted
    
    //BRUIN BEAR (ID 1): 34.070988, -118.445003 to 34.071174, -118.445009
    //BOELTER HALL (ID 2): 34.069069, -118.442955 to 34.069809, -118.441911
    //SCULPTURE GARDEN (ID 3): 34.075118, -118.439990 to 34.075648, -118.440761
    //SPROUL HALL (ID 4): 34.072153, -118.449949 to 34.071781, -118.450281 
    //JANSS STEPS (ID 5): 34.072169, -118.443119 to 34.072171, -118.443722

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
            //saying for testing purposes
        } //geolocation working
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