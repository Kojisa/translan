import React,{Component} from 'react';
import {Input,Typography,Button,TextField} from '@material-ui/core';
import DBHandler from '../DbHandler';



export default class HabilitarRemiseria extends Component{

    constructor(props){
        super(props);
        this.state = {
            agencia:props.agencia,
            archivo:'',
            fecha:'',
            idArchivo:'', //quizas no se utilice
            razonSocial:props.razonSocial, //para mostrar un nombre y reconocer a quien se esta habilitando
            enviando:false,
            idHabilitacion:'',
        }
        this.db = new DBHandler();
        this.home = props.home;
        this.cambio = props.cambio;
    }

    componentWillReceiveProps(props){
        this.setState({
            agencia:props.agencia,
            razonSocial:props.razonSocial
        })
    }

    subirArchivo(){
        let fecha = new Date();
        let agencia = 2;
        let datos = {
            idvinculo:2,
            tipovinculante:'agencia',
            tipo:'Habilitacion',
            nombre:fecha.toISOString() + agencia.toString(),
        }
        this.db.enviarArchivo(this.state.archivo,datos,(info)=>this.setState({idArchivo:info.archivo}))
    }


    enviarHabilitacion(){
        
        let datos = {
            agencia:2,
            archivo:this.state.idArchivo,
            fecha:this.state.fecha,
        }
        this.db.enviarHabilitacionAgencia(datos,(info)=>{
            this.setState({enviando:false,idHabilitacion:info.habilitacion})
        })
        //armar la funcion para mandar los datos
    }

    render(){

        let vista = (
            <div>
                <Typography>Habilitacion de Agencia por Certificado</Typography>
                <br/>
                <br/>
                <br/>
                <Typography>Agencia Elegida: {this.state.razonSocial} </Typography>
                <br/>
                <br/>
                <br/>
                <div>
                    <Typography>Certificado: </Typography>  
                    <Input type='file' disable={this.state.enviando || (this.state.archivo === '')} size='small'
                    onChange={(ev)=>this.setState({archivo:ev.target.files[0],idArchivo:''})}></Input><br/>
                    <Button onClick={this.subirArchivo.bind(this)} >
                        {this.state.idArchivo === '' ?  'Subir Archivo':'Archivo subido' }</Button>
                </div>
                <br/>
                <br/>
                <Typography>Vencimiento de la habilitación:  </Typography>
                <TextField
                    InputLabelProps={{
                        shrink: true,
                    }} size='small'
                    type='date' variant='outlined' disabled={this.state.enviando}
                    onChange={(ev)=>this.setState({fecha:ev.target.value})}
                >
                </TextField>
                <Button onClick={()=>this.enviarHabilitacion.bind(this)()}
                    disabled={this.state.enviando || this.state.archivo === '' || this.state.fecha === '' || this.state.idArchivo === ''}
                >Confirmar</Button>
            </div>
        )

        if(this.state.idHabilitacion !== ''){

            vista = (
                <div>
                    <Typography>
                        Agencia Habilitada Correctamente
                    </Typography>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Button onClick={this.home}>Terminar</Button>
                </div>
            )
        }



        return(
            <div>
                {vista}
            </div>
        )
    }
}

