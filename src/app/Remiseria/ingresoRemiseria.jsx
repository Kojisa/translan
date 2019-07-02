import React,{Component} from 'react';
import {TextField,Checkbox,Button,Fab,
Select,FormControl,InputLabel, Menu, MenuItem} from '@material-ui/core';




export default class AMBRemiserias extends Component{
    constructor(props){
        super(props);
        this.state={
            nombre:'',
            tipoPersona:'',
            tiposPersonas:[
                <MenuItem value='Fisica'></MenuItem>,
                <MenuItem value=''></MenuItem>
            ],
            dni:'',
            cuit:'',
            domicilios:[
                {calle:'',altura:'',dpto:'',localidad:'',tipo:'Legal'},
                {calle:'',altura:'',dpto:'',localidad:'',tipo:'Remiseria'},
            ],
            ubicaciones:[
                {calle:'',altura:'',dpto:'',localidad:'',tipo:'Casa Central'},
                {calle:'',altura:'',dpto:'',localidad:'',tipo:''},
            ],
            tiposUbicaciones:[
                <MenuItem value='Sucursal'>Sucursal</MenuItem>,
                <MenuItem value='Domicilio'>Domiciolio</MenuItem>
            ],
            fechaInicio:'',
            socios:[
                //{id:'',rol:''} //placeholder
            ],
            vehiculos:[
            ],
            conductores:[
            ],
            etapa:0
        }
    }


    siguiente(){
        this.setState({etapa:this.state.etapa+1})
    }

    anterior(){
        if(this.state.etapa === 0){
            return;
        }
        this.setState({etapa:this.state.etapa-1});
    }






    render(){

        let muestra = null;
        if(this.state.etapa === 0){
            muestra = <IngresoInicial
                nombre={this.state.nombre} tipo={this.state.tipo}
                dni={this.state.dni} cuit={this.state.cuit}
            ></IngresoInicial>
        }


        return(<div>

        </div>)
    }
}


class IngresoInicial extends Component{
    constructor(props){
        super(props);
        this.state={
            nombre:props.nombre,
            tipo:props.tipo,
            dni:props.dni,
            cuit:props.cuit,
        }
        this.actualizarDatos = props.funAct
    }

    componentWillReceiveProps(props){
        this.setState({
            nombre:props.nombre,
            tipo:props.tipo,
            dni:props.dni,
            cuit:props.cuit
        })
    }

    render(){
        return(<div>
            TextField
        </div>)
    }
}