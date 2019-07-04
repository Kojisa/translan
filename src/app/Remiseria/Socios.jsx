import React,{Component} from 'react';
import {Typography,Table,Fab,Button
    ,TableBody,TableRow,TableCell,
    Dialog,DialogContent,DialogTitle} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import IngresarPersona from '../Personas/IngresarPersona';


export default class IngresoSocios extends Component{
        
    
    constructor(props){
        super(props);
        this.state = {
            socios:props.socios,
            antecedentes:props.antecedentes,
            roles:props.roles,
            popUp:false,
        }
        
        this.actualizarDatos = props.funAct;
    }

    componentWillReceiveProps(props){
        this.setState({
            socios:props.socios,
            roles:props.roles
        })
    }

    cargarPopUp(){
        this.setState({popUp:true});
    }

    guardarSocio(datos){
        let socios = this.state.socios;
        socios.push(datos);
        let antecedentes = this.state.antecedentes;
        antecedentes.push(false);
        this.setState({
            popUp:false
        },this.actualizarDatos(
            {
                socios:socios,
                antecedentes:antecedentes,
            }
            ));
        
    }

    borrarSocio(ind){
        let socios = this.state.socios;
        socios.splice(ind,1);
        let antecedentes = this.state.antecedentes;
        antecedentes.splice(ind,1)
        this.actualizarDatos(
            {
                socios:socios,
                antecedentes:antecedentes
            })
    }


    render(){



        return (<div>
                    <div>
                        <Typography>Socios</Typography>
                        <Fab color='primary' onClick={
                            this.cargarPopUp.bind(this)
                        } style={{display:'inline-block'}}
                            
                        > 
                            <Add/>
                        </Fab>
                    </div>
                    <Table>
                        <TableBody>
                        {this.state.socios.map((elem,ind)=><TableRow>
                                <TableCell>
                                    {elem.nombre + ' ' + elem.apellido} - Vinculo: {elem.rol}
                                </TableCell>
                                <TableCell>   
                                    <Button style={{display:'inline-block'}} 
                                        onClick={()=>this.borrarSocio.bind(this)(ind)} 
                                        color='secondary'>
                                        Borrar
                                        </Button>
                                </TableCell>
                            </TableRow>)}
                            
                        </TableBody>
                    </Table>
                    
                    <Dialog
                        open={this.state.popUp} onBackdropClick={()=>this.setState({popUp:false})}
                        onEscapeKeyDown={()=>this.setState({popUp:false})}
                        guardarSocio={this.guardarSocio.bind(this)}
                    >
                        <DialogTitle>Generar Nuevo Socio</DialogTitle>
                        <DialogContent>
                            <IngresarPersona roles={this.state.roles} persona={{}}
                            asignaRoles={true} funcionGuardar={this.guardarSocio.bind(this)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>)
    }
}