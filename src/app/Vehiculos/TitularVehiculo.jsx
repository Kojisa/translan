import React,{Component} from 'react';
import {TextField,Button,Typography,Paper,Input} from '@material-ui/core';
import DBHandler from '../DbHandler';
import ListarPersonas from '../Personas/ListarPersonas';
import AgregarPersona from '../Personas/IngresarPersona';
import HabilitarConductor from '../Personas/HabilitarCoductor';
import ConductoresVehiculo from './ConductoresVehiculo';




export default class TitularVehiculos extends Component{
    constructor(props){
        super(props);
        this.state = {
            vehiculo:props.vehiculo,
            seleccionado:null,
            nuevo:false,
            filtro:'',
            datosPersona:{},
            habilitarConductor:false,
            archivo:'',
            idarchivo:null,
            subiendo:false,
            finalizado:false,
        }
        this.db = new DBHandler();
        this.funHome = props.funHome;
        this.funCambio = props.funCambio;
        
    }

    elegirPersona(id){
        this.setState({
            seleccionado:id
        })
        this.db.pedirPersona((datos)=>this.setState({datosPersona:datos,HabilitarConductor:false}),{'persona':id})
    }

    subirArchivo(){

        let fecha = new Date();

        let datos = {
            idvinculo:this.state.vehiculo,
            tipovinculante:'Vehiculo',
            tipo:'Cedula Verde',
            nombre:fecha.toISOString() + this.state.vehiculo.toString(),
        }
        this.db.enviarArchivo(this.state.archivo,datos,(info)=>this.setState({idarchivo:info.archivo}))
    }


    guardarTitular(fun){

        let datos ={
            persona:this.state.seleccionado,
            vehiculo:this.state.vehiculo,
            archivo:this.state.idarchivo,
        }
        this.db.agregarTitular(datos,fun)
    }


    render(){

        let vista = null;
        if(this.state.nuevo === false){
            vista = <ListarPersonas devolverSeleccionado={this.elegirPersona.bind(this)} ></ListarPersonas>
        }
        if(this.state.nuevo === true){
            vista = <AgregarPersona devolverCreado={this.elegirPersona.bind(this)}></AgregarPersona>
        }
        let seleccion = null;
        if(this.state.seleccionado === null){
            seleccion = <div>
                <Paper>
                    <Typography variant='h6'>Seleccionar Titular</Typography>
                    <Button onClick = {()=>this.setState({nuevo:!this.state.nuevo})} color='primary'
                        variant='outlined' style={{marginBottom:'10px'}}
                    >
                        {this.state.nuevo === false  ? 'Crear Nuevo' : 'Seleccionar existente'}</Button>
                </Paper>
                {vista}
                
            </div>
        }
        else{

            let documentacionVinculo= null;
            if(this.state.datosPersona.conductor === 1){
                documentacionVinculo = (<div>
                    <Typography>Cedula Verde: </Typography>  
                    <Input type='file' disable={this.state.enviando || (this.state.archivo === '')}
                        style={{borderBottom:'10px'}}
                    size='small'
                    onChange={(ev)=>this.setState({archivo:ev.target.files[0],idarchivo:null})}></Input><br/>
                    <Button onClick={this.subirArchivo.bind(this)} 
                        color='primary' variant='outlined'
                    disabled={this.state.archivo === '' || this.state.idarchivo !== null}>
                        {this.state.idarchivo === null ?  'Subir Archivo':'Archivo subido' }</Button>
                <br/>
                <Button onClick={()=>this.guardarTitular.bind(this)(()=>this.setState({finalizado:true}))}>Guardar Titular</Button>
                </div>)
            }


            seleccion = <Paper>
                <div>
                    <Typography variant='h6'> <b>Persona Seleccionada: </b> {this.state.datosPersona.apellido + ' ' +  this.state.datosPersona.nombre}</Typography>
                    <Button onClick={()=>this.setState({seleccionado:null,datosPersona:{}})} color='primary'
                        variant='outlined'
                    >Volver a Seleccionar</Button>
                </div>
                {this.state.datosPersona.conductor === 1? 
                <div>
                    <Typography>El Titular seleccionado esta habilitado para conducir</Typography>
                    <br/>
                    {documentacionVinculo}
                </div>
                :
                <div>
                    <Typography>El Titular seleccionado no esta habilitado para conducir</Typography>
                    <Button onClick={()=>this.setState({habilitarConductor:!this.state.habilitarConductor})}>Habilitar como Conductor</Button>
                    {this.state.habilitarConductor === false? null: <HabilitarConductor 
                        sinHeader={true} persona={this.state.seleccionado}
                    devolverCompletado={()=>this.db.pedirPersona((datos)=>this.setState({datosPersona:datos,habilitarConductor:false}),{'persona':this.state.seleccionado})}/>}
                </div>}
                
            
            </Paper>
        }

        if(this.state.finalizado === true){
            seleccion=(
                <div>
                    <Typography variant='h5'>
                        Titular Correctamente Agregado
                    </Typography>

                    <Button onClick={()=>this.funHome()}>Terminar</Button>
                    <Button onClick={()=>this.funCambio(<ConductoresVehiculo 
                        funCambio={this.funCambio} funHome={this.funHome}
                        vehiculo={2}
                    />)}>Asignar Conductor</Button>

                </div>
            )
        }

        




        return (<div>
            <Typography variant='h4'>Asignar Titular</Typography>
            <br/>
            <br/>
            {seleccion}
            <br/>
            
        </div>)
    }


}