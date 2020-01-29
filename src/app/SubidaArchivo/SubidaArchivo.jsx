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
        console.log(arch)
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

    enviarArchivos(fun){

        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
          if(this.readyState == 4 && this.status == 200){
              if (fun != null){
              if (this.responseText.length > 0){
                  fun(this.responseText);
              }
              else{
                  fun();
              }
              }
          }
        };
        request.open('POST',"http://" + this.HOST + "/recibir",true);
        if ('POST' == "POST"){
          let form = new FormData();
          for (let x = 0; x < this.state.archivos.length; x++){
            form.append('file',this.state.archivos[x],this.state.archivos[0].name)
          }
          //request.setRequestHeader('Content-type','multipart/form-data');
          request.send(form);
        }
        else {request.send();}
      }

    guardarArchivos(){
        return
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
                    <Typography color='black'>{elem.name }</Typography>
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
        this.devolverElegido(null)
    }

    render(){
        return(
            <Dialog
                open={this.state.abierto}
                onClose={this.limpiar.bind(this)}
            >
                <div>
                    <Typography>Seleccione el archivo a subir</Typography>
                    <Input type='file'
                        onChange={(ev)=>this.setState({input:ev.target.files[0]})}
                        margin='dense'
                    ></Input>
                    <Button onClick={this.elegir.bind(this)}>Seleccionar</Button>
                </div>

            </Dialog>
        )
    }
}