import React,{Component} from 'react';
import {TextField,Select,MenuItem,InputLabel,Dialog
    ,FormControl,Input,Typography,Button} from '@material-ui/core';





export default class Subida extends Component{
    constructor(props){
        super(props);
        this.state = {
            labels:props.labels,
            label:'',
            tipos:[
                <MenuItem >PDF</MenuItem>,
                <MenuItem>Conjunto de imagenes</MenuItem>,
                <MenuItem>DOC</MenuItem>,
                <MenuItem>XLSX</MenuItem>],
            tipo:'',
            archivos:[],
            subiendo:false,
            seleccionando:false,
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            labels:props.labels,
            label:'',
            tipos:[
                <MenuItem>PDF</MenuItem>,
                <MenuItem>Conjunto de imagenes</MenuItem>,
                <MenuItem>DOC</MenuItem>,
                <MenuItem>XLSX</MenuItem>],
            tipo:'',
            archivos:[],
            subiendo:false,
            seleccionando:false,
        })
    }

    recibirSeleccionado(arch){
        
        let archivos = this.state.archivos;
        
        if(arch !== undefined && arch !== null){
            archivos.push(arch);
        }
        
        this.setState({
            archivos:archivos,
            seleccionando:false,
        })
    }

    abrirDialogo(){
        this.setState({
            seleccionando:true
        })
    }


    render(){
        return(
            <div>
                <FormControl> 
                    <label htmlFor="rol">Tipo de documentacion</label>
                    <Select inputProps={{id:'rol'}}
                        value={this.state.label}
                        onChange={(ev)=>this.setState({label:ev.target.value})}
                    >   
                        {this.state.labels}
                    </Select>
                </FormControl>
                <FormControl> 
                    <label htmlFor="formato">Formato del Archivo</label>
                    <Select inputProps={{id:'formato'}}
                        value={this.state.tipo}
                        onChange={(ev)=>this.setState({tipo:ev.target.value})}
                    >   
                        {this.state.tipos}
                    </Select>
                </FormControl>
                <DialogoArchivo
                    abierto={this.state.seleccionando}
                    formato={this.state.tipo}
                    devolver={this.recibirSeleccionado.bind(this)}
                />
                <Button onClick={this.abrirDialogo.bind(this)} >Seleccionar Archivo</Button>
                {this.state.archivos.map((elem,ind)=><div>
                    <Typography>{elem.nombre }</Typography>
                    <Typography>{elem.tipo}</Typography>
                </div>)//hay que revisar que datos devuelve el input o que datos mantiene.
                }
                <Button onClick={this.guardarArchivos.bind(this)}>Guardar</Button>
            </div>
        )
    }
}


class DialogoArchivo extends Component{
    constructor(props){
        super(props);
        this.state={
            formato:props.formato,
            input:'',
            abierto:props.abierto,
        }
        this.devolverElegido = props.devolver;
    }

    componentWillReceiveProps(props){
        this.setState({
            formato:props.formato,
            input:'',
            abierto:props.abierto,
        })
    }

    elegir(){
        this.devolverElegido(this.state.input)
    }

    limpiar(){
        this.setState({
            input:'',
        })
    }

    render(){
        return(
            <Dialog
                open={this.state.abierto}
                onClose={this.limpiar.bind(this)}
            >
                <div>
                    <Typography>Seleccione el archivo a subir</Typography>
                    <Input type='file' value={this.state.input}
                        onChange={(ev)=>console.log(ev)}
                        margin='dense'
                    ></Input>
                    <Button onClick={this.elegir.bind(this)}>Seleccionar</Button>
                </div>

            </Dialog>
        )
    }
}