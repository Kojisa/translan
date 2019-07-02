import React,{Component} from 'react';
import {Grid,Typography,Paper,Button,IconButton} from '@material-ui/core';
import IconoEditar from '@material-ui/icons/Edit';
import AsignarAgencia from '../Asignaciones/AsignarAgencia';
import IconoBorrar from '@material-ui/icons/Delete';
import IngresarPersona from '../Personas/IngresoPersona';
import IngresoPersona from '../Personas/IngresoPersona';
import IconoAgregar from '@material-ui/icons/Add';


export default class Contenedor extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos:{'Vehiculo':{'Patente':'AVJ123','Marca':'Chevrolette','Modelo':'Corsa','Color':'Rojo',
            "Año":'2005'}
            ,'Registros':['02/12/2018 - Gdor M Paz 700 - Lanús',
            '01/12/2018 -  Av. Pres. Hipólito Yrigoyen 5213 - Lanús',
            '01/12/2018 -  Av. Eva Perón 1569 - Lanús'],
            'Conductores':[{'Nombre':'Juan','Apellido':'Garcia','DNI':'21043912','CUIT':'20210439129'}],
            'Agencia':{'Razon':'Remiseria Nico','CUIT':'33-1391029-9',
            'Dirección':' 2 de Mayo 2793','Telefono':'011 4247-5783','Localidad':'Lanus'}}
        }
    }

    render(){
        return(<div style={{width:'500px',height:'80vh',overflowY:'auto'}}>
            <Grid>
                <Grid>
                    <Paper>
                        <VistaVehiculo datos={this.state.datos.Vehiculo}></VistaVehiculo>
                    </Paper>
                </Grid>
                <Grid>
                    <Paper>
                        <Registros datos={this.state.datos.Registros}></Registros>
                    </Paper>
                </Grid>
                <Grid>
                    <Paper>
                        <Agencias datos={this.state.datos.Agencia}></Agencias>
                    </Paper>
                </Grid>
                <Grid>
                    <Paper>
                        <Conductores datos={this.state.datos.Conductores}></Conductores>
                    </Paper>
                </Grid>
            </Grid>
        </div>)
    }
}

class Agencias extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos:props.datos,
            editar:false,
        }
    }
    componentWillReceiveProps(props){
        this.setState({datos:props.datos});
    }

    render(){
        let claves = Object.keys(this.state.datos);
        let agregar = null;
        let borrar = null;
        if(this.state.editar === true){
            agregar = <AsignarAgencia fuente='body2' botonAgregar={true}></AsignarAgencia>
            borrar = <IconButton><IconoBorrar/></IconButton>
        }
        
        return(<Paper>
            <Typography variant='h4' style={{display:'inline-block'}}><b>Agencias</b></Typography> 
            <IconButton onClick={()=>this.setState({editar:!this.state.editar})}><IconoEditar/></IconButton> <br/>
            {borrar}
            {claves.map((elem,ind)=><Typography variant='body1'><b>{elem}:</b>{this.state.datos[elem]}</Typography>)}
            
            {agregar}
        
        </Paper>

        )
    }
}

class Conductores extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos:props.datos,
            editar:false,
            agregar:false,
        }
    }

    componentWillReceiveProps(props){
        this.setState({datos:props.datos});
    }

    corroborarDNI(valor,campo){
        return valor
    }

    render(){
        let datos = this.state.datos;
        let editarPersona = null;
        if(this.state.agregar === true){
            editarPersona=<IngresoPersona  
                salir={()=>this.setState({agregar:false})}
                valores={this.setState.datos}
                actualizar = {this.corroborarDNI.bind(this)}
                dialogo={true}
            ></IngresoPersona>
        }
        let botonAgregar = null;
        let botonEliminar = null;
        if(this.state.editar === true){
            botonAgregar = <Paper>
                <Typography variant='body2' style={{display:'inline-block',paddingRight:'15px'}}>Agregar Conductor</Typography>
                <IconButton onClick={()=>this.setState({agregar:true})}> <IconoAgregar/></IconButton>
            </Paper>

            botonEliminar = <IconButton> <IconoBorrar/> </IconButton>
        }


        return(<Paper>
            <Typography variant='h4' style={{display:'inline-block',paddingRight:'15px'}}  ><b>Conductores</b></Typography>
            <IconButton onClick={()=>this.setState({editar:!this.state.editar,agregar:false})} ><IconoEditar/></IconButton>
            <br/>
            {editarPersona}
            {botonEliminar}
            {datos.map((elem,ind)=> <Paper>
            {Object.keys(elem).map((act,algo)=> <Typography variant='body1'><b>{act}:</b>{elem[act]}</Typography>)}
            {botonAgregar}
        
        
        </Paper>)}
        </Paper>)
    }
}

class Registros extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos:props.datos,
        }
    }

    componentWillReceiveProps(props){
        this.setState({datos:props.datos})
    }

    render(){
            let claves = Object.keys(this.state.datos);
            return(<Paper>
                <Typography variant='h4'><b>Registros</b></Typography><br/>
    
                {claves.map((elem,ind)=><Typography variant='body1'>{this.state.datos[elem]}</Typography>)}
            </Paper>)
    }
}


class VistaVehiculo extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos:props.datos,
        }
    }

    componentWillReceiveProps(props){
        this.setState({datos:props.datos})
    }

    render(){
            let claves = Object.keys(this.state.datos);
            return(<Paper>
                <Typography variant='h4'><b>Vehiculo</b></Typography><br/>
    
                {claves.map((elem,ind)=><Typography variant='body1'><b>{elem}:</b>{this.state.datos[elem]}</Typography>)}
            </Paper>)
    }
}