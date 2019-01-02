import React,{Component} from 'react';
import {Button,TextField,Paper} from '@material-ui/core';


export default class Principal extends Component{
    constructor(props){
        super(props);
        this.state={
            campos:props.campos, //{dic{campo,variable,tipo,variantes,valor}}- variantes={valor,codigo}
        }
        this.funGuardar = props.funGuardar;
        this.funHabilitar = props.habilitar;
        this.actualizarValor = props.actualizarValor;
    }

    componentWillReceiveProps(props){
        this.setState({
            campos:props.campos,
        })
        this.funGuardar = props.funGuardar;
        this.funHabilitar = props.funHabilitar;
        this.actualizarValor = props.actualizarValor;
    }

    armarCampo(campo){
        let input = null;
        let tipo = campo.tipo;
        if(tipo == "texto" ){
            input = <TextField value={campo.valor}  ></TextField>
        }
    }

    armarCampos(){
        let campos = this.state.campos;
        if(campos.length === 0){
            return null;
        }

        let variables = [];
        for (let x = 0; x < campos.length; x++){
            
        }
    }

    render(){
        return( 
            <dir>
                <Paper>
                    <div>
                        {}
                    </div>
                    <Button variant="contained" color="primary" >Guardar</Button>
                </Paper>
            </dir>
        )
    }


}