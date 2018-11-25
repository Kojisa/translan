import React,{Component} from 'react';
import {TextField} from '@materia-ui/core';



class Principal extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            documentacionConfirmada:false,
        }
    }

    render(){

        let popUp = null;
        if(this.state.documentacionConfirmada === false){
            popUp = null; //poner objeto popup
        }


        return(
            <div>
                {popUp}
                <div>

                </div>
            </div>
        )
    }
}

class AMB extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            nombreFantasia:'',
            cuit:'',
            calle:'',
            altura:'',
            mail:'',
            telefono:'',
            responsable:'',
            cuitResponsable:'',

        }
    }

    generarCampos(){
        let campos = [
            {'campo':'Nombre de Fantasia','variable':'nombreFantasia'},
            {'campo':'CUIT','variable':'cuit'},
            {'campo':'Calle','variable':'calle'},
            {'campo':'Altura','variable':'altura'},
            {'campo':'Correo','variable':'mail'},
            {'campo':'Telefono','variable':'telefono'},
            {'campo':'Representante','variable':'representante'},
            {'campo':'CUIT del Representante','variable':'cuitResponsable'},
        ]

        let objetos = campos.map((elem,ind)=><TextField 
            value={this.state[elem.variable]}
            onChange={(val)=>this.setState({[elem.variable]:val})}
            floating
        />
        )

        
    }


    render(){

        return (
            <div>
            </div>
        )
    }
}