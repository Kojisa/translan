import React,{Component} from 'react';
import {TextField,Select,MenuItem,InputLabel,Typography,
    FormControl,FormControlLabel,Table,TableBody,
    TableCell,TableHead,TableRow} from '@material-ui/core';



export default class Listado extends Component{
    constructor(props){
        super(props);
        this.state = {
            listado:props.listado,
            campos:props.campos === undefined ? []:props.campos,
            multiSelect:props.multi === undefined ? false:props.multi,
            filtro:'',
            preFiltro:'',
            campoFiltro:'',
        }
        this.enviarElegido = props.funAct;
    }

    componentWillReceiveProps(props){
   
        this.setState({
        listado:props.listado,
        campos:props.campos === undefined ? []:props.campos,
        multiSelect:props.multi === undefined ? false:props.multi,
        filtro:'',
        preFiltro:'',
        campoFiltro:'',
        })
        this.enviarElegido = props.funAct;
    }


    elegirFila(ind){
        this.enviarElegido(this.state.listado[ind]);
    }


    apretarEnter(ev){
        if(ev.key==='Enter'){
            this.setState({filtro:this.state.preFiltro});
            ev.preventDefault();
            
        }
    }

    render(){
        return <div>
            <div>
                <TextField value={this.state.preFiltro} label='Filtro'
                    onChange={(ev)=>this.setState({preFiltro:ev.target.value})}
                    onKeyPress={(ev)=>this.apretarEnter.bind(this)(ev)}
                ></TextField>
                {this.state.campos.length > 0 ? <Select
                    value={this.state.campoFiltro}
                    onChange={(ev)=>this.setState({campoFiltro:ev.target.value})}
                >
                    {this.state.campos.map((elem,ind)=><MenuItem value={elem} key={ind}>{elem}</MenuItem>)}
                </Select>: null}
            </div>
            <div>
                <Table size='small' multiSelect={this.state.multiSelect}>
                    <TableHead>
                        <TableRow>
                            {this.state.campos.map((elem,ind)=><TableCell key={ind}>{elem}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.listado.map((elem,ind)=>{
                            
                            if(this.state.filtro.length === 0 || (this.state.campoFiltro !== '' && elem[this.state.campoFiltro].includes(this.state.filtro))){
                                return <TableRow key={ind} onClick={this.state.multiSelect === true?null:()=>this.elegirFila.bind(this)(ind)}  >
                                    {this.state.campos.map((campo,ind1)=><TableCell key={ind1}>{elem[campo]}</TableCell>)}
                                </TableRow>}
                            return null;
                            })}
                    </TableBody>
                </Table>    
            </div>
        </div>
    }
}