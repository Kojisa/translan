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
            filtro:'',
            preFiltro:'',
            campoFiltro:'',
        }
        this.actualizarValores = props.funAct;
    }


    apretarEnter(ev){

    }

    render(){
        return <div>
            <div>
                <TextField value={this.state.filtro} label='Filtro'
                    onChange={(ev)=>this.setState({preFiltro:ev.target.value})}
                    onKeyPress={(ev)=>this.apretarEnter(ev)}
                ></TextField>
                {this.state.campos.length > 0 ? <Select
                    value={this.state.campoFiltro}
                    onChange={(ev)=>this.setState({campoFiltro:ev.target.value})}
                >
                    {this.campos.map((elem,ind)=><MenuItem value={elem} key={ind}>{elem}</MenuItem>)}
                </Select>: null}
            </div>
            <div>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            {this.state.campos.map((elem,ind)=><TableCell key={ind}>{elem}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.listado.map((elem,ind)=>{
                            if(this.state.filtro.length === 0 || elem[this.state.campoFiltro].includes(this.state.filtro)){
                                return <TableRow key={ind} onClick={()=>this.elegirFila.bind(this)(ind)}  >
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