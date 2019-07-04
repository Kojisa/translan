import React,{Component} from 'react';
import {TextField,Checkbox,Button,Fab,
Select,FormControl,InputLabel, Menu,Table,TableRow,TableCell,TableBody,
MenuItem, Typography,Dialog,DialogContent,
DialogTitle,DialogActions} from '@material-ui/core';
import IngresoVehiculo from '../Vehiculos/IngresarVehiculos';

import Add from '@material-ui/icons/Add';




export default class IngresoVehiculos extends Component{
    constructor(props){
        super(props);
        this.state={
            vehiculos:props.vehiculos,
            popUp:false,
        }
        this.actualizarDatos = props.funAct;
    }

    componentWillReceiveProps(props){
        this.setState({
            vehiculos:props.vehiculos,
        })
    }

    guardarVehiculo(datos){
        let vehiculos = this.state.vehiculos;
        vehiculos.push(datos);
        this.setState({
            popUp:false
        },this.actualizarDatos(
            {
                vehiculos:vehiculos,
            }
            ));
        
    }

    borrarVehiculo(ind){
        let vehiculos = this.state.vehiculos;
        vehiculos.splice(ind,1);
        this.actualizarDatos(
            {
                vehiculos:vehiculos,
            })
    }

    cargarPopUp(){
        this.setState({popUp:true});
    }

    render(){
        return(<div>
                    <div>
                        <Typography>Vehiculos</Typography>
                        <Fab color='primary' onClick={
                            this.cargarPopUp.bind(this)
                        } style={{display:'inline-block'}}
                            
                        > 
                            <Add/>
                        </Fab>
                    </div>
                    <Table>
                        <TableBody>
                            {this.state.vehiculos.map((elem,ind)=><TableRow>
                                <TableCell>
                                    {elem.dominio}
                                </TableCell>
                                <TableCell>
                                    Habilitado: {elem.habilitado === true? 'Si':'No'}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        style={{display:'inline-block'}}
                                        onClick={()=>this.borrarVehiculo.bind(this)(ind)}
                                        color='secondary'
                                    >Borrar</Button>
                                </TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                    <Dialog
                        open={this.state.popUp} onBackdropClick={()=>this.setState({popUp:false})}
                        onEscapeKeyDown={()=>this.setState({popUp:false})}
                        guardarSocio={this.guardarVehiculo.bind(this)}
                    >
                        <DialogTitle>Ingresar Nuevo Vehiculo</DialogTitle>
                        <DialogContent>
                            <IngresoVehiculo vehiculo={{}}
                             funcionGuardar={this.guardarVehiculo.bind(this)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>)
    }
}