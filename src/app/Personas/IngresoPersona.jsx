import React,{Component} from 'react';
import {Avatar,Grid,Paper,Typography,Dialog,
FormControl} from '@material-ui/core';
import {GenerarCampo} from '../Campos';
import {ObtenerPlantilla} from '../Plantillas';
import IconAvatar from '@material-ui/icons/AccountCircle'


export default class IngresoPersona extends Component{
    constructor(props){
        super(props);

        
        this.state={
            datos:props.valores === undefined ? {} : props.valores,
            foto:null,
            firma:null,
            huellas:null,
            etapa:0,
            confirmado:false,
            pasos:['Pedir Datos de la Persona'],
            plantilla:ObtenerPlantilla('Persona'),
        }
        this.actualizar = props.actualizar
        this.salir = props.salir;
    }

    componentWillReceiveProps(props){
        if(props.valores != null){
            this.setState({datos:props.valores});
        }
    }

    actualizarVal(val,campo){
        let datos = this.state.datos;
        datos[campo] = val
        this.setState({datos:datos})
    }

    render(){
        return(
        <Dialog onEscapeKeyDown={this.salir} onBackdropClick={this.salir}
        style={{height:'90vh',width:'90vw',display:'block',textAlign:'center'}}
        open={true}
        >
        <Grid container spacing={20} style={{paddingBottom:'10px'}}>
            <Typography>Datos de la Persona</Typography>
            <Grid item xs direction='column'>
                {this.state.plantilla.map((elem,ind)=>GenerarCampo(elem,this.state.datos[elem],this.actualizarVal.bind(this)))}
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
        </Grid>
        </Dialog>)
    }
}



class AMB extends Component{
    constructor(props){
        super(props);
        this.state = {
            plantilla:props.plantilla,
            tipo:props.tipo,
            valores:{},
        }
        this.actualizar = props.actualizar;
        
    }

    componentWillReceiveProps(props){
        this.setState({plantilla:props.plantilla,valores:props.valores})
    }


    render(){
        return(<div>
            <Typography variant='h4'> Datos de la Agencia</Typography>
            <FormControl>
                {this.state.plantilla.map((elem,ind)=>GenerarCampo(elem,this.state.valores[elem],(val)=>this.actualizar(val,elem)))}
            </FormControl>
        </div>)
    }
}