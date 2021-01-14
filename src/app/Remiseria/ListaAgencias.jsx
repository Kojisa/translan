import React,{Component} from 'react';
import {Table,TableBody,TableHead,TableRow,TableCell,
TextField} from '@material-ui/core';
import CargarHabilitacion from './CargarCertificadoHabilitacion';
import DBHandler from '../DbHandler';


export default class Listado extends Component{

    constructor(props){
        super(props);
        this.state={
            agencias:[],
            filtroNombre:'',
            filtroCuit:'',
            filtroEstado:-1,
            filtrados:[],
        }
        this.funHome = props.funHome;
        this.funCambio = props.funCambio;
        this.funSelect = props.funSeleccion;
        this.db = new DBHandler();
        this.db.pedirAgencias(this.recibirAgencias.bind(this))
        
    }


    recibirAgencias(datos){
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
            finales.push(<TableRow onClick={()=>
                    this.funCambio(
                    <CargarHabilitacion
                        agencia={agencias[x].id}
                        razonSocial={nomFan}
                        home={this.funHome}
                        cambio={this.funCambio}
                    />)}>
                <TableCell>{nomFan}</TableCell>
                <TableCell>{cuit}</TableCell>
                <TableCell>{habilitada === 1? 'Habilitada' : 'No habilitada'}</TableCell>
            </TableRow>)
        }
        this.setState({filtrados:finales})
        console.log(finales)
    }
    

    render(){
        return(
            <div>
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
        )
    }
}