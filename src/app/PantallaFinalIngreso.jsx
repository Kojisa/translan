import React,{Component} from 'react';
import {Grid,Typography,Paper} from '@material-ui/core';




export default class MuestraFinal extends Component{
    constructor(props){
        super(props);
        this.state={
            variable:props.variable
        }
    }

    render(){
        return <Grid container direction={'column'}>
            <Grid item xs>
                <Typography variant='h3' >{this.state.variable} agregado correctamente </Typography>
            </Grid>
            <Grid>
                <Typography variant='body1'> Codigo QR </Typography>
                <Paper zDepth={1} rounded={true} circle={false} >
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK8AAACvAQMAAACxXBw2AAAABlBMVEX///8AAABVwtN+AAABA0lEQVRIx+3VMQ7DIAwFUJgYfaNwsya9mbmRx0z8/k8r9QTA0P7IivQ61JFNkv75gRQwDYgaycBc89lHZfBuJFvADb24tThIT/TdnGrUOBYzsI5dZU2TF21kMI3NqcDMZ0UbaNDslelcOi83twb/PvxU1uzvlA520+IEIm3jDC9qDixuoF3zud75zvx/1cOABTzOmnUOoIlsH9dbzR3EzjvbnM/qBJHG5LNO2nTWmmnZzK2nMx62kcv7HdsNQJyR5rOSx7ttjGEBFzA+Hl1fEp60+eyj6qcTyjbWZ5TbRwbDFhexMDK6LWMfx9u53+dGdv0UWvsGrGEwYu3gxWsu//OzeQEyF0+jqCoVigAAAABJRU5ErkJggg==
" alt=""/>
                </Paper>
            </Grid>
        </Grid>
    }
}