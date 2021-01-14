import React,{Component} from 'react';
import {TextField,Select,MenuItem,InputLabel,Typography,Button,
    FormControl,FormControlLabel,Switch} from '@material-ui/core';
import DBHandler from '../DbHandler';
import Titular from './TitularVehiculo';



export default class AMBVehiculos extends Component{
    constructor(props){
        super(props);
        this.state={
            dominio:'',//props.vehiculo.dominio === undefined? '':props.vehiculo.dominio,
            modelo:'',//props.vehiculo.modelo === undefined? '':props.vehiculo.modelo,
            anio:'',//props.vehiculo.anio === undefined? '':props.vehiculo.anio,
            marca:'',//props.vehiculo.marca === undefined? '':props.vehiculo.marca,
            nombreTitular:'',//props.vehiculo.nombreTitular === undefined? '':props.vehiculo.nombreTitular,
            cuitTitular:'',//props.vehiculo.cuitTitular === undefined? '':props.vehiculo.cuitTitular,
            habilitado:'',//props.vehiculo.habilitado === undefined? '':props.vehiculo.habilitado,
            inspector:'',//props.vehiculo.inspector === undefined? '':props.vehiculo.inspector,
            tipoCombustible:'',
        }
        this.guardarInfo = props.funcionGuardar;
        this.funHome = props.funHome;
        this.funCambio = props.funCambio;
        this.db = new DBHandler();
    }

    componentWillReceiveProps(props){
        this.setState({
            dominio:'',//props.vehiculo.dominio === undefined? '':props.vehiculo.dominio,
            modelo:'',//props.vehiculo.modelo === undefined? '':props.vehiculo.modelo,
            anio:'',//props.vehiculo.anio === undefined? '':props.vehiculo.anio,
            marca:'',//props.vehiculo.marca === undefined? '':props.vehiculo.marca,
            nombreTitular:'',//props.vehiculo.nombreTitular === undefined? '':props.vehiculo.nombreTitular,
            cuitTitular:'',//props.vehiculo.cuitTitular === undefined? '':props.vehiculo.cuitTitular,
            habilitado:'',//props.vehiculo.habilitado === undefined? '':props.vehiculo.habilitado,
            inspector:'',//props.vehiculo.inspector === undefined? '':props.vehiculo.inspector
        })
    }

    devolverDatos(){
        let estado = {
            dominio:this.state.dominio,
            modelo:this.state.modelo,
            anio:this.state.anio,
            marca:this.state.marca,
        }
        /*    nombreTitular:this.state.nombreTitular,
            cuitTitular:this.state.cuitTitular,
            habilitado:this.state.habilitado,
            inspector:this.state.inspector
        */
        return estado;
    }

    guardarDatos(fun){
        let estado = this.devolverDatos.bind(this)();
        //if(fun !== undefined && fun !== null){
        //    fun()
        //}
        this.db.ingresarVehiculo(estado)
        this.funCambio(<Titular funCambio={this.funCambio} funHome={this.funHome}
            vehiculo={2}
            />)
    }

    render(){
        return(<div>
            <Typography variant='h5' style={{marginTop:'10px',marginBottom:'15px'}}>Ingresar Datos del Vehiculo</Typography><br/>
            <TextField
                value={this.state.dominio} label='Dominio'
                onChange={(ev)=>this.setState({dominio:ev.target.value})}
            ></TextField><br/>
            <TextField
                value={this.state.modelo} label='Modelo'
                onChange={(ev)=>this.setState({modelo:ev.target.value})}
            ></TextField><br/>
            <TextField
                value={this.state.anio} label='Año'
                onChange={(ev)=>this.setState({anio:ev.target.value})}
            ></TextField><br/>
            <TextField
                value={this.state.marca} label='Marca'
                onChange={(ev)=>this.setState({marca:ev.target.value})}
            ></TextField><br/>
            <br/>
            <FormControl style={{minWidth:180}}>
                <InputLabel id='tipo-combus-label'>
                    Tipo de Combustible
                </InputLabel>
                <Select
                    id='tipo-combus'
                    labelId='tipo-combus-label'
                    value={this.state.tipoCombustible}
                    onChange={(ev)=>this.setState({tipoCombustible:ev.target.value})}
                >
                    {[  <MenuItem value='Nafta'>Nafta</MenuItem>,
                        <MenuItem value='Gasoil'>Gasoil</MenuItem>,
                        <MenuItem value='Gas'>Gas</MenuItem>]}
                </Select>
            </FormControl><br/>
            {/*<Typography>Titular</Typography>
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
            ></TextField>:null}*/}
            
            <Button onClick={this.guardarDatos.bind(this)}
                disabled={this.state.anio === '' || this.state.marca === '' ||
                    this.state.dominio === '' || this.state.modelo === ''}
            >Guardar</Button>
        </div>)
    }
}