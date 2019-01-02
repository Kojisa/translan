import React,{Component} from 'react';
import {Paper,Typography,IconButton} from '@material-ui/core';
import EditButton from "@material-ui/icons/Image/edit";


export default class Principal extends Component{
    constructor(props){
        super(props);
        this.state={
            datos:props.datos,
            campos:props.campos,
            equivalencias:props.equivalencias,
            modifica:props.modifica,
        }
        this.cambiarModifica = props.funModifica
    }

    componentWillReceiveProps(props){
        this.setState(
            {
                datos:props.datos,
                campos:props.campos,
                equivalencias:props.equivalencias,
                modifica:props.modifica,
            }
        )
    }

    armarCampos(){
        let datos = this.state.datos;
        let campos = this.state.campos;
        let equivalencias = this.state.equivalencias;

        let texto = campos.map((elem,ind)=><div>
            <Typography>{equivalencias[elem]}: </Typography>
            <Typography>{datos[elem]}</Typography>
        </div>)

        return texto
    }




    render(){

        let botonModifica = null;
        if(this.state.modifica){
            botonModifica = <IconButton>
                <EditButton/>
            </IconButton>
        }



        return(<div>
            <div style={{float:'right'}}>
                {botonModifica}
            </div>
            <br/>
            {this.armarCampos()}
            
        </div>)
    }
}