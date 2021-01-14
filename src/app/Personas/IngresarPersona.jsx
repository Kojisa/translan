import React,{Component} from 'react';
import {TextField,Select,MenuItem,InputLabel,Typography,
    FormControl,FormControlLabel,Button} from '@material-ui/core';
import DBHandler from '../DbHandler';



export default class AMBPersona extends Component{
    constructor(props){
        super(props);
        this.state ={
            nombre:'',//props.persona.nombre  === undefined ? '':props.persona.nombre,
            apellido:'',//props.persona.apellido === undefined ? '':props.persona.apellido,
            dni:'',//props.persona.dni === undefined ? '':props.persona.dni,
            tipoDni:'',//props.persona.tipoDni === undefined ? '':props.persona.tipoDni,
            tiposDni:[

            ],
            fechanacimiento:'',
            nacionalidad:'',
            cuit:'',//props.persona.cuit === undefined ? '':props.persona.cuit,
            calle:'',//props.persona.calle === undefined ? '':props.persona.calle,
            altura:'',//props.persona.altura === undefined ? '':props.persona.altura,
            dpto:'',//props.persona.dpto === undefined ? '':props.persona.dpto,
            localidad:'',//props.persona.localidad === undefined ? '':props.persona.localidad,
            rol:'',//props.persona.rol === undefined ? '':props.persona.rol,
            asginaRoles:'',//props.asignaRoles === undefined? false:props.asignaRoles,
            roles:'',//props.roles === undefined ? '':props.roles,
        }
        this.funcionGuardar = props.funcionGuardar;
        this.devolverCreado = props.devolverCreado; //funcion a la que se le pasa el id de la persona creada.
        this.db = new DBHandler();

    }

    devolverDatos(){
        let datos = {
            nombre:this.state.nombre,
            apellido:this.state.apellido,
            dni:this.state.dni,
            tipoDni:this.state.tipoDni,
            cuit:this.state.cuit,
            fechanacimiento:this.state.fechanacimiento,
            nacionalidad:this.state.nacionalidad,
            calle:this.state.calle,
            altura:this.state.altura,
            dpto:this.state.dpto,
            localidad:this.state.localidad,
        }

        return datos;
    }

    guardarDatos(){
        let estado = this.devolverDatos.bind(this)();
        this.db.ingresarPersona(estado,this.devolverCreado === undefined? null:(datos)=>this.devolverCreado(datos.persona));
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
                nombre:'',//props.persona.nombre  === undefined ? '':props.persona.nombre,
                apellido:'',//props.persona.apellido === undefined ? '':props.persona.apellido,
                dni:'',//props.persona.dni === undefined ? '':props.persona.dni,
                tipoDni:'',//props.persona.tipoDni === undefined ? '':props.persona.tipoDni,
                cuit:'',//props.persona.cuit === undefined ? '':props.persona.cuit,
                calle:'',//props.persona.calle === undefined ? '':props.persona.calle,
                altura:'',//props.persona.altura === undefined ? '':props.persona.altura,
                dpto:'',//props.persona.dpto === undefined ? '':props.persona.dpto,
                localidad:'',//props.persona.localidad === undefined ? '':props.persona.localidad,
                rol:'',//props.persona.rol === undefined ? '':props.persona.rol,
                asginaRoles:'',//props.asignaRoles === undefined? false:props.asignaRoles,
                roles:'',//props.roles === undefined ? '':props.roles,
            })
        }
    }

    render(){
        return(<div>
            <Typography variant='h6'> Ingreso de Persona</Typography>
            <TextField label='Nombre' size='small' style={{marginBottom:'8px'}}
                value={this.state.nombre} variant='outlined'
                onChange={(ev)=>this.setState({nombre:ev.target.value})}
            ></TextField><br/>
            <TextField label='Apellido' size='small'  style={{marginBottom:'8px'}}
                value={this.state.apellido} variant='outlined'
                onChange={(ev)=>this.setState({apellido:ev.target.value})}
            ></TextField><br/>
            <TextField label='DNI' size='small'  style={{marginBottom:'8px'}}
                value={this.state.dni} variant='outlined'
                onChange={(ev)=>this.setState({dni:ev.target.value})}
            ></TextField><br/>
            <TextField label='CUIT/CUIL' size='small'  style={{marginBottom:'8px'}}
                value={this.state.cuit} variant='outlined'
                onChange={(ev)=>this.setState({cuit:ev.target.value})}
            ></TextField><br/>
            <TextField type='date' InputLabelProps={{
                        shrink: true,
                    }}
                label='Fecha de Nacimiento' size='small'  style={{marginBottom:'8px'}}
                value={this.state.fechanacimiento} variant='outlined'
                onChange={(ev)=>this.setState({fechanacimiento:ev.target.value})}
            ></TextField><br/>
            <TextField
                label='Nacionalidad' size='small' style={{marginBottom:'8px'}}
                value={this.state.nacionalidad} variant='outlined'
                onChange={(ev)=>this.setState({nacionalidad:ev.target.value})} 
            >
            </TextField><br/>
            <Typography variant='h6'>Domicilio</Typography>
            <TextField label='Calle' size='small' variant='outlined'
                value={this.state.calle}
                onChange={(ev)=>this.setState({calle:ev.target.value})}
            ></TextField>
            <TextField label='Altura' size='small' variant='outlined' type='number'
                value={this.state.altura}
                onChange={(ev)=>this.setState({altura:ev.target.value})}
            ></TextField>
            <TextField label='Dpto.' size='small' variant='outlined'
                value={this.state.dpto}
                onChange={(ev)=>this.setState({dpto:ev.target.value})}
            ></TextField><br/>
            <TextField label='Localidad' size='small' variant='outlined'
                value={this.state.localidad}
                onChange={(ev)=>this.setState({localidad:ev.target.value})}
            ></TextField><br/>
            {this.state.asginaRoles === true?<FormControl> 
                <label htmlFor="rol">Rol</label>
                <Select inputProps={{id:'rol'}}
                    value={this.state.rol}
                    onChange={(ev)=>this.setState({rol:ev.target.value})}
                >   
                    {this.state.roles}
                </Select>
            </FormControl> : this.state.rol.length > 0? <Typography>{this.state.rol}</Typography> : null}
            <Button onClick={this.guardarDatos.bind(this)}
                disabled={this.state.nombre === '' || this.state.apellido === '' 
                || this.state.cuit === '' || this.state.dni === '' ||
                this.state.fechanacimiento === '' || this.state.nacionalidad === ''}

            >Guardar</Button>
        
        </div>)
    }

}


