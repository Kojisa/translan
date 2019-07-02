import React,{Component} from 'react';
import {Grid,Paper,Typography,IconButton} from '@material-ui/core';
import IconoBorrar from '@material-ui/icons/Delete';
import IconoEditar from '@material-ui/icons/Edit';
import AsignarAgencia from '../Asignaciones/AsignarVehiculo';
import IngresoPersona from './IngresoPersona'




export default class Vista extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos:{
                'Persona':{'Nombre':'Nicolas','Apellido':'Ferreira','DNI':'23930132',
                'CUIT':'20-23930132-6','Nombre de Fantasia':'Nicolas Ferreira','Fecha de Nacimiento':'20/03/1970','Dirección':'2 de Mayo 2793'},
                'Vehiculos':[{'Patente':'AVJ123','Marca':'Chevrolette','Modelo':'Corsa','Ultimo Registro':'02/12/2018 - Gdor M Paz 700 - Lanus'},
                {'Patente':'NDJ542','Marca':'Fiat','Modelo':'Duna','Ultimo Registro':'05/11/2018 -  Av. Pres. Hipólito Yrigoyen 3894 - Lanus'},
                {'Patente':'CKS894','Marca':'Renault','Modelo':'Clio','Ultimo Registro':'01/01/2019 -   Cnel. Beltrán 42 - Remedios de Escalada'}]
        
            }
        }
    }


    render(){
        return (<div style={{width:'500px'}}>
            <Grid>
                <Grid>
                    <Paper>
                        <VistaPersona datos={this.state.datos.Persona}/>
                    </Paper>
                </Grid>
                <Grid>
                    <Paper>
                        <Vehiculos datos={this.state.datos.Vehiculos} ></Vehiculos>
                    </Paper>
                </Grid>
            </Grid>
        </div>)
    }
}

class VistaPersona extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos:props.datos,
            edicion:false,
        }
    }

    componentWillReceiveProps(props){
        this.setState({datos:props.datos})
    }

    cerrarEdicion(){
        this.setState({edicion:false})
    }

    corroborarDNI(valor,campo){
        return valor
    }

    render(){

        let claves = Object.keys(this.state.datos);

        let edi = null;

        if(this.state.edicion === true){
            edi = <IngresoPersona valores={this.state.datos} 
            salir ={this.cerrarEdicion.bind(this)}
            actualizar = {this.corroborarDNI.bind(this)}
            dialogo={true}

            ></IngresoPersona>
        }


        return(<Paper>
            <Typography variant='h4' style={{paddingRight:'10px',display:'inline-block'}}><b>Persona</b></Typography>
            <IconButton onClick={()=>{this.setState({edicion:true})}} ><IconoEditar/></IconButton>
            <br/>
            {edi}
            {claves.map((elem,ind)=><Typography variant='body1'><b>{elem}:</b>{this.state.datos[elem]}</Typography>)}
        </Paper>)
    }
}


class Vehiculos extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos:props.datos,
            editar:false,
        }
    }

    render(){
        let datos = this.state.datos;
        let editar = null;
        
        editar=<IconButton
            onClick={()=>this.setState({editar:!this.state.editar})}>
            <IconoEditar />
        </IconButton>
        let agregarVehiculo = null;
        if(this.state.editar === true){
            agregarVehiculo = <AsignarAgencia fuente='body2' botonAgregar={true}></AsignarAgencia>
        }
        return(<Paper>
            <Typography variant='h4' style={{paddingRight:'10px',display:'inline-block'}}><b>Vehiculos Vinculados</b></Typography>
            {editar}
            <br/>

            {datos.map((elem,ind)=> {
            let boton = null;
            if(this.state.editar === true){
                boton =  <IconButton
                >
                <IconoBorrar />
            </IconButton>
            }
            return <Paper>
                {boton}
                {Object.keys(elem).map((act,algo)=> <Typography variant='body1'><b>{act}:</b>{elem[act]}</Typography>)}
            </Paper>
            })}

            {agregarVehiculo}

        </Paper>)
    }
}