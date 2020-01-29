import React,{Component} from 'react';
import {TextField,Checkbox,Button,Fab,
    Select,FormControl,InputLabel, Menu,Table,TableRow,TableCell,TableBody,
    MenuItem, Typography,Dialog,DialogContent,
    DialogTitle,DialogActions} from '@material-ui/core';
import IngresarPersona from '../Personas/IngresarPersona';
import ListadoSelectivo from '../Utils/ListadoSelectivo';
import Add from '@material-ui/icons/Add';

export default class IngresoChoferes extends Component{
    constructor(props){
        super(props);
        this.state = {
            socios:props.socios === undefined ? []:props.socios,
            vehiculos:props.vehiculos === undefined ? []:props.vehiculos,
            choferes:props.choferes,
            popUp:false,
            crearPersona:false,
            usarSocio:false,
        }
        this.actualizarDatos = props.funAct;
    }

    componentWillReceiveProps(props){
        this.setState({
            socios:props.socios === undefined ? []:props.socios,
            vehiculos:props.vehiculos === undefined ? []:props.socios,
            choferes:props.choferes
        })
    }

    cargarPopUp(){
        this.setState({
            popUp:true,
            crearPersona:false,
            usarSocio:false
        });
    }

    borrarChofer(ind){
        let choferes = this.state.choferes;
        choferes.splice(ind,1);
        this.actualizarDatos({
            choferes:choferes
        })
    }

    agregarChofer(datos){
        let choferes = this.state.choferes;
        choferes.push(datos);
        this.setState({
            popUp:false
        },this.actualizarDatos({
            choferes:choferes,
        })
        )
        
    }

    render(){


        let menu = <div>
            <Button onClick={()=>this.setState({usarSocio:true,crearPersona:false})} >Elegir un Socio</Button>
            <Button onClick={()=>this.setState({usarSocio:false,crearPersona:true})}>Ingresar Persona</Button>
        </div>

        if(this.state.usarSocio === true){
            menu = <ListadoSelectivo
                        listado={
                            [
                                {nombre:'Jose',apellido:'Perez',dni:'32918311'},
                                {nombre:'Pedro',apellido:'Zarate',dni:'42928121'},
                            ]
                        }
                        funAct={this.agregarChofer.bind(this)}
                        campos={['nombre','apellido','dni']}
                    ></ListadoSelectivo>
        }
        if(this.state.crearPersona === true){
            menu = <IngresarPersona persona={{}}
                    asignaRoles={false} funcionGuardar={this.agregarChofer.bind(this)}
                    />
        }



        return(<div>
            <div>
                <Typography>Conductores</Typography>
                <Fab color='primary'
                    onClick={this.cargarPopUp.bind(this)}
                    style={{display:'inline-block'}}
                > <Add/></Fab>
            </div>
            <Table>
                <TableBody>
                    {this.state.choferes.map((elem,ind)=><TableRow>
                        <TableCell>
                            {elem.nombre + ' ' + elem.apellido}
                        </TableCell>
                        <Button
                            color='secondary'
                            onClick={()=>this.borrarChofer.bind(this)(ind)}
                        >Borrar</Button>
                    </TableRow>)}
                </TableBody>
            </Table>
            <Dialog
                open={this.state.popUp} 
                onBackdropClick={()=>this.setState({popUp:false,usarSocio:false,crearPersona:false})}
                onEscapeKeyDown={()=>this.setState({popUp:false,usarSocio:false,crearPersona:false})}
                
            >
                <DialogTitle>Generar Nuevo Conductor</DialogTitle>
                <DialogContent>
                    {menu}
                </DialogContent>
            </Dialog>
        </div>)
    }
}