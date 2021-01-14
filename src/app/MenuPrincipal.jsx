import React,{Component} from 'react';
import {Button,Fab,AppBar,Typography,IconButton,Paper,
Toolbar,Grid} from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import IngresarAgencia from './Remiseria/IngresoRemiseriaFinal';
import ListarAgencias from './Remiseria/ListaAgencias';
import IngresarVehiculo from './Vehiculos/IngresarVehiculos';
import ListarVehiculos from './Vehiculos/ListarVehiculo';
import IngresarTitular from './Vehiculos/TitularVehiculo';
import TitularVehiculos from './Vehiculos/TitularVehiculo';


export default class MenuPrincipal extends Component{
    constructor(props){
        super(props);
        this.state={
            menues:{
            },
            categoria:'',
            actual:null,
        }
    }

    render(){
        let vista = <div style={{textAlign:'center'}}>
            <Typography variant='h5'>Bienvenido</Typography>
            <Typography variant='h6'  style={{marginTop:'15px',marginBottom:'30px'}}>¿Sobre que tipo de organismo desea operar?</Typography>
            <Grid container spacing={5}  justify='center' direction='row'>
                <Grid item xs={1}>
                    <div>
                        <Button onClick={()=>this.setState({categoria:'Agencias'})}  
                            variant='contained'
                            color='primary'>Agencias</Button>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div>
                        <Button onClick={()=>this.setState({categoria:'Vehiculos'})}
                         variant='contained'
                         color='primary'>Vehiculos</Button>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div>
                        <Button onClick={()=>this.setState({categoria:'Conductores'})}
                         variant='contained'
                         color='primary'>Conductores</Button>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div>
                        <Button onClick={()=>this.setState({categoria:'Consultas'})}
                         variant='contained'
                         color='primary'>Consultas</Button>
                    </div>
                </Grid>
            </Grid>
        </div>
        //3.8.1

        if(this.state.categoria === 'Agencias'){
            vista = <div>
                <Typography variant='h5'>¿Que desea tramitar?</Typography>
                <br/>
                    <Grid style={{marginBottom:'10px'}}>
                        <div>
                            <Button onClick={()=>this.setState({actual:<IngresarAgencia 
                                    funHome={()=>this.setState({actual:null,categoria:''})}
                                    funCambio={(vista,titulo)=>this.setState({actual:vista,categoria:titulo})}
                            />})} variant='contained'
                                    color='primary'
                                
                            >Nueva Agencia</Button>
                        </div>
                    </Grid>
                    <Grid style={{marginBottom:'10px'}}>
                        <div>
                            <Button onClick={()=>this.setState({actual:<ListarAgencias
                                funHome={()=>this.setState({actual:null,categoria:''})}
                                funCambio={(vista,titulo)=>this.setState({actual:vista,categoria:titulo})}
                            />,
                                categoria:'Habilitacion de Agencias'
                            })}
                            variant='contained'
                            color='primary'
                            >Renovación de Habilitacion de Agencia</Button>
                        </div>
                    </Grid>
                    <Grid style={{marginBottom:'10px'}}>
                        <div>
                            <Button  variant='contained'
                                    color='primary'>Modificación/Ingreso de Socios</Button>
                        </div>
                    </Grid>
                    <Grid style={{marginBottom:'10px'}}>
                        <div>
                            <Button  variant='contained'
                                    color='primary'>Nuevo Apoderado o cambio de Apoderado</Button>
                        </div>
                    </Grid>
                    <Grid style={{marginBottom:'10px'}}>
                        <div>
                            <Button  variant='contained'
                                    color='primary'>Cambio de Titular de una Agencia</Button>
                        </div>
                    </Grid>
                    <Grid style={{marginBottom:'10px'}}>
                        <div>
                            <Button  variant='contained'
                                    color='primary'>Cambio de Casa Central de una Agencia</Button>
                        </div>
                    </Grid>      
            </div>
        }

        if(this.state.categoria === 'Vehiculos'){
            vista = <div>
                <Typography variant='h5'>¿Que desea tramitar?</Typography>
                <br/>
                <Grid style={{marginBottom:'10px'}}>
                    <div>
                        <Button onClick={()=>
                            this.setState({actual:<IngresarVehiculo
                                funHome={()=>this.setState({vista:null,categoria:''})}
                                funCambio={(vista,titulo)=>this.setState({actual:vista,categoria:titulo})}
                            />})

                        } 
                        variant='contained'
                        color='primary'>Agregar un Vehiculo</Button>
                    </div>
                </Grid>
                <Grid style={{marginBottom:'10px'}}>
                    <div>
                        <Button onClick={()=>this.setState({
                            actual:<ListarVehiculos 
                                funHome={()=>this.setState({vista:null,categoria:''})}
                                funCambio={(vista,titulo)=>this.setState({actual:vista,categoria:titulo})}
                                devolverSeleccionado={(id)=>this.setState({
                                    actual:<TitularVehiculos
                                        funHome={()=>this.setState({vista:null,categoria:''})} vehiculo={id}
                                        funCambio={(vista,titulo)=>this.setState({actual:vista,categoria:titulo})}
                                    />})}
                            />
                        })} 
                            variant='contained'
                            color='primary'>Modificar el Titular de un Vehiculo</Button>
                    </div>
                </Grid>
                <Grid style={{marginBottom:'10px'}}>
                    <div>
                        <Button  variant='contained'
                                    color='primary'>Asignar un nuevo Titular</Button>
                    </div>
                </Grid>
                <Grid style={{marginBottom:'10px'}}>
                    <div>
                        <Button  variant='contained'
                                    color='primary'>Modificar Agencia relacionada</Button>
                    </div>
                </Grid>    
            </div>
        }




        if(this.state.actual !== null){
            vista = <div>
                    {this.state.actual}
            </div>
        }

        return(<div>
            <AppBar position='static'>
                <Toolbar variant='dense' disableGutters={true}>
                    <IconButton onClick={()=>this.setState({categoria:'',actual:null})}
                        edge='start' 
                    ><Home/></IconButton>
                    <Typography variant='h6' >{this.state.categoria !== ''? this.state.categoria : 'Menu Principal'} </Typography>
                </Toolbar>
            </AppBar>
               
            <div style={{verticalAlign:'middle',marginTop:'5px',textAlign:'center'}}>
                {vista}
            </div>
           
        </div>)
    }
}