import React,{Component} from 'react';
import {Typography} from '@material-ui/core'
import {GoogleMap,Marker,withGoogleMap,
    withScriptjs,Polyline} from 'react-google-maps';


let Puntos = [
    {
        puntos:[
            {lat: -34.695324,lng: -58.399528},
            {lat: -34.696814,lng: -58.401309}],
        color:'#ff0000'
    },
    {
        puntos:[
            {lat:-34.695324, lng:-58.399528},
            {lat:-34.695976, lng:-58.398723}
        ],
        color:'#00ffff'
    },
    {
        puntos:[
            {lat:-34.695941,lng: -58.398562},
            {lat:-34.695244,lng: -58.397768}
        ],
        color:'#ff0000'
    },
    {
        puntos:[
            {lat:-34.697547,lng: -58.400472},
            {lat:-34.696047,lng: -58.398680}
        ],
        color:'#ff0000'
    },
    {
        puntos:[
            {lat:-34.696911,lng: -58.401320},
            {lat:-34.697538,lng: -58.400526},
        ],
        color:'#00ffff'
    }
]



const MapaGoogle = withScriptjs( withGoogleMap((props)=>
<GoogleMap 
    defaultZoom={16}
    defaultCenter={{lat:-34.697070,lng:-58.3984177}} >

        {Puntos.map((elem,ind)=><Polyline
            path={elem.puntos} 
            options={{ 
            strokeColor: elem.color,
            strokeOpacity: 1,
            strokeWeight: 2,
            
          }}
        />

        )}
        

</GoogleMap>))




export default class Mapa extends Component{
    constructor(props){
        super(props);
        this.state = {
            puntos:[]
        }
    }


    render(){



        return (<div>
            <Typography variant='A4' style={{color:'#000000'}} >Mapa de Estacionamientos</Typography>
            <MapaGoogle 
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}/>
        </div>)
    }
}