import React,{Component} from 'react';
import {TextField,Button,Paper,Typography,
AppBar,Toolbar} from '@material-ui/core';




export default class Principal extends Component{
    constructor(props){
        super(props);
        this.state={
            actual:null,
            titulo:null,
            cola:[],//por si quiero guardar un recorrido y volver a secciones previas
        }
    }

    render(){
        return(<div>
            <AppBar
                position='static'
                
            >
                <Toolbar>
                    <Typography>
                        {this.state.titulo}
                    </Typography>
                </Toolbar>
            </AppBar>
            {this.state.actual}
        </div>)
    }
}