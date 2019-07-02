import React,{Component} from 'react';
import {Dialog,Paper,Button,Grid,Typography,TextField,
MenuItem,Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NuevaPersona from './IngresoPersona';
import VistaPersona from './VistaPersona';


export default class Contenedor extends Component{
    constructor(props){
        super(props);
        this.state = {
            filtro:'',
            prefiltro:'',
            criterios:['Nombre/Apellido','DNI','Localidad'],
            criterio:'',
            elegido:null,
            agregando:false,
            personas:[
                {'Nombre':'Juan Perez','DNI':'13401921'},
                {'Nombre':'Jorge Gonzales','DNI':'20154312'},
                {'Nombre':'Marta Lopez','DNI':'25092812'},
                {'Nombre':'Carlos Ezequiel Hernandez','DNI':'30198321'}
            ],
        }
    }



    render(){
        let popup = null;
        if(this.state.agregando){
            popup=<NuevaPersona salir={()=>this.setState({agregando:false})} dialogo={true}></NuevaPersona>
        }

        return(
            <div style={{margin:'10px',width:'90vw'}}>
            {popup}
            <Grid container direction='row'>
                <Grid container direction='column' style={{width:'40vw'}}> 
                    <Grid item > 
                        <div>
                        <TextField
                                
                                value={this.state.prefiltro}
                                label="Busqueda"
                                onChange={(ev)=>this.setState({prefiltro:ev.target.value})}/>
                        
                        <Fab size='small' aria-label='Add' onClick={()=>this.setState({agregando:true})}
                                        color='primary' style={{marginLeft:'10px',display:'inline-block'}}
                                        >
                                        <AddIcon/>
                                    </Fab>
                        </div>
                    </Grid>
                    <Grid container direction='row' style={{marginTop:'10px'}} justify='flex-start'>
                        {this.state.personas.map((elem,ind)=><Tarjetas datos={elem} key={ind}
                        elegir={()=>console.log(elem)}></Tarjetas>)}
                    </Grid>


                </Grid>
            
            <div style={{margin:'10px',display:'inline-block'}} >
                <VistaPersona></VistaPersona>
            </div>
            </Grid>
        </div>)
    }
}

class Tarjetas extends Component{
    constructor(props){
        super(props);
        this.state={
            datos:props.datos,

        }
        this.elegir = props.elegir;

    }

    cargarDatos(){
        let datos = this.state.datos;
        let claves =  Object.keys(datos);
        let lista = []
        for(let x = 0; x < claves.length; x++){
            lista.push(<Typography variant='body1' style={{color:'#ffffff'}} ><b>{claves[x]}:</b> {datos[claves[x]]}</Typography>)
        }
        return lista;
    }


    render(){

        let color = "#0288D1"
        if(this.state.datos['Tipo'] === 'Remis' ){
            color = "#00796B"
        }

        

        return(
            <Grid item xs >
                <Paper  style={{backgroundColor:color,display:'inline-block',minWidth:'250px'}}
                    onClick={this.elegir}
                >
                    {this.cargarDatos.bind(this)()}
                </Paper>
            </Grid>)
    }
}