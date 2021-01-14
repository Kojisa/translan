import React,{Component} from 'react';
import {Button,TextField,Typography,Input} from '@material-ui/core';
import DBHandler from '../DbHandler';



export default class HabilitarConductor extends Component{
    constructor(props){
        super(props);
        this.state={
            persona:props.persona,
            archivo:'',
            idarchivo:null,
            subiendo:false,
            vencimiento:'',
            datosPersona:{},
            sinHeader:props.sinHeader === undefined? false:props.sinHeader,
        }
        this.devolverCompletado = props.devolverCompletado;
        this.db = new DBHandler();
        
    }

    subirHabilitacion(){
        let datos = {
            persona:this.state.persona,
            archivo:this.state.idarchivo,
            vencimiento:this.state.vencimiento,
        }

        this.db.enviarHabilitacionConductor((datos)=>this.devolverCompletado(datos.habilitacion),datos)
    }
    

    subirArchivo(){
        let fecha = new Date();
        let persona = this.state.persona;
        let datos = {
            idvinculo:persona,
            tipovinculante:'Persona',
            tipo:'Licencia Conducir',
            nombre:fecha.toISOString() + persona.toString(),
        }
        this.db.enviarArchivo(this.state.archivo,datos,(info)=>this.setState({idarchivo:info.archivo}))
    }


    render(){
        return(
            <div>
                {this.state.sinHeader === true? null: <Typography>Habilitar Conductor</Typography>}
                <br/>
                {this.state.sinHeader === true? null: <Typography>Conductor seleccionado: {this.state.datosPersona.apellido + ' ' + this.state.datosPersona.nombre}</Typography>}
                <br/>
                <Typography>Licencia de Conducir: </Typography>  
                <Input type='file' disable={this.state.enviando || (this.state.archivo === '')} size='small'
                onChange={(ev)=>this.setState({archivo:ev.target.files[0],idarchivo:''})}></Input><br/>
                <Button onClick={this.subirArchivo.bind(this)} disabled={this.state.archivo === '' || this.state.idarchivo === null}>
                    {this.state.idArchivo === '' ?  'Subir Archivo':'Archivo subido' }</Button>
                <br/>
                <TextField label='Fecha de Vencimiento' type='date' size='small' variant='outlined'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(ev)=>this.setState({vencimiento:ev.target.value})}
                ></TextField>
                <br/>
                <Button onClick={()=>this.subirHabilitacion.bind(this)()}
                    disabled={this.state.idarchivo === '' || this.state.vencimiento === ''}
                >Guardar</Button>
            </div>
        )
    }

}
