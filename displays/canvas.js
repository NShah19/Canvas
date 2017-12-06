import React, { Component } from 'react';
import { Button, Text, StyleSheet, View , TouchableHighlight } from 'react-native';
import CountdownCircle from 'react-native-countdown-circle'
import selectedColor from './colors'
import { fromHsv, toHsv } from 'react-native-color-picker'
import { timer } from 'react-timer-hoc'
import Grid from './grid'


var location = "Out of Range";
var count;

var selectedObject = {
    index: -1
}

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
        if(isWithinRadius(this.state.latitude, this.state.longitude, this.state.bruinBear.latitude, this.state.bruinBear.longitude, this.state.bruinBear.radius))
            location = "BruinBear";
        /*else if (isWithinRadius(latitude, longitude, boelter.latitude, boelter.longitude, boelter.radius))
            location = "Boelter";
        else if (isWithinRadius(latitude,longitude, sculptureGarden.latitude, sculptureGarden.longitude, sculptureGarden.radius))
            location = "Sculpture Garden";
        else if(isWithinRadius(latitude, longitude, sproulHall.latitude, sproulHall.longitude, sproulHall.radius))
            location = "Sproul Hall";
        else if(isWithinRadius(latitude, longitude, janssSteps.latitude, janssSteps.longitude, janssSteps.radius))
            location = "Janss Steps";*/
    }
    
    componentDidMount() {
        this.queryDB();

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

    timeup(){
        count = true;
    }

    async queryDB() {
        try {
            let response = await fetch('http://169.232.244.139:3000/grids/lookup/BruinBear.json', 
                //deploy backend to heroku and call get URL  
                {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        )
        let responseJson = await response.json();
        //alert(responseJson[3]);
        this.setState({
            colors: responseJson
        }) 
        } catch(error){
            alert(error);
        }
    }

    /*colorNavigate(){
        if(count == false){
            alert('Cannot select color yet');
        }
        else {
            this.props.navigation.navigate('Color',{form: 'color'})
        }
    }*/

    render() {
        count = false;
        var buttons = [];
        var columns = [];
       /* for(let j = 0; j < 20; j++){
            buttons.push(
               /* <View style={styles.square} key={i}>
                    <TouchableHighlight style={styles.buttonStyle} 
                        onPress= {() =>  this.colorNavigate()}>
                        <Text>
                        </Text>
                    </TouchableHighlight> 
                </View>
                <Grid key ={j} row = {j} navigation={this.props.navigation}
                />
            )
        }//Make buttons*/
        
        /*for(let i = 0; i < 20; i++){
            columns.push (
                <View flexDirection='column' key={i} column={i}>
                    { buttons }
                </View>
            )
        }*/

        for(let i = 0; i < 20; i++){
            for(let j = 0; j < 20; j++){
                buttons.push(
                    <Grid key={j*20+i} id={j*20+i} navigation={this.props.navigation}/>
                )
            }
        }


        /*for(let i = 0; i < 20; i++){
            for(let j = 0; j < 20; j++){
                index = i*20+j
                columns[i][j].colorChange()
            }
        }*/


        return (
            <View style={styles.wrapper}>
                <View >
                <CountdownCircle
                    seconds={2}
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
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
                <View flexWrap="wrap" width={280} height={280}>
                    { buttons }
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
        //backgroundColor: 'white',
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
export {count} ; 
//export {columns};