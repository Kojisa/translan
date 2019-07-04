import React,{Component} from 'react';
import {TextField,Select,MenuItem,InputLabel,Typography,Button,
    FormControl,FormControlLabel,Switch} from '@material-ui/core';



export default class AMBVehiculos extends Component{
    constructor(props){
        super(props);
        this.state={
            dominio:props.vehiculo.dominio === undefined? '':props.vehiculo.dominio,
            modelo:props.vehiculo.modelo === undefined? '':props.vehiculo.modelo,
            anio:props.vehiculo.anio === undefined? '':props.vehiculo.anio,
            marca:props.vehiculo.marca === undefined? '':props.vehiculo.marca,
            nombreTitular:props.vehiculo.nombreTitular === undefined? '':props.vehiculo.nombreTitular,
            cuitTitular:props.vehiculo.cuitTitular === undefined? '':props.vehiculo.cuitTitular,
            habilitado:props.vehiculo.habilitado === undefined? '':props.vehiculo.habilitado,
            inspector:props.vehiculo.inspector === undefined? '':props.vehiculo.inspector,

        }
        this.guardarInfo = props.funcionGuardar;
    }

    componentWillReceiveProps(props){
        this.setState({
            dominio:props.vehiculo.dominio === undefined? '':props.vehiculo.dominio,
            modelo:props.vehiculo.modelo === undefined? '':props.vehiculo.modelo,
            anio:props.vehiculo.anio === undefined? '':props.vehiculo.anio,
            marca:props.vehiculo.marca === undefined? '':props.vehiculo.marca,
            nombreTitular:props.vehiculo.nombreTitular === undefined? '':props.vehiculo.nombreTitular,
            cuitTitular:props.vehiculo.cuitTitular === undefined? '':props.vehiculo.cuitTitular,
            habilitado:props.vehiculo.habilitado === undefined? '':props.vehiculo.habilitado,
            inspector:props.vehiculo.inspector === undefined? '':props.vehiculo.inspector
        })
    }

    devolverDatos(){
        let estado = {
            dominio:this.state.dominio,
            modelo:this.state.modelo,
            anio:this.state.anio,
            marca:this.state.marca,
            nombreTitular:this.state.nombreTitular,
            cuitTitular:this.state.cuitTitular,
            habilitado:this.state.habilitado,
            inspector:this.state.inspector
        }
        return estado;
    }

    guardarDatos(){
        let estado = this.devolverDatos.bind(this)();

        this.setState({
            dominio:'',
            modelo:'',
            anio:'',
            marca:'',
            nombreTitular:'',
            cuitTitular:'',
            habilitado:'',
            inspector:''
        },this.guardarInfo(estado));
    }

    render(){
        return(<div>
            <TextField
                value={this.state.dominio} label='Patente'
                onChange={(ev)=>this.setState({dominio:ev.target.value})}
            ></TextField>
            <TextField
                value={this.state.modelo} label='Modelo'
                onChange={(ev)=>this.setState({modelo:ev.target.value})}
            ></TextField>
            <TextField
                value={this.state.anio} label='Año'
                onChange={(ev)=>this.setState({anio:ev.target.value})}
            ></TextField>
            <TextField
                value={this.state.marca} label='Marca'
                onChange={(ev)=>this.setState({marca:ev.target.value})}
            ></TextField>
            <br/>
            <Typography>Titular</Typography>
            <TextField
               value={this.state.nombreTitular} label='Nombre Completo del Titular'
               onChange={(ev)=>this.setState({nombreTitular:ev.target.value})} 
                />
            <TextField
                value={this.state.cuitTitular} label='CUIT/CUIL'
                onChange={(ev)=>this.setState({cuitTitular:ev.target.value})} />
            <br/>
            <Typography>Habilitacion</Typography>
            <FormControlLabel
                control={
                    <Switch
                        checked={this.state.habilitado}
                        onChange={(ev)=>this.setState({habilitado:ev.target.checked,inspector:''})}
                    ></Switch> 
                } label='Habiliado' labelPlacement='start'
            ></FormControlLabel>
            {this.state.habilitado === true? 
                <TextField value={this.state.inspector} label='Inspector Habilitante'
                    onChange={(ev)=>this.setState({inspector:ev.target.value})}    
                ></TextField>:null}
            {this.guardarInfo !== undefined && this.guardarInfo !== null ? 
            <Button onClick={this.guardarDatos.bind(this)}>Guardar</Button>:null }
        </div>)
    }
}