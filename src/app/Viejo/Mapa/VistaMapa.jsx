import React,{Component} from 'react';
import {Typography,FormControl,RadioGroup,
    FormControlLabel,FormLabel,Radio} from '@material-ui/core'
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
    },
    {
        puntos:[
            {lat:-34.697649, lng:-58.400427},
            {lat:-34.698294,lng: -58.399623},
        ],
        color:'#00ffff'
    },
    {
        puntos:[
            {lat:-34.698284,lng: -58.399521},
            {lat:-34.697560,lng: -58.398718}
        ],
        color:'#ff0000'
    },
    {
        puntos:[
            {lat:-34.697471,lng: -58.398622},
            {lat:-34.696778,lng: -58.397786}
        ],
        color:'#00ffff'
    },
    {
        puntos:[
            {lat:-34.696700,lng: -58.397678},
            {lat:-34.695997,lng: -58.396836}
        ],
        color:'#00ffff'
    },
    {
        puntos:[
            {lat:-34.695902, lng: -58.396721},
            {lat:-34.695189,lng: -58.395930}
        ],
        color:'#00ffff'
    },
    {
        puntos:[
            {lat:-34.696824,lng: -58.399514},
            {lat:-34.697480,lng: -58.398736}
        ],
        color:'#00ffff'
    },
    {
        puntos:[
            {lat:-34.696042,lng: -58.398595},
            {lat:-34.696703,lng: -58.397792}
        ],
        color:'#00ffff'
    },
    {
        puntos:[
            {lat:-34.695167,lng: -58.397664},
            {lat:-34.694443,lng: -58.396796}
        ],
        color:'#00ffff'
    },
    {
        puntos:[
            {lat:-34.695235,lng: -58.399488},
            {lat:-34.694521,lng: -58.398640}
        ],
        color:'#00ffff'
    },
    {
        puntos:[
            {lat:-34.695235,lng: -58.399584},
            {lat:-34.694569,lng: -58.400413}
        ],
        color:'#ff0000'
    }
]

let puntosRemis = [
    {point:{lat:-34.692835, lng: -58.401975}},
    {point:{lat:-34.694793, lng: -58.398213}},
    {point:{lat: -34.695075,lng: -58.402833}},
    {point:{lat:-34.697212, lng: -58.398258}},
    {point:{lat:-34.695928, lng: -58.400108}},
    {point:{lat:-34.695773, lng: -58.399919}}
]

const MapaGoogle = withScriptjs( withGoogleMap((props)=>
<GoogleMap 
    defaultZoom={16}
    defaultCenter={{lat:-34.697070,lng:-58.3984177}} >

        {props.puntos}
        />

        )}
        

</GoogleMap>))




export default class Mapa extends Component{
    constructor(props){
        super(props);
        this.state = {
            puntos:[],
            opcion:'estacionamiento',
        }
    }


    render(){
        let puntos = []
        if(this.state.opcion === 'estacionamiento'){
            puntos = Puntos.map((elem,ind)=><Polyline
            path={elem.puntos} 
            options={{ 
            strokeColor: elem.color,
            strokeOpacity: 1,
            strokeWeight: 2,
            
            }}
            />)
        
        }
        if(this.state.opcion === 'remis'){
            puntos = puntosRemis.map((elem,ind)=><Marker   
                position={elem.point}
            />)
        }


        return (<div style={{marginTop:'30px'}}>
            
             <MapaGoogle
                puntos={puntos}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `500px`,width:'70%',display:'inline-block' }} />}
                mapElement={<div style={{ height: `100%` }} />}/>
            <div style={{display:'inline-block',verticalAlign:'top'}}>

                <FormControl component='fieldset' >
                    <FormLabel component='legend' > Tipo </FormLabel>
                    <RadioGroup
                        onChange={(ev)=>this.setState({opcion:ev.target.value})}
                        value={this.state.opcion}
                    >
                        <FormControlLabel value='estacionamiento' control={<Radio/>} label='Estacionamiento' />
                        <FormControlLabel value='remis' control={<Radio/>} label='Remis' />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>)
    }
}