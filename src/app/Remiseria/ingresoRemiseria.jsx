import React,{Component} from 'react';
import {TextField,Checkbox,Button,Fab,
Select,FormControl,InputLabel, Menu, 
MenuItem, Typography,Dialog,DialogContent,
DialogTitle,DialogActions} from '@material-ui/core';
import Direcciones from '../Utils/Direcciones';
import Add from '@material-ui/icons/Add';



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
                {
                    nombre:'',
                    apellido:'',
                    dni:'',
                    tipoDni:'',
                    cuit:'',
                    calle:'',
                    altura:'',
                    dpto:'',
                    localidad:'',
                    rol:'',
                }
            ],
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
        }


        return(<div>

        </div>)
    }
}

class IngresoSocios extends Component{
    constructor(props){
        super(props);
        this.state = {
            socios:props.socios,
            roles:props.roles,
            popUp:false,
        }
        this.actualizarDatos = props.funAct;
    }

    componentWillReceiveProps(props){
        this.setState({
            socios:props.socios,
            roles:props.roles
        })
    }

    cargarPopUp(){
        this.setState({popUp:true});
    }

    guardarSocio(datos){
        let socios = this.state.socios;
        socios.push(datos);
        this.actualizarDatos({socios:socios});
    }


    render(){



        return (<div>
                    <div>
                        <Typography>Socios</Typography>
                        <Fab color='primary' onClick={
                            this.cargarPopUp.bind(this)
                        } 
                            style={{paddingLeft:'40px'}}
                        > 
                            <Add/>
                        </Fab>
                    </div>
                    {this.state.socios.map((elem,ind)=><div>
                        <Typography>{elem.nombre + ' ' + elem.apellido} - Vinculo: {elem.rol}</Typography>
                    </div>)}
                    <Dialog
                        open={this.state.popUp}
                        guardarSocio={this.guardarSocio.bind(this)}
                    >
                        <DialogTitle>Generar Nuevo Socio</DialogTitle>
                        <DialogContent>
                            
                        </DialogContent>
                    </Dialog>
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
        this.actualizarDatos = props.funAct
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

