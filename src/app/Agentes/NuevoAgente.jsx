import React,{Component} from 'react';
import {Button,Typography,Paper,Stepper,
    StepLabel,Step,Select,MenuItem,Dialog,
    FormControl,FormControlLabel,Checkbox} from '@material-ui/core';
import FingerIcon from '@material-ui/icons/Fingerprint';
import {GenerarCampo} from '../Campos';
import {ObtenerPlantilla} from '../Plantillas';
import IngresoPersona from '../Personas/IngresoPersona';
import PantallaFinal from '../PantallaFinalIngreso';



export default class Principal extends Component{
    constructor(props){
        super(props);
        this.state={
            estadoMostrar:true,
            valoresAgencia:{},
            plantilla:[],
            valoresResponsable:{},
            tipo:null,
            etapa:0,
            confirmando:false,
            pasos:['Confirmar Tipo de Agente','Documentación Requerida',
            'Carga de Datos del Agente','Datos del Representante','Finalizado'],
            contStep:null,
            papelesPrevios:false,//estado de los papeles necesarios.
        }
        this.salir = props.salir
        this.funGuardar = props.funGuardar;
        this.funHabilitar = props.habilitar;
        this.actualizarValor = props.actualizarValor;
    }


    actualiarTipo(ev){
        let tipo = ev.target.value;
        let plantilla = ObtenerPlantilla(tipo)
        this.setState({tipo:tipo,plantilla:plantilla})
    }

    actualizarResponsable(val,campo){
        let resp = this.state.valoresResponsable;
        resp[campo] = val;
        console.log(val)
        console.log(campo)
        this.setState({valoresResponsable:resp});
    }

    papelesNecesarios(bool){
        this.setState({papelesPrevios:bool})
    }

    componentDidMount(props){
        this.setState({contStep:<Presentacion actualizar={this.actualiarTipo.bind(this)} tipo={this.state.tipo} />})
    }

    componentWillReceiveProps(props){
        this.setState({
            campos:props.campos,
        })
        this.funGuardar = props.funGuardar;
        this.funHabilitar = props.funHabilitar;
        this.actualizarValor = props.actualizarValor;
    }

    armarStepper(){
        return (<Stepper activeStep={this.state.etapa}>
                    {this.state.pasos.map((elem,ind)=><Step key={ind}>
                        <StepLabel> <Typography variant='caption'>{elem}</Typography>  </StepLabel>
                    </Step>)}
                </Stepper>)
    }

    actualizarDatosAgencia(val,campo){
        console.log(val)
        console.log(campo)
        let agencia = this.state.valoresAgencia;
        agencia[campo] = val;
        this.setState({valoresAgencia:agencia})
    }

    handlearBotonStep(){
        let estado = this.state.confirmando;
        if(estado === false){
            this.setState({confirmando:true});
            return;
        }
        let etapa = this.state.etapa
        if(etapa === 0){
            this.setState({confirmando:false,
                            etapa:etapa+1,
                            contStep:<PeticionDeDocumentacion actualizar={this.papelesNecesarios.bind(this)}/>})
        }
        if(etapa === 1){
            this.setState({confirmando:false,
                            etapa:etapa+1,
                            contStep:<AMB tipo={this.state.tipo} valores={this.state.valoresAgencia} 
                            actualizar={this.actualizarDatosAgencia.bind(this)}
                            plantilla={this.state.plantilla} ></AMB>})
        }
        if(etapa === 2){
            this.setState({confirmando:false,
                            etapa:etapa+1,
                            contStep: <div>
                                <Typography variant='h4'>Datos del Responsable</Typography>
                                <IngresoPersona actualizar={this.actualizarResponsable.bind(this)} 
                            valores = {this.state.valoresResponsable} dialogo={false}
                            ></IngresoPersona>
                            </div>
                
            })
        }
        if(etapa === 3){
            this.setState({confirmando:false,
                            etapa:etapa+1,
                            contStep: <PantallaFinal variable={this.state.tipo}></PantallaFinal>
            })
        }
    }

