import React,{Component} from 'react';
import {Button,TextField,Typography, ThemeProvider,Paper,
Table,TableHead,TableBody,TableRow,TableCell} from '@material-ui/core';
import DBHandler from '../DbHandler';
import ListarPersonas from '../Personas/ListarPersonas';
import AgregarPersona from '../Personas/IngresarPersona';
import HabilitarConductor from '../Personas/HabilitarCoductor';
import VincularAgencia from './VincularAgencia';

export default class AgregarChoferes extends Component{
    constructor(props){
        super(props);
        this.state={
            conductores:[],
            titular:null,
            vehiculo:props.vehiculo,
            conductoresRaw:[],
            agregando:false,
            nuevo:false,
            seleccionado:null,
            datosSeleccionado:{},
            habilitarConductor:false,
        }

        this.funHome = props.funHome;
        this.funCambio = props.funCambio;
        this.db = new DBHandler();
        this.db.pedirConductores({'vehiculo':props.vehiculo},this.cargarConductores.bind(this))
    }

    asignarConductor(){
        this.db.agregarConductor({
            'vehiculo':this.state.vehiculo,
            'persona':this.state.seleccionado,
        },()=>this.setState({habilitarConductor:false,seleccionado:null,
            nuevo:false,agregando:false},()=>this.db.pedirConductores({'vehiculo':this.state.vehiculo},
            this.cargarConductores.bind(this))))
    }

    cargarConductores(datos){
        let conductores = datos.map((elem,ind)=><VistaConductores
            nombre={elem.nombre} cuit={elem.cuit} habilitado={elem.habilitado}
            vinculo={elem.vinculo} fechaVinculo={elem.fechaVinculo}
        ></VistaConductores>)

        this.setState({
            conductores:conductores,
            conductoresRaw:datos,
        })
    }


    elegirPersona(id){
        this.setState({
            seleccionado:id,
        },this.db.pedirPersona((info)=>this.setState({datosSeleccionado:info}),{'persona':id}))
    }

    render(){

        let vista = null;

        if (this.state.agregando === false){
            vista = <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Nombre
                                </TableCell>
                                <TableCell>
                                    CUIT
                                </TableCell>
                                <TableCell>
                                    Vinculo
                                </TableCell>
                                <TableCell>
                                    Fecha Vinculacion
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.conductores}
                        </TableBody>
                    </Table>
        }

        if(this.state.agregando === true){
            let interno = null;

            if(this.state.nuevo === false){
                interno = <ListarPersonas devolverSeleccionado={this.elegirPersona.bind(this)} />
            }

            else{
                interno = <AgregarPersona devolverCreado={this.elegirPersona.bind(this)}></AgregarPersona>
            }

            let documentacionVinculo = <div>
                    <Button onClick={()=>this.asignarConductor.bind(this)()}> Asignar como Conductor </Button>
            </div>


            vista = <div>
                <Typography>Asignar Nuevo Conductor</Typography>
                {this.state.seleccionado === null ? <div>
                <Paper>
                    <Typography variant='h6'>Seleccionar Conductor</Typography>
                    <Button onClick = {()=>this.setState({nuevo:!this.state.nuevo})} color='primary'
                        variant='outlined' style={{marginBottom:'10px'}}
                    >
                        {this.state.nuevo === false  ? 'Crear Nuevo' : 'Seleccionar existente'}</Button>
                </Paper>
                {interno}
                </div>
            :   <div>
                    <Typography variant='h6'> <b>Persona Seleccionada: 
                        </b> {this.state.datosSeleccionado.apellido + ' ' +  this.state.datosSeleccionado.nombre}
                        </Typography>
                    <Button onClick={()=>this.setState({seleccionado:null,datosSeleccionado:{}})} color='primary'
                        variant='outlined'
                    >Volver a Seleccionar</Button>
                     {this.state.datosSeleccionado.conductor === 1? 
                <div>
                    <Typography>El Titular seleccionado esta habilitado para conducir</Typography>
                    <br/>
                    {documentacionVinculo}
                </div>
                :
                <div>
                    <Typography>El Titular seleccionado no esta habilitado para conducir</Typography>
                    <Button onClick={()=>this.setState({habilitarConductor:!this.state.habilitarConductor})}>Habilitar como Conductor</Button>
                    {this.state.habilitarConductor === false? null: <HabilitarConductor 
                        sinHeader={true} persona={this.state.seleccionado}
                    devolverCompletado={()=>this.db.pedirPersona((datos)=>this.setState({datosPersona:datos,habilitarConductor:false}),{'persona':this.state.seleccionado})}/>}
                </div>}
                </div>
                    
            }
            </div>
        }



        return <div>    
            <Typography>Conductores Asignados</Typography>
            <br/>
            <Button onClick={()=>this.setState({agregando:!this.state.agregando})}
                variant='outlined' color='primary'
            >
                {this.state.agregando === false ? 'Agregar Conductor':'Regresar a Listado'}
            </Button>
            {vista}
            <Button onClick={()=>this.funHome()}>Terminar</Button>
            <Button onClick={()=>this.funCambio(<VincularAgencia 
                funCambio={this.funCambio} funHome={this.funHome}
                vehiculo={this.state.vehiculo}
            /> )}></Button>
        </div>
    }
}





class VistaConductores extends Component{
    constructor(props){
        super(props);
        this.state={
            nombre:props.nombre,
            cuit:props.cuit,
            habilitado:props.habilitado,
            vinculo:props.vinculo,
            fechaVinculo:props.fechaVinculo
        }
    }

    render(){
        return(
            <TableRow>
                <TableCell>{this.state.nombre}</TableCell>
                <TableCell>{this.state.cuit}</TableCell>
                <TableCell>{this.state.vinculo}</TableCell>
                <TableCell>{this.state.fechaVinculo}</TableCell>
            </TableRow>
        )
        

    }
}
