import React,{Component} from 'react';
import {Select,FormControl,InputLabel,Paper,IconButton,Fab,TextField} from '@material-ui/core';
import Amb from './NuevaRemiseria';
import Listado from '../Listado';
import AddIcon from '@material-ui/icons/Add';
import ArrowIcon from '@material-ui/icons/ArrowBack'



export default class Principal extends Component{

    constructor(props){
        super(props);
        this.state = {
            remiserias:[],
            seleccionada:null,
            nueva:false,
            filtro:'',
            preFiltro:'',
            tipoFiltro:'',
            TiposFiltro:[
            {valor:'nombreFantasia',texto:'Nombre Fantasia'},
            {valor:'cuit',texto:'CUIT'},
            {valor:'calle',texto:'Calle'}]
        }
    }


    render(){
        let render = null;
        let listado  = <Paper style={{width:'400px',maxWidth:'90wv',display:'inline-block',margin:'20px'}}>
                            <div style={{margin:'5px'}}>
                                <div style={{display:'inline-block'}}>
                                    
                                    <TextField value={this.state.preFiltro} onChange={(ev)=>(this.setState({preFiltro:ev.target.value}))}
                                    id='textoBusqueda' label='Busqueda'
                                    ></TextField>
                                    
                                    <FormControl>
                                        <InputLabel htmlFor='tipoBusqueda' shrink> Tipo de filtro </InputLabel>
                                        <Select native id='tipoBusqueda'
                                        value={this.state.tipoFiltro} 
                                        onChange={(ev)=>this.setState({tipoFiltro:ev.target.value})}>

                                            {this.state.TiposFiltro.map((elem,ind)=><option value={elem.valor} key={ind} >{elem.texto}</option>)}
                                        
                                        </Select>
                                    </FormControl>
                                </div>
                                <Fab size='small' aria-label='Add' onClick={()=>this.setState({nueva:true})}
                                    color='primary' style={{marginLeft:'10px',display:'inline-block'}}
                                    >
                                    <AddIcon/>
                                </Fab>
                            </div>
                            
                            <Listado></Listado>
                        </Paper>
        
        if(this.state.nueva == true){
            render = <Paper style={{display:'inline-block',verticalAlign:'top',minWidth:'300px',margin:'5px'}}>
                <Fab size='small' arial-label='Return' onClick={()=>this.setState({nueva:false})} color='primary'
                style={{position:'relative',left:'-120px'}} >
                    <ArrowIcon />
                </Fab>
                <Amb></Amb>
            </Paper>
            
        }
        else{
            render = listado
        }

        return(
            <div>
                {render}
                
            </div>
        )
    }
}
