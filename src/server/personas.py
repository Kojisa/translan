from bottle import Bottle,route,request,static_file
from json import dumps,loads
from DbHandler import DBServer

Personas = Bottle()



@Personas.route('/<:re:.*>', method='OPTIONS')
def dummy():
    return

@Personas.route('/devolver',method='POST')
def devolverPersona():

    datos = request.json['datos']
    persona = datos['persona']

    db = DBServer()

    ordenPersona = 'SELECT nombre,apellido,cuit,documento,fechanacimiento,nacionalidad,\
    conductor FROM personas where id = %(persona)s'
    resultado = db.contestarQuery(ordenPersona,{
        'persona':persona
    })[0]
    resultado['fechanacimiento'] = resultado['fechanacimiento'].isoformat()
    
    db.desconectar()

    return dumps(resultado)

@Personas.route('/devolverPermisoConducir',method='POST')
def devolverPermisoConducir():
    
    datos = request.json['datos']

    db = DBServer()

    ordenBuscar = 'SELECT id, vencimiento from habilitaciones where idvinculada = %(persona)s\
        and tipo = "Licencia Conducir" order by fecha DESC;'

    resultados = db.contestarQuery(ordenBuscar,{
        'persona':datos['persona']
    })
    db.desconectar()

    if(len(resultados) >= 0):
        resultados = resultados[0]
        resultados['vencimiento'] = resultados['vencimiento'].isoformat()
        return dumps(resultados)
    
    else:
        return dumps(None)
    

@Personas.route('/habilitarConductor',method='POST')
def habilitarConductor():

    datos = request.json['datos']

    db = DBServer()

    ordenHabilitacion = 'INSERT INTO habilitaciones (idvinculada,tipo,fecha,vencimiento)\
        VALUES (%(persona)s,"Licencia Conducir", now(), %(fecha)s);'

    ordenVinculo = 'INSERT INTO relaciones (id1,tipo1,id2,tipo2,fecha,comentario,vigente)\
        VALUES (%(habilitacion)s,"Habilitacion",%(archivo)s,"Archivo",now(),"Licencia Conducir",\
        1);'
    
    ordenHabilitarConductor = "UPDATE personas set conductor = 1 where id = %(persona)s"

    habilitacion = db.contestarQuery(ordenHabilitacion,{
        'persona':datos['persona'],
        'fecha':datos['vencimiento']
    },False)

    db.contestarQuery(ordenVinculo,{
        'habilitacion':habilitacion,
        'archivo':datos['archivo'],
    },False)

    db.contestarQuery(ordenHabilitarConductor,{
        'persona':datos['persona']
    },False)
    db.aceptarCambios()
    db.desconectar()

    return dumps({'habilitacion':habilitacion})



@Personas.route('/agregar',method='POST')
def agregarPersona():

    datos = request.json['datos']

    ordenAgregar = 'INSERT INTO personas(nombre,apellido,tipodoc,documento,cuit,\
        fechanacimiento,nacionalidad) VALUES (%(nombre)s,%(apellido)s,"DNI",%(dni)s,\
        %(cuit)s,%(fechanacimiento)s,%(nacionalidad)s);'
    
    db = DBServer()

    idpersona = db.contestarQuery(ordenAgregar,{
        'nombre':datos['nombre'],
        'apellido':datos['apellido'],
        'dni':datos['dni'],
        'cuit':datos['cuit'],
        'fechanacimiento':datos['fechanacimiento'],
        'nacionalidad':datos['nacionalidad']
    },False)

    db.aceptarCambios()
    db.desconectar()

    return dumps({
        'persona':idpersona
    })


@Personas.route('/listar',method='GET')
def listarPersonas():

    ordenListar = 'SELECT id,concat(apellido, " ",nombre) as nombre, documento as dni, cuit,conductor \
        FROM personas order by apellido'
    
    db = DBServer()

    listado = db.contestarQuery(ordenListar)

    db.desconectar()

    return dumps(listado)



