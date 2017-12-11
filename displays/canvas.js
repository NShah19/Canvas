import React, { Component } from 'react';
import { Button, Text, StyleSheet, View , TouchableHighlight } from 'react-native';
import CountdownCircle from 'react-native-countdown-circle'
import selectedColor from './colors'
import { fromHsv, toHsv } from 'react-native-color-picker'
import { timer } from 'react-timer-hoc'
import Grid from './grid'


var location = "Out of Range";
var count;

function isWithinRadius(x1, y1, x2, y2, r){
    var distance = Math.hypot((x2 - x1), (y2 - y1));
    //alert("distance/x1/y1/x2/y2/r: " + distance + "/" + x1 + "/" + y1 + "/" + x2 + "/" + y2 + "/" + r);
    if (distance <= r)
        return true;
    return false;
}

export default class Canvas extends Component {
    /*<Button style={styles.buttonStyle}
                        title=""
                    />
                    */
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            colors: [],
            bruinBear: {latitude: 34.070988, longitude: -118.445003, radius: 0.000186097},
            boelterHall: {latitude: 34.069069, longitude: -118.442955, radius: 0.00127966},
            sculptureGarden: {latitude: 34.075118, longitude: -118.439990, radius: 0.000935597},
            sproulHall: {latitude: 34.07222181561782, longitude: -118.45063157390658, radius: 0.001006060},
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

    /*changeColor(color){
        this.refs.grid.colorChange(color)
    }*/

    timeup(){
        count = true;
    }

    //Accepts "rrr-ggg-bbb" as three integer RGB values
    //Returns "#rrggbb" as a hex code
    parseRGBDatabaseEntryToObject(RGBstring)
    {
        var RGBarr = RGBstring.split("-");
        if (RGBarr.length != 3) return "#000000";
        
        var R = parseInt(RGBarr[0]).toString(16);
        if(R.length == 1)
            R = '0' + R;
        
        var G = parseInt(RGBarr[1]).toString(16);
        if(G.length == 1)
            G = '0' + G;
            
        var B = parseInt(RGBarr[2]).toString(16);
        if(B.length == 1)
            B = '0' + B;
        
        return "#" + R + G + B; 
    };

    async queryDB() {
        if(isWithinRadius(this.state.latitude, this.state.longitude, this.state.bruinBear.latitude, this.state.bruinBear.longitude, this.state.bruinBear.radius))
            location = "BruinBear";
        else if (isWithinRadius(this.state.latitude, this.state.longitude, this.state.boelterHall.latitude, this.state.boelterHall.longitude, this.state.boelterHall.radius))
            location = "BoelterHall";
        else if (isWithinRadius(this.state.latitude,this.state.longitude, this.state.sculptureGarden.latitude, this.state.sculptureGarden.longitude, this.state.sculptureGarden.radius))
            location = "SculptureGarden";
        else if(isWithinRadius(this.state.latitude, this.state.longitude, this.state.sproulHall.latitude, this.state.sproulHall.longitude, this.state.sproulHall.radius))
            location = "SproulHall";
        else if(isWithinRadius(this.state.latitude, this.state.longitude, this.state.janssSteps.latitude, this.state.janssSteps.longitude, this.state.janssSteps.radius))
            location = "JanssSteps";
            
        if(location != 'Out of Range'){
            try {
                var response = await fetch('http://nameless-springs-89770.herokuapp.com/grids/lookup/' + location+ '.json', 
                //deploy backend to heroku and call get URL  
                    {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }
            )
            //alert("This is the response: " + response)
            var responseJson = await response.json();

            //loop through responseJson
            for (i = 0; i < 400; i++)
            {
                responseJson[i] = this.parseRGBDatabaseEntryToObject(responseJson[i])
            }
        
        
            this.setState({
                colors: responseJson
            }) 

            } catch(error){
                alert(error);
            }
        }
        else {
            alert("No Canvas in Range of this Location!")
            this.props.navigation.navigate('Login',{form: 'login'})
        }
    }


    render() {
        count = false;
        var columns = [];
        var buttons = [];        
        
        if(this.state.colors != '')
        {
            for(let i = 0; i < 20; i++){
                for(let j = 0; j < 20; j++){
                    var str = this.state.colors[j*20+i];
                    buttons.push(
                        <Grid ref="grid" key={j*20+i} id={j*20+i} color={str} navigation={this.props.navigation}/>
                    )
                }
            }
        }
        else
        {
            buttons = null;
        }



        return (
            <View style={styles.wrapper}>
                <View >
                <CountdownCircle
                    seconds={300}
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

square_style = function(color){
    return{
        width: 14,
        height: 14,
        backgroundColor: color,
        borderColor:'black',        
        borderWidth: 0.25,
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
export {location}
//export {columns};