import React,{Component} from 'react';
import {Grid,Select,Typography,FormControl,MenuItem,InputLabel,Button} from '@material-ui/core';
import {Agencias} from '../Datos';



export default class AsignarAgencia extends Component{
    constructor(props){
        super(props);
        this.state ={
            agencias:Agencias,
            elegido:null,
            fuente:props.fuente,
            botonAgregar:props.botonAgregar,
        }
    }

    render(){
        let tamFont = 'h4'
        if(this.state.fuente != undefined){
            tamFont=this.state.fuente
        }
        let boton = null;
        if(this.state.botonAgregar === true){
            boton = <Button variant='contained' >Agregar</Button>
        }
        return(
            <div>
                <Typography variant={tamFont} > Asigne un Vehiculo </Typography>
                <FormControl style={{paddingRight:'10px'}}>
                    <InputLabel htmlFor='asignado' shrink >Agencias</InputLabel>
                    <Select value={this.state.elegido} id='asignado'
                     onChange={(ev)=>this.setState({elegido:ev.target.value})}  >
                        {this.state.agencias.map((elem,ind)=><MenuItem value={elem.Razon} key={ind}>{elem.Razon}</MenuItem>)}
                    </Select>
                    
                </FormControl>
                {boton}
                
            </div>
        )
    }
}