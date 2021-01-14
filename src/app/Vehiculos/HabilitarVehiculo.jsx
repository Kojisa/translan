import React,{Component} from 'react';
import {TextField,Button,Table,TableHead,TableBody,
TableCell,TableRow,Typography,Input} from '@material-ui/core';
import DBHandler from '../DbHandler';


export default class HabilitarVehiculo extends Component{
    constructor(props){
        super(props);
        this.state = {
            archivos:{
                seguro:{
                    archivo:'',
                    idarchivo:null,
                    enviando:false
                },
                vtv:{
                    archivo:'',
                    idarchivo:null,
                    enviando:false
                },
                gnc:{
                    archivo:'',
                    idarchivo:null,
                    enviando:false
                }
            },
            vehiculo:props.vehiculo,
        };
        this.db = new DBHandler();
    }

    actualizarArchivos(clave,archivo){
        let dic = this.state.archivos;
        dic[clave].archivo  = archivo;
        dic[clave].idarchivo = null;

        this.setState({archivos:dic})
    }


    enviarArchivo(tipo){
        let fecha = new Date();
        let vehiculo = this.state.vehiculo;
        
    }

    render(){






        return(<div>
                <div>
                    <Typography>Póliza de Seguro con la categoría de Remis: </Typography>  
                    <Input type='file' disable={this.state.archivos.seguro.enviando || (this.state.archivos.seguro.archivo === '')} size='small'
                    onChange={(ev)=>this.actualizarArchivos.bind(this)('seguro',ev.target.files[0])}></Input><br/>
                    <Button onClick={()=>this.subirArchivo.bind(this)('seguro')} disabled={this.state.archivos.seguro.archivo === '' || this.state.archivos.seguro.idarchivo === null}>
                        {this.state.archivos.seguro.idarchivo === '' ?  'Subir Archivo':'Archivo subido' }</Button>
                    <br/>
                    <Typography>VTV como Remis: </Typography>  
                    <Input type='file' disable={this.state.archivos.vtv.enviando || (this.state.archivos.vtv.archivo === '')} size='small'
                    onChange={(ev)=>this.actualizarArchivos.bind(this)('vtv',ev.target.files[0])}></Input><br/>
                    <Button onClick={()=>this.subirArchivo.bind(this)('vtv')} disabled={this.state.archivos.vtv.archivo === '' || this.state.archivos.vtv.idarchivo === null}>
                        {this.state.archivos.vtv.idarchivo === '' ?  'Subir Archivo':'Archivo subido' }</Button>
                    <br/>
                    <Typography>Certofocadp GNC: </Typography>  
                    <Input type='file' disable={this.state.archivos.gnc.enviando || (this.state.archivos.gnc.archivo === '')} size='small'
                    onChange={(ev)=>this.actualizarArchivos.bind(this)('gnc',ev.target.files[0])}></Input><br/>
                    <Button onClick={()=>this.subirArchivo.bind(this)('gnc')} disabled={this.state.archivos.gnc.archivo === '' || this.state.archivos.gnc.idarchivo === null}>
                        {this.state.archivos.gnc.idarchivo === '' ?  'Subir Archivo':'Archivo subido' }</Button>
                    <br/>
                    
                </div>
        </div>)
    }
}