    botonGuardarHabilitado(){
        let etapa = this.state.etapa;
        if(etapa === 1){
            let papeles = this.state.papelesPrevios;
            return papeles ? true:false;
        }

        return true;
    }

    render(){
        let icono = <div> Confirmar <FingerIcon style={{fontSize:'20px',position:"relative",top:'5px'}}/></div>
        let habilitado = this.botonGuardarHabilitado.bind(this)();
        
        let boton = <Button variant="contained" color={this.state.confirmando ? 'secondary':'primary' }
            onClick={this.handlearBotonStep.bind(this)} disabled = {!habilitado}
        > {this.state.confirmando ?  icono : "Siguiente" } </Button>
        
        if( this.state.etapa === this.state.pasos.length - 1){
            boton = <Button variant='contained' color='primary' onClick={()=>{
                console.log(this.state);
                this.salir()}} >Finalizar</Button>
        }


        return( 
            <div >
                <Dialog
                    onEscapeKeyDown={this.salir}
                    onBackdropClick={this.salir}
                    style={{height:'90vh',width:'90vw',display:'block',textAlign:'center'}}
                    open={this.state.estadoMostrar}
                >
                    <div>
                        {this.state.contStep}
                    </div>
                    <div>
                        {this.armarStepper()}
                    </div>
                    {boton}
                    
                </Dialog>
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


class PeticionDeDocumentacion extends Component{
    constructor(props){
        super(props);
        this.state = {
            opciones:['Documento 1','Documento 2','Documento 3','Documento 4'], //opciones para los checklist
            estados:[false,false,false,false], //valores de los checklist
        }
        this.actualizar = props.actualizar; 
    }

    cambio(ev,ind){
        let estados = this.state.estados;
        estados[ind] = ev.target.checked;
        this.setState({estados:estados});
        for (let x = 0; x < estados.length; x++){
            if( estados[x] === false){
                this.actualizar(false);
                return
            }
        }
        this.actualizar(true);
    }


    render(){
        return(<div  style={{textAlign:'center'}}>
            <div>
                <Typography variant='h4'>Documentacion Previa Requerida </Typography>
                <Typography variant='body1'>Se considera la siguiente documentación como requisito indispensable 
                para poder continuar con el tramite</Typography>
            </div>
            <FormControl>
                {this.state.opciones.map((elem,ind)=><FormControlLabel control={ 
                    <Checkbox  onChange={(ev)=>this.cambio.bind(this)(ev,ind)} 
                            color = 'primary'
                            value={this.state.estados[ind]} />}
                            
                    label = {elem}
                    >
                    </FormControlLabel>)}
            </FormControl>
        </div>)
    }
}

class Presentacion extends Component{
    constructor(props){
        super(props);
        this.state={tipo:props.tipo}
        this.actualizar = props.actualizar;
        
    }

    componentWillReceiveProps(props){
        this.actualizar = props.actualiar;
        this.setState({tipo:props.tipo})
    }

    render(){
        return ( <div style={{textAlign:'center'}}>
                <Typography variant='h4'> Bienvenido al gestor de Ingreso de Agencias</Typography><br/>
                <Typography variant='body1' > A continuación se le pedira que indique el tipo de agencia que desea agregar</Typography><br/>
                <Select onChange={(ev)=>{this.actualizar(ev);this.setState({tipo:ev.target.value})}} value={this.state.tipo} style={{width:'200px'}}>
                    {['Escolar','Remiseria'].map((elem,ind)=><MenuItem value={elem} key={ind}>{elem}</MenuItem>)}
                </Select>
                <br/>
                
                <Typography variant='body1'> En cada etapa debera confirmar los datos guardados utilizando si huella digital </Typography>
                
        </div>)
    }
}