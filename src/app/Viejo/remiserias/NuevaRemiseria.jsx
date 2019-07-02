import React,{Component} from 'react';
import {TextField,MuiThemeProvider,createMuiTheme,Button,Typography} from '@material-ui/core';
import FingerIcon from '@material-ui/icons/Fingerprint';

const theme = createMuiTheme({
    palette:'dark',
})


export default class Principal extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            documentacionConfirmada:true,
        }
    }

    render(){

        let popUp = null;
        if(this.state.documentacionConfirmada === false){
            popUp = null; //poner objeto popup
        }

        let amb = null;
        if(this.state.documentacionConfirmada === true){
            amb = <AMB></AMB>
        }


        return(
            <div>
                {popUp}
                <div>
                    {amb}
                </div>
            </div>
        )
    }
}

class AMB extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            nombreFantasia:'',
            cuit:'',
            calle:'',
            altura:'',
            mail:'',
            telefono:'',
            responsable:'',
            cuitResponsable:'',

        }
    }

    generarCampos(){
        let campos = [
            {'campo':'Nombre de Fantasia','variable':'nombreFantasia','tipo':'text'},
            {'campo':'CUIT','variable':'cuit','tipo':'number'},
            {'campo':'Calle','variable':'calle','tipo':'text'},
            {'campo':'Altura','variable':'altura','tipo':'number'},
            {'campo':'Correo','variable':'mail','tipo':'text'},
            {'campo':'Telefono','variable':'telefono','tipo':'text'},
            {'campo':'Representante','variable':'representante','tipo':'text'},
            {'campo':'CUIT del Representante','variable':'cuitResponsable','tipo':'number'},
        ]

        let objetos = campos.map((elem,ind)=><div> <TextField 
            value={this.state[elem.variable]}
            onChange={(val)=>this.setState({[elem.variable]:val.target.value})}
            label={elem.campo} type={elem.tipo} key={ind}

        />
        </div>
        )

        return objetos
    }


    render(){
        
        return (
            <div>
                <Typography variant='title'>Nueva Remiseria</Typography>
                <div style={{marginTop:'5px'}}>
                        {this.generarCampos()}

                </div>
                <Button variant='contained' color='primary' style={{float:'right',margin:'10px'}}>Guardar <FingerIcon/></Button>
            </div>
        )
    }
}