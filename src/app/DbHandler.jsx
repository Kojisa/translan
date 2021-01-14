import { ThemeProvider } from "@material-ui/core";

export default class DBHandler{
    
    HOST = 'localhost:1800'//
    
    

    ///////////////////////////////////////////////////////////////////////
    //                           Personas                                //
    ///////////////////////////////////////////////////////////////////////

    ingresarPersona(datos,fun){
        this.enviarPeticion(fun,'personas/agregar','POST',datos,true,false);
    }

    pedirPersonas(fun){
        this.enviarPeticion(fun,'personas/listar','GET',null,true,false);
    }

    pedirPersona(fun,datos){
        this.enviarPeticion(fun,'personas/devolver','POST',datos,true,false);
    }

    enviarHabilitacionConductor(fun,datos){
        this.enviarPeticion(fun,'personas/habilitarConductor','POST',datos,true,false);
    }


    ///////////////////////////////////////////////////////////////////////
    //                            Vehiculos                              //
    ///////////////////////////////////////////////////////////////////////

    ingresarVehiculo(datos,fun){
        this.enviarPeticion(fun,'vehiculos/agregar','POST',datos,true,false);
    }


    agregarTitular(datos,fun){
        this.enviarPeticion(fun,'vehiculos/agregarTitular','POST',datos,true,false)
    }


    pedirConductores(datos,fun){
        this.enviarPeticion(fun,'vehiculos/listarConductores','POST',datos,true,false)
    }

    agregarConductor(datos,fun){
        this.enviarPeticion(fun,'vehiculos/agregarConductor','POST',datos,true,false)
    }

    pedirVehiculos(fun){
        this.enviarPeticion(fun,'vehiculos/listar','GET')
    }


    ////////////////////////////////////////////////////////////////////////
    //                  Agencias                                          //
    ////////////////////////////////////////////////////////////////////////
    
    ingresarRemiseria(datos,fun){
        this.enviarPeticion(fun,'agencias/agregar','POST',datos,true,false)

    }

    pedirAgencias(fun){
        this.enviarPeticion(fun,'agencias/listar','GET',null,true,false)
    }

    enviarHabilitacionAgencia(datos,fun){
        this.enviarPeticion(fun,'agencias/generarHabilitacion','POST',datos,true,false);
    }

    enviarArchivo(archivo,datos,fun){
        this.enviarPeticion(fun,'archivos/recibir','POST',datos,true,false,archivo);

    }

    enviarPeticion(fun,url,metodo,datos,asinc=true,auth=false,archivo=null){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            if (fun != null){
            if (this.responseText.length > 0){
                fun(JSON.parse(this.responseText));
            }
            else{
                fun();
            }
            }
        }
        };
        request.open(metodo,"http://"+this.HOST+"/"+url,asinc);
        var datosFinales = {};
        datosFinales["datos"] = datos;
        if(auth){
            //request.setRequestHeader('id',id);
        }
        if (metodo === "POST"){
            if(archivo != null){
                let form = new FormData();
                form.append('file',archivo,archivo.name);
                form.append('datos',JSON.stringify(datos));
                request.send(form)
            }
            else{
                request.setRequestHeader('Content-type','application/json');
                request.send(JSON.stringify(datosFinales));
            }
            
        }
        else {request.send();}
    }

}