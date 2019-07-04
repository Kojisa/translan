import React,{Component} from 'react';
import {FormControlLabel,Switch,Button,IconButton,
     Typography} from '@material-ui/core';
import ListadoSelectivo from '../Utils/ListadoSelectivo';
import FingerIcon from '@material-ui/icons/Fingerprint';



export default class RenovacionVencimiento extends Component{
    constructor(props){
        super(props);
        this.state={
            agencias:[
                {Numero:'1',Nombre:'Remiseria Uno',Vencimiento:'10/04/2019'},
                {Numero:'2',Nombre:'Remiseria Lanus',Vencimiento:'20/05/2020'},
                {Numero:'3',Nombre:'La plaza',Vencimiento:'07/01/2019'},
            ],
            agencia:'',
            documentacionNecesaria:[
                'Nota Solicitando Renovación',
                'Firma de Representante Legal / Apoderado',
                'Antecedentes Penales de Representante Legal / Apoderado',
                'Pago de Canon',
            ],
        }
    }

    seleccionarAgencia(datos){
        this.setState({
            agencia:datos
        })
    }


    render(){

        let muestra = 
            <div>
                <Typography>Agencias Disponibles para Renovación</Typography>
            <ListadoSelectivo
            listado = {this.state.agencias}
            campos = {['Numero','Nombre','Vencimiento']}
            funAct = {this.seleccionarAgencia.bind(this)}
        />
        </div>


        if(this.state.agencia !== ''){
            muestra = <DocumentacionNecesaria
            documentos={this.state.documentacionNecesaria}
            elegido={this.state.agencia}
            funAct={this.seleccionarAgencia.bind(this)}
            />
        }

        return(<div>
            {muestra}
        </div>)
    }
}



class DocumentacionNecesaria extends Component{
    constructor(props){
        super(props);
        this.state={
            elegido:props.elegido,
            documentos:props.documentos === undefined ? []:props.documentos,
            checks:props.documentos === undefined? []:props.documentos.map((elem,ind)=>false),
            confirmar:false,
            habilitado:true
        }
        this.actualizarValores = props.funAct;

    }

    actualizarCheck(ind,val){
        let checks = this.state.checks;
        checks[ind] = val;
        let habilitado = false
        for (let x = 0; x < checks.length ; x++){
            if(checks[x] === false){
                habilitado = true;
                break;
            }
        }
        this.setState({
            checks:checks,
            habilitado:habilitado
        })
    }

    componentWillReceiveProps(props){

        this.setState({
            elegido:props.elegido,
            documentos:props.documentos === undefined ? []:props.docucmentos,
            checks:props.documnentos === undefined? []:props.documentos.map((elem,ind)=>false),
            confirmar:false,
        })
    }



    render(){
        let boton = <Button color='primary'
            onClick={()=>this.setState({confirmar:true})}
            disabled = {this.state.habilitado}
            >Aprobar Tramite</Button>

        if(this.state.confirmar === true){
            boton = <IconButton onClick={()=>this.actualizarValores('')}
            color='secondary'  > <FingerIcon/></IconButton>
        }

        return(<div>
            <Typography>Documentos a ser Presentados</Typography>
            <Typography>Los siguientes documentos son necesarios para 
                poder renovar la fecha de vencimiento de la Agencia {this.state.elegido.Nombre}</Typography>
            {
                this.state.checks.map((elem,ind)=>
                <div>
                <FormControlLabel
                control={
                    <Switch
                        checked={elem}
                        onChange={(ev)=>this.actualizarCheck.bind(this)(ind,ev.target.checked)}
                    ></Switch> 
                } label={this.state.documentos[ind]} labelPlacement='start'
            ></FormControlLabel></div>)
            }
            {boton}
        </div>)
    }
}