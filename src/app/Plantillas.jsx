export function PlantillaEscolares(){
    return ["Nombre de Fantasia","CUIT","Dirección","Telefono","Tipo IVA","Localidad"];
}

export function PlantillaRepresentante(){
    return [];
}

export function PlantillaVehiculos(){
    return ["Marca","Modelo","Patente","Año","Observaciones",'Color'];
}

export function Persona(){
    return ['Nombre','Apellido','DNI','CUIT','Nombre de Fantasia'
    ,'Fecha de Nacimiento','Dirección','Altura','Localidad'];
}



export function ObtenerPlantilla(tipo){
    let dic = {
        'Escolar':PlantillaEscolares,
        'Remiseria':PlantillaEscolares,
        'Representante':PlantillaRepresentante,
        'Persona':Persona,
        'Vehiculo':PlantillaVehiculos,
    }
    return dic[tipo]()
}