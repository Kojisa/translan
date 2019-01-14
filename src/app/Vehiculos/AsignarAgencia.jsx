import React,{Component} from 'react';
import {Grid,Select,Typography,FormControl,MenuItem,FormLabel} from '@material-ui/core';



export default class AsignarAgencia extends Component{
    constructor(props){
        super(props);
        this.state ={
            agencias:props.agencias ? props.agencias : ['Remis Soon','NOAN','Remises Nivel',
            'Mario Remises','Remis Uno'],
            elegido:null,
        }
    }

    render(){
        return(
            <div>
                <Typography variant='h4' > Asigne una agencia al vehiculo recien ingresado </Typography>
                <FormControl>
                    <FormLabel htmlFor='asignado'></FormLabel>
                    <Select value={this.state.elegido} id='asignado' 
                     onChange={(ev)=>this.setState({elegido:ev.target.value})}  >
                        {this.state.agencias.map((elem,ind)=><MenuItem value={elem}>{elem}</MenuItem>)}
                    </Select>
                </FormControl>
                
            </div>
        )
    }
}