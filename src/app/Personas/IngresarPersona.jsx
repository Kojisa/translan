import React,{Component} from 'react';
import {TextField,Select,MenuItem,InputLabel,Typography,
    FormControl,FormControlLabel} from '@material-ui/core';



export default class AMBPersona extends Component{
    constructor(props){
        super(props);
        this.state ={
            nombre:'',
            apellido:'',
            dni:'',
            tipoDni:'',
            tiposDni:[

            ],
            cuit:'',
            calle:'',
            altura:'',
            dpto:'',
            localidad:'',
            rol:'',
            asginaRoles:props.asignaRoles === undefined? false:props.asignaRoles,
            roles:[
                <MenuItem value='Presidente'>Presidente</MenuItem>,
                <MenuItem value='Socio Gerente'>Socio Gerente</MenuItem>,
                <MenuItem value='Socio'>Socio</MenuItem>,
                <MenuItem value='Apoderado'>Apoderado</MenuItem>,
                <MenuItem value='Director'>Director</MenuItem>,
            ],
        }
        this.guardarInfo = props.funcionGuardar;

    }
    componentWillReceiveProps(props){
        this.setState({
            asginaRoles:props.asignaRoles === undefined? false:props.asignaRoles,
        })
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
            <FormControl> 
                <label htmlFor="rol">Rol</label>
                <Select inputProps={{id:'rol'}}
                    value={this.state.rol}
                    onChange={(ev)=>this.setState({rol:ev.target.value})}
                >   
                    {this.state.roles}
                </Select>
            </FormControl>
        </div>)
    }

}


