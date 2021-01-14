import React,{Component} from 'react';
import {TextField,Button,Typography,Table,
TableBody,TableHead,TableRow,TableCell,Input} from '@material-ui/core';
import DBHandler from '../DbHandler';

export default class ListarPersonas extends Component{

    constructor(props){
        super(props);
        this.state = {
            vehiculos:[],
            seleccionado:'',

        }
        this.devolverSeleccionado = props.devolverSeleccionado //funcion que se triggerea al seleccionar una persona
        this.db = new DBHandler();
        this.db.pedirVehiculos(this.recibirVehiculos.bind(this))
    }


    elegirVehiculo(id){
        
        if(this.devolverSeleccionado !== undefined &&
             this.devolverSeleccionado !== null){
            this.devolverSeleccionado(id)
        }
    }


    recibirVehiculos(datos){
        this.setState({
            vehiculos:datos
        },()=>this.filtrar.bind(this)(datos,''))
    }

    filtrar(datos,filtro){
        let finales = [];
        for(let x = 0; x < datos.length; x++){
            finales.push(<TableRow
                onClick={()=>this.elegirVehiculo.bind(this)(datos[x].id)}
            >
                <TableCell>
                    {datos[x].dominio}
                </TableCell>
                <TableCell>
                    {datos[x].marca}
                </TableCell>
                <TableCell>
                    {datos[x].modelo}
                </TableCell>
                <TableCell>
                    {datos[x].anio}
                </TableCell>
            </TableRow>)
        }
        this.setState({filtrados:finales})
    }

    render(){
        return(<div>
            <div>
                <Typography variant='h5'>Listado de Vehiculos</Typography><br/>
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
                                Dominio
                            </TableCell>
                            <TableCell>
                                Marca
                            </TableCell>
                            <TableCell>
                                Modelo
                            </TableCell>
                            <TableCell>
                                Año
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