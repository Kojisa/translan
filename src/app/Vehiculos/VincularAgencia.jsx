import React,{Component} from 'react';
import {TextField,Button,Typography,Table,
TableBody,TableHead,TableRow,TableCell,Input} from '@material-ui/core';
import DBHandler from '../DbHandler';


export default class VincularAgencia extends Component{
    constructor(props){
        super(props);
        this.state={
            agencias:[],
            filtroNombre:'',
            filtroCuit:'',
            filtroEstado:-1,
            filtrados:[],
            seleccion:null,
            datosSeleccion:{},
            archivo:'',
            idarchivo:null,
            vehiculo:props.vehiculo

        }
        this.funHome = props.funHome;
        this.funCambio = props.funCambio;
        this.funSelect = props.funSeleccion;
        this.db = new DBHandler();
        this.db.pedirAgencias(this.recibirAgencias.bind(this))
        
    }


    subirArchivo(){
        let fecha = new Date();
        let datos={
            idvinculo:this.state.vehiculo,
            tipovinculo:'Vehiculo',
            tipo:'Certificado Agencia',
            nombre:fecha.toISOString() + this.state.vehiculo.toString(),
        }
        this.db.enviarArchivo(this.state.archivo,datos,(info)=>this.setState({idarchivo:info.archivo}))
    }


    recibirAgencias(datos){
        console.log(datos)
        this.setState({
                agencias:datos,
                filtroNombre:'',
                filtroCuit:'',
                filtroEstado:-1
            },
            ()=>this.filtrar.bind(this)(datos,'','',''))
    }

    filtrar(agencias,filtroNombre,filtroCuit,filtroEstado){
        let finales = [];
        for (let x = 0; x < agencias.length;  x++){
            let nomFan = agencias[x].nombrefantasia;
            let cuit = agencias[x].cuit;
            let habilitada = agencias[x].habilitada;
            finales.push(<TableRow onClick={()=>this.setState({seleccion:agencias[x].id,
            datosSeleccion:agencias[x]})
                    }>
                <TableCell>{nomFan}</TableCell>
                <TableCell>{cuit}</TableCell>
                <TableCell>{habilitada === 1? 'Habilitada' : 'No habilitada'}</TableCell>
            </TableRow>)
        }
        this.setState({filtrados:finales})
        console.log(finales)
    }
    

    render(){

        let vista = null;

        if(this.state.seleccion === null){
            vista = 
                <div>
                    <Typography variant='h5'>Seleccione una Agencia</Typography>
                    <Table
                        stickyHeader size='small'
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre de Fantasia</TableCell>
                                <TableCell>CUIT</TableCell>
                                <TableCell>Habilitada</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.filtrados}
                        </TableBody>
                    </Table>
                    </div>
        }
        else{
            vista =<div>
                        <Typography variant={'h6'} style={{marginTop:'10px',marginTop:'10px'}}
                            >Agencia Seleccionada: {this.state.datosSeleccion.nombrefantasia}
                        </Typography><br/>
                        <Button onClick={()=>this.setState({seleccion:null,datosSeleccion:{}})}
                            color='primary' variant='outlined'
                        > Volver a Seleccionar</Button>
                        <Typography>Certificado de Agencia: </Typography>  
                        <Input type='file' disable={this.state.enviando || (this.state.archivo === '')} size='small'
                        onChange={(ev)=>this.setState({archivo:ev.target.files[0],idarchivo:''})}></Input><br/>
                        <Button onClick={this.subirArchivo.bind(this)} disabled={this.state.archivo === '' || this.state.idarchivo === null}>
                            {this.state.idArchivo === '' ?  'Subir Archivo':'Archivo subido' }</Button>
                        <br/>
                        <Button onChange={()=>this.vincular.bind(this)()}>Vincular</Button>
                    </div>
        }



        return(
            <div>
                <Typography variant='h4'>Vincular Agencia</Typography>
                {vista}
                <Button onClick={()=>this.funHome()}>Finalizar</Button>
                <Button> </Button>
            </div>
        )
    }
}