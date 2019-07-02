import React,{Component} from 'react';
import {Avatar,Grid,Paper,Typography,Dialog,Button,
FormControl} from '@material-ui/core';
import {GenerarCampo} from '../../Campos';
import {ObtenerPlantilla} from '../../Plantillas';
import IconAvatar from '@material-ui/icons/AccountCircle'
import FingerIcon from '@material-ui/icons/Fingerprint';


export default class IngresoPersona extends Component{
    constructor(props){
        super(props);

        
        this.state={
            datos:props.valores === undefined ? {} : props.valores,
            foto:null,
            firma:null,
            huellas:null,
            dialogo:props.dialogo === undefined ? false : props.dialogo,
            etapa:0,
            confirmado:false,
            pasos:['Pedir Datos de la Persona'],
            plantilla:ObtenerPlantilla('Persona'),
        }
        this.actualizar = props.actualizar;
        this.salir = props.salir;
    }

    componentWillReceiveProps(props){
        if(props.valores != null){
            this.setState({datos:props.valores});
        }
    }

    actualizarVal(val,campo){
        let datos = this.state.datos;
        datos[campo] = val
        this.actualizar(val,campo)
    }

    render(){

        let amb = <Grid container spacing={20} style={{paddingBottom:'10px'}}>
                <FormControl>
                <Grid item xs direction='column'>
                    {this.state.plantilla.map((elem,ind)=>GenerarCampo(elem,this.state.datos[elem],(val)=>this.actualizarVal.bind(this)(val,elem)))}
                </Grid>
                <Grid container xs justify={"flex-end"} alignItems={"center"} spacing={10}>
                    <Grid item xs>
                        <Paper style={{height:'100px'}}>
                            <Typography>Firma del Responsable</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Avatar style={{width:'100px',height:'100px'}}><IconAvatar/></Avatar>
                    </Grid>
                </Grid>
                </FormControl>
            </Grid>

        let cont = <div>
            {amb}
        </div>

        let icono = <div> Confirmar <FingerIcon/></div>

        let boton = <Button variant="contained" color={this.state.confirmando ? 'secondary':'primary' }
        onClick={()=>{
            if(this.state.confirmado === false){
                this.setState({confirmado:true})
            }
            else{
                this.salir();
            }
        }} 
        > {this.state.confirmando ?  icono : "Siguiente" } </Button>

        if( this.state.etapa === this.state.pasos.length - 1){
        boton = <Button variant='contained' color='primary' onClick={this.salir} >Finalizar</Button>
        }

        if(this.state.dialogo === true){
            cont = <Dialog onEscapeKeyDown={this.salir} onBackdropClick={this.salir}
                    style={{height:'90vh',width:'90vw',display:'block',textAlign:'center'}}
                   open={true}
                   >
                   {amb}
                   {boton}
                   </Dialog>
        }

    
        return(
            <div>
            {cont}
            </div>
            )
    }
}




class AMB extends Component{
    constructor(props){
        super(props);
        this.state = {
            plantilla:props.plantilla,
            tipo:props.tipo,
            valores:{},
        }
        this.actualizar = props.actualizar;
        
    }

    componentWillReceiveProps(props){
        this.setState({plantilla:props.plantilla,valores:props.valores})
    }


    render(){
        return(<div>
            <Typography variant='h4'> Datos de la Agencia</Typography>
            <FormControl>
                {this.state.plantilla.map((elem,ind)=>GenerarCampo(elem,this.state.valores[elem],(val)=>this.actualizar(val,elem)))}
            </FormControl>
        </div>)
    }
}