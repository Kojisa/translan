import React,{Component} from 'react';
import {FormControlLabel,Switch,Button,IconButton,
     Typography} from '@material-ui/core';
import ListadoSelectivo from '../Utils/ListadoSelectivo';
import FingerIcon from '@material-ui/icons/Fingerprint';

export default class ModificacionSocios extends Component{
    constructor(props){
        super(props);
        this.state = {
            agencias:[
                {Numero:'1',Nombre:'Remiseria Uno',Socios:'5'},
                {Numero:'2',Nombre:'Remiseria Lanus',Socios:'4'},
                {Numero:'3',Nombre:'La plaza',Socios:'7'},
            ],
            socios:[
                {Nombre:'Juan Perez',Dni:'25184348',tipo:'Socio'},
                {Nombre:'Axel Sanabria',Dni:'31924821',tipo:'Gerente'},
                {Nombre:'Sebastian Mansilla',Dni:'24094819',tipo:'Presidente'}
            ],
            nuevosSocios:[],
            elegidosEliminar:[],
            etapa:0,
            agencia:'',
        }
    }

    render(){

        let muestra= <ListadoSelectivo
            listado={this.state.agencias}
            campos={['Numero','Nombre','Socios']}
            funAct={(datos)=>{
                this.setState({agencia:datos})}}
        ></ListadoSelectivo>
        console.log(this.state.agencia)
        if(this.state.agencia !== '' && this.state.etapa === 0){
            muestra = <ListadoSelectivo 
                listado={this.state.socios}
                campos={['Nombre','Dni','tipo']}
                funAct={(datos)=>this.setState({
                    etapa:1,elegidosEliminar:datos
                })}
                multiSelect={true}
            ></ListadoSelectivo>
        }


        return(
            <div>
                {muestra}
            </div>
        )
    }
}