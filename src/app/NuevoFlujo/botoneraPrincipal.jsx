import React,{Component} from 'react';
import {Button,Paper,Typography,ButtonGroup} from '@material-ui/core';



export default class BotoneraPrincipal extends Component{
    constructor(props){
        super(props);
        this.state = {
            usuario:props.usuario,
            permisos:props.permisos,
        }
    }


    render(){
        return(
            <Paper>
                <Typography>
                    Seleccione tipo de operacion a realizar
                </Typography>
                <ButtonGroup>
                    <Button>
                        Iniciar un tramite
                    </Button>
                    <Button>
                        Continuar un tramite
                    </Button>
                    <Button>
                        Consultar tramites
                    </Button>
                    <Button>
                        Consultar estados
                    </Button>
                </ButtonGroup>

                
                
            </Paper>
        )
    }
}