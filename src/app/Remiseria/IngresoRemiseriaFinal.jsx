import React,{Component} from 'react';
import {TextField,Typography,Paper,Select,MenuItem,Button} from '@material-ui/core';
import DBHandler from '../DbHandler';
import CargaHabilitacion from './CargarCertificadoHabilitacion';



export default class Remiseria extends Component{

    constructor(props){
        super(props);
        this.state={
            agencia:{
                nombreFantasia:'',
                cuit:'',
            },
            casaCentral:{
                calle:'',
                altura:'',
                dpto:'',
                localidad:''
            },
            titular:{
                nombre:'',
                apellido:'',
                dni:'',
                cuit:'',
                fechanacimiento:'',
                nacionalidad:'',
            },
            domicilios:[
            ],
            enviando:false,
        }
        this.home = props.funHome;
        this.cambio = props.funCambio;//funcion que cambia la vista principal
        this.db = new DBHandler();
    }

    pasarDePantalla(fun){
        this.db.ingresarRemiseria({
            agencia:this.state.agencia,
            casaCentral:this.state.casaCentral
        },fun)
    }

    funcionCarga(info){
        let vista = <CargaHabilitacion
                        funHome={this.home}
                        funCambio={this.cambio}
                        agencia={info.agencia}
                        razonSocial={this.state.agencia.nombreFantasia}
                    />;
        this.cambio(vista,'Habilitacion de Remiseria');
    }


    render(){
        console.log(this.state.agencia)
        return(
            <div style={{height:'100%',width:'100%'}}>
                <Agencia
                    agencia={this.state.agencia} casaCentral={this.state.casaCentral}
                    funAct={(val,tipo)=>this.setState({[tipo]:val})}
                />
                <div >
                    <Button>Cancelar</Button>
                    
                    <Button onClick={()=>this.pasarDePantalla.bind(this)(this.home)}  
                    >Terminar</Button>
                    
                    <Button 
                    onClick={()=>this.pasarDePantalla.bind(this)(this.funcionCarga.bind(this))}
                    >Habilitar</Button>
                </div>
            </div>
        )
    }
}



class Agencia extends Component{

    constructor(props){
        super(props);
        this.state={
            nombreFantasia:props.agencia.nombreFantasia,
            cuit:props.agencia.cuit,
            casaCentral:props.casaCentral,
        }
        this.funAct = props.funAct;
    }


    componentWillReceiveProps(props){
        this.setState({
            nombreFantasia:props.agencia.nombreFantasia,
            cuit:props.agencia.cuit,
            casaCentral:props.casaCentral,
        })
    }

    actualizar(val,campo){
        let dic={
            nombreFantasia:this.state.nombreFantasia,
            cuit:this.state.cuit
        }
        dic[campo] = val
        this.funAct(dic,'agencia')
    }
    
    actualizarDireccion(val,campo){
        let dic = this.state.casaCentral;
        dic[campo] = val;

        this.funAct(dic,'casaCentral');
    }

    render(){
        return(
            <div style={{textAlign:'center'}}>
                <div style={{flexDirection:'column'}}>
                    <Typography variant='h5' style={{marginBottom:'10px'}}>Ingreso de Agencia</Typography>
                    <TextField style={{marginBottom:'10px'}} size='small'
                        label='Razon Social' variant='outlined' 
                        onChange={(ev)=>this.actualizar.bind(this)(ev.target.value,'nombreFantasia')}
                    ></TextField><br/>
                    <TextField  size='small'
                        label='Cuit' variant='outlined'
                        onChange={(ev)=>this.actualizar.bind(this)(ev.target.value,'cuit')}
                    >
                    </TextField>
                </div>
                <div style={{'marginTop':'10px'}}>
                    <Typography variant='h5'>Casa Central </Typography>
                    <TextField label='Calle' size='small' variant='outlined'
                        onChange={(ev)=>this.actualizarDireccion.bind(this)(ev.target.value,'calle')}
                    ></TextField>
                    <TextField
                        label='Altura' size='small' variant='outlined'
                        onChange={(ev)=>this.actualizarDireccion.bind(this)(ev.target.value,'altura')}
                    ></TextField>
                    <TextField
                        label='Dpto' size='small' variant='outlined'
                        onChange={(ev)=>this.actualizarDireccion.bind(this)(ev.target.value,'dpto')}
                    ></TextField><br/>
                    <TextField
                        label='Localidad' size='small' variant='outlined'
                        onChange={(ev)=>this.actualizarDireccion.bind(this)(ev.target.value,'localidad')}
                    ></TextField>
                </div>
            </div>
        )
    }
}