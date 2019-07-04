import React,{Component} from 'react';
import {TextField,FormControl,InputLabel,Select,Typography} from '@material-ui/core';


export default class Domicilios extends Component{
    constructor(props){
        super(props);
        console.log(props.domicilios)
        this.state={
            domicilios:props.domicilios,
            tipos:props.tipos,
            puedeBorrar:props.puedeBorrar === undefined? false:props.puedeBorrar,
            puedeAgregar:props.puedeAgregar === undefined? false:props.puedeAgregar,
            puedeEditar:props.puedeEditar === undefined? false: props.puedeEditar,//para saber si puede editar tipos
        };
        this.actualizarCampos = props.funAct;
    }

    componentWillReceiveProps(props){
        this.setState({
            domicilios:props.domicilios,
            tipos:props.tipos,
            puedeBorrar:props.puedeBorrar === undefined? false:props.puedeBorrar,
            puedeAgregar:props.puedeAgregar === undefined? false:props.puedeAgregar,
            puedeEditar:props.puedeEditar === undefined? false: props.puedeEditar,
        })
    }

    actualizarValores(item,indice){
        let domicilios = this.state.domicilios;
        domicilios[indice] = item;
        this.actualizarCampos(domicilios);
    }

    render(){
        
        return(<div>
            {this.state.domicilios.map((elem,ind)=><Domicilio 
            domicilio={elem} 
            tipos={this.state.tipos} 
            editarTipo={this.state.puedeEditar}
            indice={ind} key={ind}
            funAct={this.actualizarValores.bind(this)}
            ></Domicilio>)}
        </div>)
    }
}


class Domicilio extends Component{
    constructor(props){
        super(props);
        this.state={
            calle:props.domicilio.calle,
            altura:props.domicilio.altura,
            dpto:props.domicilio.dpto,
            localidad:props.domicilio.localidad,
            tipo:props.domicilio.tipo,
            editarTipo:props.editarTipo === undefined? false:props.editarTipo,
            tipos:props.tipos,
            indice:props.indice,
        }
        this.actualizarCampos = props.funAct;
    }

    componentWillReceiveProps(props){
        this.setState({
            calle:props.domicilio.calle,
            altura:props.domicilio.altura,
            dpto:props.domicilio.dpto,
            localidad:props.domicilio.localidad,
            tipo:props.domicilio.tipo,
            editarTipo:props.editarTipo === undefined? false:props.editarTipo,
            tipos:props.tipos,
            indice:props.indice,
        })
    }

    actualziarValores(val,campo){
        let estado = {
            calle:this.state.calle,
            altura:this.state.altura,
            dpto:this.state.dpto,
            localidad:this.state.localidad,
            tipo:this.state.tipo,
        }
        estado[campo] = val;
        this.actualizarCampos(estado,this.state.indice);

    }


    render(){
        return(<div>
            <TextField value={this.state.calle} label='Calle'
            onChange={(ev)=>this.actualziarValores.bind(this)(ev.target.value,'calle')}/>
            <TextField value={this.state.altura} label='Altura' type='number'
            onChange={(ev)=>this.actualziarValores.bind(this)(ev.target.value,'altura')}/>
            <TextField value={this.state.dpto} label='Dpto.'
            onChange={(ev)=>this.actualziarValores.bind(this)(ev.target.value,'dpto')}/>
            <TextField value={this.state.localidad} label='Localidad'
            onChange={(ev)=>this.actualziarValores.bind(this)(ev.target.value,'localidad')}/>
            {this.state.editarTipo === true? 
            <FormControl>
                <InputLabel htmlFor='tipo'>Tipo</InputLabel>
                <Select value={this.state.tipo} inputProps={{id:'tipo'}}
                onChange={(ev)=>this.actualziarValores.bind(this)(ev.target.value,'tipo')}
            >{this.state.tipos}</Select>
            </FormControl>
            : <Typography style={{display:'inline-block'}} >Tipo: {this.state.tipo}</Typography>  }
        </div>)
    }
}