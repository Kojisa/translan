import React,{Component} from 'react';
import {Paper,Typography,ListItem,List} from '@material-ui/core';

export default class Listado extends Component{
    constructor(props){
        super(props);
        this.state={
            items:[{"nombre":'Remiseria1',"direccion":'Humberto 432','telefono':'1112312','id':0},
                {"nombre":'Remiseria2',"direccion":'Falucho 2123','telefono':'123123','id':1}],
            filtros:props.filtros,
            filtro:null,
            camposBasicos:["nombre","direccion","telefono"],
            equivalencias:{"nombre":"Nombre",'direccion':'Dirección','telefono':'Tel.'},
        }
        this.uncionPedirInfo = props.funPedirInfo;
        this.funSeleccionar = props.funSelec;
    }

    componentWillReceiveProps(props){
        this.setState({
            filtros:props.filtros,
            items:[{"nombre":'Remiseria1',"direccion":'Humberto 432','telefono':'1112312','id':0},
                {"nombre":'Remiseria2',"direccion":'Falucho 2123','telefono':'123123','id':1}],
            filtro:null,
            camposBasicos:["nombre","direccion","telefono"],
            equivalencias:{"nombre":"Nombre",'direccion':'Dirección','telefono':'Tel.'},
        })
        this.uncionPedirInfo = props.funPedirInfo;
        this.funSeleccionar = props.funSelec;
    }


    armarTarjetas(){
        let datos = this.state.items;
        let campos = this.state.camposBasicos;
        let equivalencias = this.state.equivalencias;
        if(campos.length === 0 || datos.length === 0){
            return [];
        }

        let tarjetas = datos.map((elem,ind)=><Tarjeta info={elem} campos={campos}
         equivalencias={equivalencias}
         funSeleccionar={this.funSeleccionar} key={ind} filtro={this.state.filtro} ></Tarjeta>)

        return tarjetas

    }


    render(){
        return(
            <div>
                <List>
                    {this.armarTarjetas()}
                </List>

            </div>
        )
    }
}


class Tarjeta extends Component{
    constructor(props){
        super(props);
        this.state={
            info:props.info,
            campos:props.campos,
            campoFiltrado:props.filtro,
            equivalencias:props.equivalencias,
        }
        this.funSelect = props.funSeleccionar;
    }

    componentWillReceiveProps(props){
        this.setState({
            info:props.info,
            campos:props.campos,
            campoFiltrado:props.filtro,
            equivalencias:props.equivalencias,
        })
        this.funSelect = props.funSeleccionar;
    }

    cargarCampos(){
        let campos = this.state.campos;
        let info = this.state.info;
        let filtro = this.state.campoFiltrado;
        let equivs = this.state.equivalencias;
        if(filtro !== null && filtro in campos){
            filtro = null;
        }


        let texto = campos.map((elem,ind)=><div key={ind} style={{lineHeight:'0.2em'}}>
            <Typography style={{display:'inline-block',marginRight:'5px'}} variant='button' >{equivs[elem]}: </Typography>
            <Typography style={{display:'inline-block'}}>{info[elem]}</Typography>
        </div>)

        if(filtro !== null){
            texto.push(<div>
                <Typography>{equivs[filtro]}: </Typography>
                <Typography>{info[filtro]}</Typography>
            </div>)
        }
        return texto

}

    render(){
        return(
            <ListItem divider={true} button={true} onClick={()=>this.funSelect(this.state.info.id)} >
                <div>
                    {this.cargarCampos()}
                </div>
            </ListItem>
        )
    }
}
