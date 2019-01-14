import React,{Component} from 'react';
import {Grid,Typography,Paper} from '@material-ui/core';


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
        return(<div style={{width:'500px'}}>
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
        }
    }
    componentWillReceiveProps(props){
        this.setState({datos:props.datos});
    }

    render(){
        let claves = Object.keys(this.state.datos);
        return(<Paper>
            <Typography variant='h4'><b>Agencia</b></Typography><br/>

            {claves.map((elem,ind)=><Typography variant='body1'><b>{elem}:</b>{this.state.datos[elem]}</Typography>)}
        </Paper>

        )
    }
}

class Conductores extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos:props.datos,
        }
    }

    componentWillReceiveProps(props){
        this.setState({datos:props.datos});
    }

    render(){
        let datos = this.state.datos;
        return(<Paper>
            <Typography variant='h4'><b>Conductores</b></Typography><br/>

            {datos.map((elem,ind)=> <Paper>
            {Object.keys(elem).map((act,algo)=> <Typography variant='body1'><b>{act}:</b>{elem[act]}</Typography>)}
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