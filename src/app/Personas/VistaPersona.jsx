import React,{Component} from 'react';
import {Grid,Paper,Typography} from '@material-ui/core';




export default class Vista extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos:{
                'Persona':{
                    'Nombre':'Juan',
                    'Apellido':'Perez'
                },
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
            datos:props.datos
        }
    }



    componentWillReceiveProps(props){
        this.setState({
            datos:props.datos
        })
    }


    render(){
        let claves = Object.keys(this.state.datos);
        return <Paper>
            <Typography variant='A4' style={{color:'#000000'}}><b>Persona</b></Typography><br/>
            {claves.map((elem,ind)=><Typography variant='body1' key={ind}> <b>{elem}</b>: {this.state.datos[elem]}</Typography>)}
        </Paper>
    }
}

class Vehiculos extends Component{
    constructor(props){
        super(props);
        this.state = {
            datos:props.datos
        }
    }

    componentWillReceiveProps(props){
        this.setState({datos:props.datos})
    }


    render(){
        let datos = this.state.datos;
        return(<Paper>
            <Typography variant='A4' style={{color:'#000000'}} >Vehiculos</Typography>
            {datos.map((elem,ind)=> <Paper>
                {Object.keys(elem).map((act,algo)=> <Typography variant='body1'><b>{act}:</b>{elem[act]}</Typography>)}
                </Paper>
           )}
        </Paper>)
    }
}