import React,{Component} from 'react';
import {Grid,Typography,TextField,MenuItem,Paper,Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NuevoAgente from './NuevoAgente';
import VistaAgente from './VistaAgente';


export default class Contenedor extends Component{
    constructor(props){
        super(props);
        this.state ={
            filtro:'',
            prefiltro:'',
            tipos:['Todos','Escolares','Remiseria'],
            tipo:'Todos',
            agencias:[{'Razon':'Remis Nico','Tipo':'Remiseria'},
            {'Razon':'S.A. Bondi','Tipo':'Escolar'},
            {'Razon':'Remis Efren','Tipo':'Remiseria'},
            {'Razon':'Remises Sole','Tipo':'Remiseria'},
            {'Razon':'Escuelita Express','Tipo':'Escolar'},
            {'Razon':'TranBus','Tipo':'Escolar'}],
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
                            value={this.state.criterio} select label='Criterio'
                            onChange={(ev)=>this.setState({criterio:ev.target.value})}
                            >
                            {this.state.criterios.map((elem,ind)=><MenuItem value={elem} key={ind}>{elem}</MenuItem>)}
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
                <VistaAgente></VistaAgente>
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
            lista.push(<Typography variant='body1' style={{color:'#ffffff'}}><b>{claves[x]}:</b> {datos[claves[x]]}</Typography>)
        }
        return lista;
    }

    render(){
        let color = "#0288D1"
        if(this.state.datos['Tipo'] === 'Remiseria' ){
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