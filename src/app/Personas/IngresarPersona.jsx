import React,{Component} from 'react';
import {TextField,Select,MenuItem,InputLabel,Typography,
    FormControl,FormControlLabel,Button} from '@material-ui/core';



export default class AMBPersona extends Component{
    constructor(props){
        super(props);
        this.state ={
            nombre:props.persona.nombre  === undefined ? '':props.persona.nombre,
            apellido:props.persona.apellido === undefined ? '':props.persona.apellido,
            dni:props.persona.dni === undefined ? '':props.persona.dni,
            tipoDni:props.persona.tipoDni === undefined ? '':props.persona.tipoDni,
            tiposDni:[

            ],
            cuit:props.persona.cuit === undefined ? '':props.persona.cuit,
            calle:props.persona.calle === undefined ? '':props.persona.calle,
            altura:props.persona.altura === undefined ? '':props.persona.altura,
            dpto:props.persona.dpto === undefined ? '':props.persona.dpto,
            localidad:props.persona.localidad === undefined ? '':props.persona.localidad,
            rol:props.persona.rol === undefined ? '':props.persona.rol,
            asginaRoles:props.asignaRoles === undefined? false:props.asignaRoles,
            roles:props.roles === undefined ? '':props.roles,
        }
        this.guardarInfo = props.funcionGuardar;

    }

    devolverDatos(){
        let datos = {
            nombre:this.state.nombre,
            apellido:this.state.apellido,
            dni:this.state.dni,
            tipoDni:this.state.tipoDni,
            cuit:this.state.cuit,
            calle:this.state.calle,
            altura:this.state.altura,
            dpto:this.state.dpto,
            localidad:this.state.localidad,
            rol:this.state.rol,
        }

        return datos;
    }

    guardarDatos(){
        let estado = this.devolverDatos.bind(this)();
        this.setState({
            nombre:'',
            apellido:'',
            dni:'',
            tipoDni:'',
            cuit:'',
            calle:'',
            altura:'',
            dpto:'',
            localidad:'',
            rol:'',
        },this.guardarInfo(estado))

    }
    


    resetear(){
        this.setState({
            nombre:'',
            apellido:'',
            dni:'',
            tipoDni:'',
            cuit:'',
            calle:'',
            altura:'',
            dpto:'',
            localidad:'',
            rol:'',
        })
    }
    componentWillReceiveProps(props){
        if(props.persona === undefined){
            this.setState({
                asginaRoles:props.asignaRoles === undefined? false:props.asignaRoles,
                roles:props.roles === undefined ? '':props.persona.roles,
            })
        }
        else{
            this.setState({
                nombre:props.persona.nombre  === undefined ? '':props.persona.nombre,
                apellido:props.persona.apellido === undefined ? '':props.persona.apellido,
                dni:props.persona.dni === undefined ? '':props.persona.dni,
                tipoDni:props.persona.tipoDni === undefined ? '':props.persona.tipoDni,
                cuit:props.persona.cuit === undefined ? '':props.persona.cuit,
                calle:props.persona.calle === undefined ? '':props.persona.calle,
                altura:props.persona.altura === undefined ? '':props.persona.altura,
                dpto:props.persona.dpto === undefined ? '':props.persona.dpto,
                localidad:props.persona.localidad === undefined ? '':props.persona.localidad,
                rol:props.persona.rol === undefined ? '':props.persona.rol,
                asginaRoles:props.asignaRoles === undefined? false:props.asignaRoles,
                roles:props.roles === undefined ? '':props.roles,
            })
        }
    }

    render(){
        return(<div>
            <TextField label='Nombre' margin='dense'
                value={this.state.nombre}
                onChange={(ev)=>this.setState({nombre:ev.target.value})}
            ></TextField>
            <TextField label='Apellido' margin='dense'
                value={this.state.apellido}
                onChange={(ev)=>this.setState({apellido:ev.target.value})}
            ></TextField>
            <TextField label='DNI' margin='dense'
                value={this.state.dni}
                onChange={(ev)=>this.setState({dni:ev.target.value})}
            ></TextField>
            <TextField label='CUIT/CUIL' margin='dense'
                value={this.state.cuit}
                onChange={(ev)=>this.setState({cuit:ev.target.value})}
            ></TextField>
            <Typography>Dirección</Typography>
            <TextField label='Calle' margin='dense'
                value={this.state.calle}
                onChange={(ev)=>this.setState({calle:ev.target.value})}
            ></TextField>
            <TextField label='Altura' margin='dense' type='number'
                value={this.state.altura}
                onChange={(ev)=>this.setState({altura:ev.target.value})}
            ></TextField>
            <TextField label='Dpto.' margin='dense'
                value={this.state.dpto}
                onChange={(ev)=>this.setState({dpto:ev.target.value})}
            ></TextField>
            <TextField label='Localidad' margin='dense'
                value={this.state.localidad}
                onChange={(ev)=>this.setState({localidad:ev.target.value})}
            ></TextField>
            {this.state.asginaRoles === true?<FormControl> 
                <label htmlFor="rol">Rol</label>
                <Select inputProps={{id:'rol'}}
                    value={this.state.rol}
                    onChange={(ev)=>this.setState({rol:ev.target.value})}
                >   
                    {this.state.roles}
                </Select>
            </FormControl> : this.state.rol.length > 0? <Typography>{this.state.rol}</Typography> : null}
            {this.guardarInfo !== undefined && this.guardarInfo !== null ? 
            <Button onClick={this.guardarDatos.bind(this)}>Guardar</Button>:null }
        
        </div>)
    }

}


