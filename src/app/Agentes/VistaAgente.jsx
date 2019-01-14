import React,{Component} from 'react';
import {Grid,Typography,Paper} from '@material-ui/core';




export default class Contenedor extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos:{'Agente':{'Razon':'Remiseria Nico','CUIT':'33-1391029-9',
            'Dirección':' 2 de Mayo 2793','Telefono':'011 4247-5783','Localidad':'Lanus'},
            'Responsable':{'Nombre':'Nicolas','Apellido':'Ferreira','DNI':'23930132',
            'CUIT':'20-23930123','Nombre de Fantasia':'Nicolas Ferreira','Fecha de Nacimiento':'20/03/1970',
            'Dirección':'2 de Mayo 2793'},
            'Vehiculos':[{'Patente':'AVJ123','Marca':'Chevrolette','Modelo':'Corsa','Ultimo Registro':'02/12/2018 - Gdor M Paz 700 - Lanus'},
            {'Patente':'NDJ542','Marca':'Fiat','Modelo':'Duna','Ultimo Registro':'05/11/2018 -  Av. Pres. Hipólito Yrigoyen 3894 - Lanus'},
            {'Patente':'CKS894','Marca':'Renault','Modelo':'Clio','Ultimo Registro':'01/01/2019 -   Cnel. Beltrán 42 - Remedios de Escalada'},]}
        }

    }

    render(){
        return <div style={{width:'500px'}}>
            <Grid>
                <Grid>
                    <Paper>
                        <VistaAgente datos={this.state.datos.Agente}></VistaAgente>
                    </Paper>
                </Grid>
                <Grid>
                    <Paper>
                        <VistaResponsable datos={this.state.datos.Responsable} ></VistaResponsable>
                    </Paper>
                </Grid>
                <Grid>
                    <Paper>
                        <VistaVehiculosRelacionados datos={this.state.datos.Vehiculos} ></VistaVehiculosRelacionados>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    }
}

class VistaVehiculosRelacionados extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos:props.datos,
        }
    }

    render(){
        let datos = this.state.datos;
        return(<Paper>
            <Typography variant='h4'><b>Vehiculos Vinculados</b></Typography><br/>

            {datos.map((elem,ind)=> <Paper>
                {Object.keys(elem).map((act,algo)=> <Typography variant='body1'><b>{act}:</b>{elem[act]}</Typography>)}
            </Paper>
           )}
        </Paper>)
    }
}


class VistaResponsable extends Component{
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
            <Typography variant='h4'><b>Responsable</b></Typography><br/>

            {claves.map((elem,ind)=><Typography variant='body1'><b>{elem}:</b>{this.state.datos[elem]}</Typography>)}
        </Paper>)
    }
}


class VistaAgente extends Component{
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
            <Typography variant='h4'><b>Agente</b></Typography><br/>

            {claves.map((elem,ind)=><Typography variant='body1'><b>{elem}:</b>{this.state.datos[elem]}</Typography>)}
        </Paper>)
    }
}