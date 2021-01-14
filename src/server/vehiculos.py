from bottle import Bottle,route,request,static_file
from json import dumps,loads
from DbHandler import DBServer

Vehiculos = Bottle()



@Vehiculos.route('/<:re:.*>', method='OPTIONS')
def dummy():
    return


@Vehiculos.route('/agregar',method='POST')
def ingresarVehiculo():

    datos = request.json['datos']

    ordenIngresar = 'INSERT INTO vehiculos (modelo,marca,dominio,anio) \
        values(%(modelo)s,%(marca)s,%(dominio)s,%(anio)s);'

    db = DBServer()

    vehiculo = db.contestarQuery(ordenIngresar,{
        'modelo':datos['modelo'],
        'marca':datos['marca'],
        'dominio':datos['dominio'],
        'anio':datos['anio'],
    },False)

    db.aceptarCambios()

    db.desconectar()

    return dumps({
        'vehiculo':vehiculo
    })



@Vehiculos.route('/listar',method='POST')
def listarVehiculos():

    ordenListar = 'SELECT modelo,marca,dominio,anio, FROM vehiculos order by dominio;'

    db = DBServer()

    listado = db.contestarQuery(ordenListar)
    
    db.desconectar()

    return dumps(listado)

@Vehiculos.route('/vincularAgencia',method='POST')
def vincularAgencia():

    datos = request.json['datos']
    agencia = datos['agencia']
    vehiculo = datos['vehiculo']
    archivo = datos['archivo']

    db = DBServer()

    ordenVincularAgenciaVehiculo = 'INSERT INTO relaciones (id1,tipo1,id2,tipo2,fecha,\
        comentario,vigente) VALUES (%(agencia)s,"Agencia",%(vehiculo)s,"Vehiculo",\
            now(),"Vinculacion",1);'

    ordenCertificado = 'INSERT INTO relaciones (id1,tipo1,id2,tipo2,fecha,\
        comentario,vigente) VALUES (%(relacion)s,"Relacion",%(archivo)s,"Archivo"\
            ,now(),"Documento",1);'

    relacion = db.contestarQuery(ordenVincularAgenciaVehiculo,{
        'agencia':agencia,
        'vehiculo':vehiculo,
    },False)


    db.contestarQuery(ordenCertificado,{
        'relacion':relacion,
        'archivo':archivo
    },False)

    db.aceptarCambios()

    db.desconectar()

    return 


@Vehiculos.route('/agregarConductor',method='POST')
def agregarConductor():

    datos = request.json['datos']

    persona = datos['persona']
    vehiculo = datos['vehiculo']
    #archivo = datos['archivo']

    ordenRelacionPersonaVehiculo = 'INSERT INTO relaciones(id1,tipo1,id2,tipo2,fecha,comentario,vigente)\
        values (%(persona)s,"Persona",%(vehiculo)s,"Vehiculo",now(),"Conductor",1);'

    db = DBServer()

    relacion = db.contestarQuery(ordenRelacionPersonaVehiculo,{
        'persona':persona,
        'vehiculo':vehiculo
    },False)

    db.aceptarCambios()

    db.desconectar()

    return dumps({'relacion':relacion})



@Vehiculos.route('/agregarTitular',method='POST')
def agregarTitular():

    datos = request.json['datos']

    persona = datos['persona']
    vehiculo = datos['vehiculo']
    archivo = datos['archivo']

    ordenRelacionPersonaVehiculo = 'INSERT INTO relaciones(id1,tipo1,id2,tipo2,fecha,comentario,vigente)\
        values (%(persona)s,"Persona",%(vehiculo)s,"Vehiculo",now(),"Titular",1);'
    
    ordenCedula = 'INSERT INTO relaciones(id1,tipo1,id2,tipo2,fecha,comentario,vigente)\
        values(%(relacion)s,"Relacion",%(archivo)s,"Archivo",now(),"Cedula Verde",1);'

    db = DBServer()

    relacion = db.contestarQuery(ordenRelacionPersonaVehiculo,{
        'persona':persona,
        'vehiculo':vehiculo,
    },False)

    db.contestarQuery(ordenCedula,{
        'relacion':relacion,
        'archivo':archivo
    },False)

    db.aceptarCambios()
    db.desconectar()

    return dumps({'relacion':relacion})


@Vehiculos.route('/listarConductores',method='POST')
def devolverConductores():

    datos = request.json['datos']
    vehiculo = datos['vehiculo']

    ordenChoferes = 'SELECT concat(p.apellido, " ", p.nombre) as nombre, p.cuit as cuit,\
        p.conductor as habilitado, v.comentario as vinculo ,v.fecha as fechaVinculo \
        from personas p inner join relaciones v on v.id1 = p.id and v.tipo1 = "Persona" \
        where v.id2 = %(vehiculo)s and v.tipo2= "Vehiculo" and\
         (v.comentario = "Titular" or v.comentario = "Conductor") order by v.comentario DESC; '

    db = DBServer()

    listado = db.contestarQuery(ordenChoferes,{
        'vehiculo':vehiculo
    })

    db.desconectar()

    for res in listado:
        res['fechaVinculo'] = res['fechaVinculo'].isoformat()

    return dumps(listado)

@Vehiculos.route('/listar',method='GET')
def listarVehiculos():

    db = DBServer()

    orden = 'SELECT dominio, marca, modelo, anio FROM vehiculos order by dominio;'

    listado = db.contestarQuery(orden)

    db.desconectar()

    return dumps(listado)
