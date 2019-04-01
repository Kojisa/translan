import React,{Component} from 'react';
import {TextField,MenuItem,Select,InputLabel,NativeSelect,
    FormControl} from '@material-ui/core';

let TIPOTEXTO=['Nombre','Nombre de Fantasia','Apellido','DNI','CUIT','Mail',
'Dirección','Telefono','Responsable','Cuit Responsable','DNI Responsable',
'Marca','Modelo','Patente','Observaciones','Color']

let TIPONUMERO=['Altura','Tel.','Año']

let TIPOFECHA=['Fecha de Inscripción','Fecha de Nacimiento']

let TIPOSLIDER=['Localidad','Tipo IVA','Tipo Agente']

export function GenerarCampo(tipo,variable,actualizador){
    
    if(TIPOTEXTO.indexOf(tipo) > -1){
        return <TextField value={variable} onChange={actualizador === null ? null: (ev)=>actualizador(ev.target.value)} 
        label={tipo} />
    }
    else if (TIPONUMERO.indexOf(tipo) > -1){
        return <TextField value={variable} onChange={actualizador === null ? null: (ev)=>actualizador(ev.target.value)} 
        label={tipo} type='number' />
    }

    else if(TIPOFECHA.indexOf(tipo) > -1){
        return <TextField value={variable} onChange={actualizador === null ? null: (ev)=>actualizador(ev.target.value)}
        label={tipo}  type='date' />
    }  

    else if(TIPOSLIDER.indexOf(tipo) > -1){
        return <FormControl>
                    <InputLabel htmlFor={'select'+tipo} shrink>{tipo}</InputLabel>
                    <NativeSelect value={variable} onChange={actualizador === null ? null: (ev)=>actualizador(ev.target.value)} 
                    id={'select'+tipo} >{cargarItems(tipo)}</NativeSelect>
                </FormControl>
    }
}


function cargarItems(tipo){
    let opcionesActividadPrincipal = [  <option value=""></option>,
                                        <option value={'Remiseria'}>Remisería</option>,
                                        <option value={'Transporte Escolar'}>Transporte Escolar</option> ];
    
    let opcionesPartido = [ <option value=""></option>,
                            <option value='Lanus'>Lanus</option>,
                            <option value='Lomas de Zamora'> Lomas de Zamora</option>];

    let opcionesIVA = [ <option value=""></option>,
                        <option value='Exento'> Exento</option>,
                        <option value='Responsable Inscripto'> Responsable Inscripto</option>,
                        <option value="Monotributista"> Monotributista </option>];

    if(tipo === 'Localidad'){
        return opcionesPartido
    }
    if(tipo === 'Tipo IVA'){
        return opcionesIVA
    }
    if(tipo === 'Tipo Agente'){
        return opcionesActividadPrincipal
    }
}


