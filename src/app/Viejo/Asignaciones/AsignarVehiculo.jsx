import React,{Component} from 'react';
import {Grid,Select,Typography,FormControl,MenuItem,InputLabel,Button} from '@material-ui/core';
import {Agencias} from '../../Datos';



export default class AsignarAgencia extends Component{
    constructor(props){
        super(props);
        this.state ={
            agencias:[{'Dominio':'ABX 019','Tipo':'Remis'},
            {'Dominio':'AIE 193','Tipo':'Remis'},{'Dominio':'RUH 417','Tipo':'Escolar'},
            {'Dominio':'XNA 903','Tipo':'Remis'},{'Dominio':'NKF 831','Tipo':'Escolar'},
            {'Dominio':'BJA 591','Tipo':'Escolar'},{'Dominio':'LAK 481','Tipo':'Remis'},
            {'Dominio':'EOQ 019','Tipo':'Escolar'},{'Dominio':'REI 341','Tipo':'Remis'},
            {'Dominio':'GKA 510','Tipo':'Escolar'}],
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
                    <InputLabel htmlFor='asignado' shrink >Dominio</InputLabel>
                    <Select value={this.state.elegido} id='asignado'
                     onChange={(ev)=>this.setState({elegido:ev.target.value})}  >
                        {this.state.agencias.map((elem,ind)=><MenuItem value={elem.Dominio} key={ind}>{elem.Dominio}</MenuItem>)}
                    </Select>
                    
                </FormControl>
                {boton}
                
            </div>
        )
    }
}