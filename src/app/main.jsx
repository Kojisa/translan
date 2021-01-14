import React,{Component} from 'react';
import {IconButton,Input,Paper,AppBar,Button,Grid,Paper
    ,Toolbar,Typography,withStyles,Fab} from '@material-ui/core';
import NuevoAgente from './Agentes/NuevoAgente';
import NuevoVehiculo from './Vehiculos/NuevoVehiculo';
import MuestraAgentes from './Agentes/MuestraDeAgentes';
import MuestraVehiculo from './Vehiculos/MuestraDeVehiculos';
import MuestraPersonas from './Personas/MuestraDePersonas';
import NuevaPersona from './Personas/IngresoPersona';
import MuestraMapa from './Mapa/VistaMapa';

import VehiIcon from '@material-ui/icons/DirectionsCar';
import PerIcon from '@material-ui/icons/People';
import IndivIcon from '@material-ui/icons/Person';

import HomeIcon from '@material-ui/icons/Home';

let MAXBOTONESFILA = 3
let MAXTAMBOTONES = '200px'
let TAMBOTONES = '20wv'

let BOTONES = [
    {nombre:'Agencias',icono:<PerIcon/>,vista:<MuestraAgentes/>},
    {nombre:'Vehiculos',icono:<VehiIcon/>,vista: <MuestraVehiculo/>},
    {nombre:'Personas',icono:<IndivIcon/>,vista:<MuestraPersonas/>},
    {nombre:'Mapa',icono:null,vista:<MuestraMapa/>}
]

let style = {
    colorDefault:'#2196f3'
}



class Botonera extends Component{

    

    //recibe por props una lista de botones permitidos por el usuario
    //recibe una funcion que setea la vista que sea clickeada.
    constructor(props){
        super(props);
        this.state = {
            botones:props.botones //{nombre,icono,vista}
        }
        this.funVista = props.actVista;
        this.armarBotones = this.armarBotones.bind(this);
        
    }

    componentWillReceiveProps(props){
        this.setState({
            botones:props.botones
        })
    }

    armarBotones(){
        let lista = [];
        this.state.botones.map((elem,index)=>{
            lista.push(<Input id={elem.nombre} onClick={()=>this.funVista(elem)}></Input>)
            lista.push(<label htmlFor={elem.nombre}></label>)
            lista.push(<IconButton key={index}>
                {elem.icono}
            </IconButton>)
        })

        return this.state.botones.map((elem,index)=><Grid item xs={3}>  <Button variant='contained' color='primary' onClick={()=>this.funVista(elem)}
                                                     style={{marginLeft:'10px',display:'inline-block'}}
                                                    >
                                                    {elem.nombre}
                                                    {elem.icono}
                                                    </Button></Grid>)
    }

    render(){

        return(
            <div>
                <Grid container spacing={2}>
                    {this.armarBotones()}
                </Grid>
            </div>
        )
    }

}


class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            botones:BOTONES,
            vistaAct:null,
            titulo:'Principal',
        }

    }

    cambiarVista(vista){
        this.setState({vistaAct:vista.vista,titulo:vista.nombre})
    }


    render(){
        
        let render = null

        if(this.state.vistaAct === null){
            render = <Botonera botones={this.state.botones} actVista={this.cambiarVista.bind(this)}></Botonera>
        }
        else{
            render = this.state.vistaAct
        }

        return(
            <div style={{width:'100vw',height:'100vh'}}>
                <AppBar 
                    position='static'>
                    <Toolbar>
                        <IconButton arial-label='Home' color='inherit' onClick={()=>this.setState({vistaAct:null,titulo:'Principal'})}>
                            <HomeIcon />
                        </IconButton>
                        <Typography variant='h5' color='inherit' >{this.state.titulo}</Typography>
                    </Toolbar>
                </AppBar>
                {render}
            </div>
        )
    }
}

export default withStyles()(Main)