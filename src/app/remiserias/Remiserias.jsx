import React,{Component} from 'react';
import {List,ListItem} from '@material-ui/core';




export default class Principal extends Component{

    constructor(props){
        super(props);
        this.state = {
            remiserias:[],
            seleccionada:null,
        }
    }
}
