import React,{Component} from 'react';
import {Avatar,Grid,Paper,Typography} from '@material-ui/core';
import {GenerarCampo} from '../Campos';
import {ObtenerPlantilla} from '../Plantillas';
import IconAvatar from '@material-ui/icons/AccountCircle'


export default class IngresoPersona extends Component{
    constructor(props){
        super(props);

        
        this.state={
            datos:props.valores === null ? {} : props.valores,
            foto:null,
            firma:null,
            huellas:null,
            plantilla:ObtenerPlantilla('Persona')
        }
        this.actualizar = props.actualizar
    }

    componentWillReceiveProps(props){
        if(props.valores != null){
            this.setState({datos:props.valores});
        }
    }

    render(){
        console.log(this.state.datos)
        return(<Grid container spacing={20}>
            <Grid item xs direction='column'>
                {this.state.plantilla.map((elem,ind)=>GenerarCampo(elem,this.state.datos[elem],this.actualizar))}
            </Grid>
            <Grid container xs justify={"flex-end"} alignItems={"center"} spacing={10}>
                <Grid item xs>
                    <Paper style={{height:'100px'}}>
                        <Typography>Firma del Responsable</Typography>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Avatar style={{width:'100px',height:'100px'}}><IconAvatar/></Avatar>
                </Grid>
            </Grid>
        </Grid>)
    }
}