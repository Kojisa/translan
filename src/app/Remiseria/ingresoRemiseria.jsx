import React,{Component} from 'react';
import {TextField,Checkbox,Button,Fab,
Select,FormControl,InputLabel, Menu,Table,TableRow,TableCell,TableBody,
MenuItem, Typography,Dialog,DialogContent,
DialogTitle,DialogActions} from '@material-ui/core';
import Direcciones from '../Utils/Direcciones';
import Add from '@material-ui/icons/Add';
import IngresarPersona from '../Personas/IngresarPersona';
import IngresoVehiculos from './Vehiculos';
import IngresoSocios from './Socios';
import IngresoVehiculo from '../Vehiculos/IngresarVehiculos';
import ListadoSelectivo from '../Utils/ListadoSelectivo';
import IngresoChoferes from './Choferes';



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
                <MenuItem value='Casa Central'>Casa Central</MenuItem>,
                <MenuItem value='Domicilio'>Domicilio</MenuItem>
            ],
            fechaInicio:'',
            socios:[
            ],
            certificadosAntecedentesSocios:[],
            rolesSocios:[
                <MenuItem value='Presidente'>Presidente</MenuItem>,
                <MenuItem value='Socio Gerente'>Socio Gerente</MenuItem>,
                <MenuItem value='Socio'>Socio</MenuItem>,
                <MenuItem value='Apoderado'>Apoderado</MenuItem>,
                <MenuItem value='Director'>Director</MenuItem>,
            ],
            vehiculos:[
            ],
            conductores:[
            ],
            etapa:0
        }
    }


    siguiente(){
        
        if(this.state.etapa === 4){
            return;
        }
        this.setState({etapa:this.state.etapa+1})
        
    }

    anterior(){
        if(this.state.etapa === 0){
            return;
        }
        this.setState({etapa:this.state.etapa-1});
    }


    actualizarValores(dic){
        this.setState(dic);
    }


    render(){

        let muestra = null;
        if(this.state.etapa === 0){
            muestra = <IngresoInicial
                nombre={this.state.nombre} tipo={this.state.tipo}
                dni={this.state.dni} cuit={this.state.cuit}
                fechaInicio={this.state.fechaInicio}
                funAct={this.actualizarValores.bind(this)}
            ></IngresoInicial>
        }
        if(this.state.etapa === 1){
            muestra = <div>
                <Typography>Domicilios</Typography>
                <Direcciones 
                domicilios={this.state.domicilios}
                tipos={[]}
                puedeBorrar={false}
                puedeAgregar={false}
                puedeEditar={false}
                funAct={(datos)=>this.actualizarValores.bind(this)({domicilios:datos})}
                ></Direcciones>
                <br/>
                <Typography>Casa Central y Sucursales</Typography>
                <Direcciones 
                domicilios={this.state.ubicaciones}
                tipos={this.state.tiposUbicaciones}
                puedeBorrar={true}
                puedeAgregar={true}
                puedeEditar={true}
                funAct={(datos)=>this.actualizarValores.bind(this)({ubicaciones:datos})}
                ></Direcciones>
            </div>
        }
        if(this.state.etapa === 2){
            
            muestra= <IngresoSocios 
                antecedentes={this.state.certificadosAntecedentesSocios}
                socios={this.state.socios}
                roles={this.state.rolesSocios}
                funAct={this.actualizarValores.bind(this)}
            ></IngresoSocios>
        }

        if(this.state.etapa === 3){
            muestra = <IngresoVehiculos
                vehiculos={this.state.vehiculos}
                funAct={this.actualizarValores.bind(this)}
            />
        }

        if(this.state.etapa === 4){
            muestra = <IngresoChoferes
                choferes={this.state.conductores}
                socios={this.state.socios}
                vehiculos={this.state.vehiculos}
                funAct={this.actualizarValores.bind(this)}
            ></IngresoChoferes>
        }


        return(<div>
            {muestra}
            <Button onClick={this.anterior.bind(this)} color='secondary' disabled={this.state.etapa === 0? true: false}>Anterior</Button>
            <Button onClick={this.siguiente.bind(this)} color='primary'>{this.state.etapa === 4? 'Finalizar':'Siguiente'}</Button>
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
            fechaInicio:props.fechaInicio,
        }
        this.actualizarDatos = props.funAct;
    }

    actualizarCampos(val,tipo){
        let estado = {
            nombre:this.state.nombre,
            tipo:this.state.tipo,
            dni:this.state.dni,
            cuit:this.state.cuit,
            fechaInicio:this.state.fechaInicio,
        }
        estado[tipo] = val;
        this.actualizarDatos(estado);
    }


    componentWillReceiveProps(props){
        this.setState({
            nombre:props.nombre,
            tipo:props.tipo,
            dni:props.dni,
            cuit:props.cuit,
            fechaInicio:props.fechaInicio,
        });
    }

    render(){
        return(<div>
            <TextField
                value={this.state.nombre} label='Nombre'
                onChange={(ev)=>this.actualizarCampos.bind(this)(ev.target.value,'nombre')}
            ></TextField>
            <TextField value={this.state.dni} label='DNI'
                onChange={(ev)=>this.actualizarCampos.bind(this)(ev.target.value,'dni')} />
            <TextField value={this.state.cuit} label='CUIT/CUIL'
                onChange={(ev)=>this.actualizarCampos.bind(this)(ev.target.value,'cuit')}/>
            <TextField
                value={this.state.fechaInicio} label='Fecha de Inicio del Tramite' type='date'
                onChange={(ev)=>this.actualizarCampos.bind(this)(ev.target.value,'fechaInicio')} />
        </div>)
    }
}

