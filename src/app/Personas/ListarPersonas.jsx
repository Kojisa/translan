import React,{Component} from 'react';
import {TextField,Button,Table,TableHead,TableBody,
TableCell,TableRow} from '@material-ui/core';
import DBHandler from '../DbHandler';


export default class ListarPersonas extends Component{

    constructor(props){
        super(props);
        this.state = {
            personas:[],
            seleccionado:'',

        }
        this.devolverSeleccionado = props.devolverSeleccionado //funcion que se triggerea al seleccionar una persona
        this.db = new DBHandler();
        this.db.pedirPersonas(this.recibirPersonas.bind(this))
    }


    elegirPersona(id){
        
        if(this.devolverSeleccionado !== undefined &&
             this.devolverSeleccionado !== null){
            this.devolverSeleccionado(id)
        }
    }


    recibirPersonas(datos){
        this.setState({
            personas:datos
        },()=>this.filtrar.bind(this)(datos,''))
    }

    filtrar(datos,filtro){
        let finales = [];
        for(let x = 0; x < datos.length; x++){
            finales.push(<TableRow
                onClick={()=>this.elegirPersona.bind(this)(datos[x].id)}
            >
                <TableCell>
                    {datos[x].nombre}
                </TableCell>
                <TableCell>
                    {datos[x].dni}
                </TableCell>
                <TableCell>
                    {datos[x].cuit}
                </TableCell>
                <TableCell>
                    {datos[x].conductor === 1? 'Habilitado':'No habilitado'}
                </TableCell>
            </TableRow>)
        }
        this.setState({filtrados:finales})
    }

    render(){
        return(<div>
            <div>
                <div>
                    <TextField
                        value={this.state.filtro} label='Busqueda'
                        onChange={(ev)=>this.setState({filtro:ev.target.value})}
                        size='small' variant='outlined' style={{marginBottom:'5px'}}
                    >
                    </TextField>
                </div>
                <Table stickyHeader size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nombre
                            </TableCell>
                            <TableCell>
                                DNI
                            </TableCell>
                            <TableCell>
                                CUIT
                            </TableCell>
                            <TableCell>
                                Conductor
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.filtrados}
                    </TableBody>
                </Table>
            </div>
        </div>)
    }


}