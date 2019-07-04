import React,{Component} from 'react';
import {TextField,Checkbox,Button,Fab,
Select,FormControl,InputLabel, Menu,Table,TableRow,TableCell,TableBody,
MenuItem, Typography,Dialog,DialogContent,Paper,IconButton,
DialogTitle,DialogActions} from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import IngresarAgencia from './Remiseria/ingresoRemiseria';
import RenovacionAgencia from './Remiseria/RenovacionAgencia';


export default class MenuPrincipal extends Component{
    constructor(props){
        super(props);
        this.state={
            menues:{
            },
            categoria:'',
            actual:null,
        }
    }

    render(){
        let vista = <div>
            <Typography>Bienvenido</Typography>
            <Typography>Sobre que tipo de organismo desea operar?</Typography>
            <Button onClick={()=>this.setState({categoria:'agencias'})}>Agencias</Button>
            <Button disabled>Transporte Escolar</Button>
        </div>


        if(this.state.categoria === 'agencias'){
            vista = <div>
                <Typography>¿Que desea tramitar?</Typography>
        <Button onClick={()=>this.setState({actual:<IngresarAgencia/>})}>Nueva Agencia</Button>
                <Button onClick={()=>this.setState({actual:<RenovacionAgencia/>})}>Renovación de Vencimiento de Agencia</Button>
                <Button>Modificación de Socios</Button>
                <Button>Nuevo Apoderado o cambio de Apoderado</Button>
                <Button>Cambio de Titulares de una Agencia</Button>
                <Button>Cambio de Domicilio de una Agencia</Button>
            </div>
        }
        if(this.state.actual !== null){
            vista = <div>
                    <IconButton onClick={()=>this.setState({actual:null,categoria:''})}><Home/></IconButton>
                    {this.state.actual}
            </div>
        }

        return(<Paper>

            {vista}
        </Paper>)
    }
}