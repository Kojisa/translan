import React,{Component} from 'react';
import {Table, TableHead,TableBody,
    TableRow,TableCell,TextField} from '@material-ui/core';


export default class ArchivosPendientes extends Component{

    constructor(props){
        super(props);
        this.state={
            archivo:props.archivo,
            idarchivo:props.idarchivo,
            subiendo:false,
        }
        this.funSubir = props.funSubir;
        this.funAct = props.funAct;
    }


    render(){
        return <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Archivo
                        </TableCell>
                        <TableCell>
                            Subir
                        </TableCell>
                        <TableCell>
                            Aprobado
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <TextField
                                type='date' onChange={()=>}
                            >
                            </TextField>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    }
}