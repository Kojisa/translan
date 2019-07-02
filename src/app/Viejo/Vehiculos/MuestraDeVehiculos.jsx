import React,{Component} from 'react';
import {Grid,Typography,TextField,MenuItem,Paper,Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NuevoAgente from './NuevoVehiculo';
import VistaVehiculo from './VistaVehiculo';


export default class Contenedor extends Component{
    constructor(props){
        super(props);
        this.state ={
            filtro:'',
            prefiltro:'',
            tipos:['Todos','Escolares','Remiseria'],
            tipo:'Todos',
            agencias:[{'Dominio':'ABX 019','Tipo':'Remis'},
                    {'Dominio':'AIE 193','Tipo':'Remis'},{'Dominio':'RUH 417','Tipo':'Escolar'},
                    {'Dominio':'XNA 903','Tipo':'Remis'},{'Dominio':'NKF 831','Tipo':'Escolar'},
                    {'Dominio':'BJA 591','Tipo':'Escolar'},{'Dominio':'LAK 481','Tipo':'Remis'},
                    {'Dominio':'EOQ 019','Tipo':'Escolar'},{'Dominio':'REI 341','Tipo':'Remis'},
                    {'Dominio':'GKA 510','Tipo':'Escolar'},],
            criterios:['Razon','Localidad','CUIT'],
            criterio:'',
            elegido:null,
            agregando:false,
        }

    }


    render(){

        let popup = null;
        if(this.state.agregando){
            popup=<NuevoAgente salir={()=>this.setState({agregando:false})} ></NuevoAgente>
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
                        <TextField
                            style={{marginLeft:'10px',width:'130px'}}
                            value={this.state.criterio} select label='Tipo'
                            onChange={(ev)=>this.setState({criterio:ev.target.value})}
                            > 
                            {this.state.tipos.map((elem,ind)=><MenuItem value={elem} key={ind}>{elem}</MenuItem>)}
                        </TextField>
                        <Fab size='small' aria-label='Add' onClick={()=>this.setState({agregando:true})}
                                        color='primary' style={{marginLeft:'10px',display:'inline-block'}}
                                        >
                                        <AddIcon/>
                                    </Fab>
                        </div>
                    </Grid>
                    <Grid container direction='row' style={{marginTop:'10px'}} justify='flex-start'>
                        {this.state.agencias.map((elem,ind)=><Tarjetas datos={elem} key={ind}
                        elegir={()=>console.log(elem)}></Tarjetas>)}
                    </Grid>


                </Grid>
            
            <div style={{margin:'10px',display:'inline-block'}} >
                <VistaVehiculo></VistaVehiculo>
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