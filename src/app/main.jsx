import React,{Component} from 'react';
import {TextField,IconButton,Input} from '@material-ui/core';

let MAXBOTONESFILA = 3
let MAXTAMBOTONES = '200px'
let TAMBOTONES = '20wv'

class Botonera extends Component{

    

    //recibe por props una lista de botones permitidos por el usuario
    //recibe una funcion que setea la vista que sea clickeada.
    constructor(props){
        super(props);
        this.state = {
            botones:props.botones //{nombre,icono,vista}
        }
        this.funVista = props.actVista;
        this.armarBotones = this.armarBotones.bind(this);
    }

    armarBotones(){
        let lista = [];
        this.state.botones.map((elem,index)=>{
            lista.push(<Input id={elem.nombre} onClick={()=>this.funVista(elem.vista)}></Input>)
            lista.push(<label htmlFor={elem.nombre}></label>)
            lista.push(<IconButton key={index}>
                {elem.icono}
            </IconButton>)
        })

        return lista
    }

    render(){

        return(
            <div>
                {this.armarBotones()}
            </div>
        )
    }

}