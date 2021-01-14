from bottle import Bottle,route,request,static_file
from json import dumps,loads
from DbHandler import DBServer
Agencias = Bottle()



@Agencias.route('/<:re:.*>', method='OPTIONS')
def dummy():
    return


@Agencias.route('/agregar',method='POST')
def agregarAgencia():

    datos = request.json['datos']

    agencia = datos['agencia']
    casaCentral = datos['casaCentral']
    ordenAgencia = 'INSERT INTO agencias (nombrefantasia, tipo, cuit, habilitada)\
    VALUES (%(nombreFantasia)s,"Remiseria",%(cuit)s,0);'

    ordenCasaCentral = 'INSERT INTO direcciones (calle, numero, dpto, localidad)\
        VALUES( %(calle)s,%(altura)s,%(dpto)s,%(localidad)s);'

    relacionDireAgencia = 'INSERT INTO relaciones(id1,tipo1,id2,tipo2,fecha,comentario,vigente)\
        VALUES(%(idAgencia)s,"Agencia",%(idDireccion)s,"Direccion",now(),"Casa Central",1);'
    
    db = DBServer()

    idAgencia = db.contestarQuery(ordenAgencia,agencia,False)

    idDireccion = db.contestarQuery(ordenCasaCentral,casaCentral,False)

    db.contestarQuery(relacionDireAgencia,{
        'idAgencia':idAgencia,
        'idDireccion':idDireccion,
    },False)

    db.aceptarCambios()
    db.desconectar()

    return dumps({'agencia':idAgencia})


@Agencias.route('/generarHabilitacion',method='POST')
def generarHabilitacion():

    datos = request.json['datos']
    fecha = datos['fecha']
    agencia = datos['agencia']
    archivo = datos['archivo']

    ordenHabilitacion = 'INSERT INTO habilitaciones(idvinculada, tipo, fecha,vencimiento)\
        VALUES (%(agencia)s,"Cuarentena", now(),%(vencimiento)s);'

    ordenVinculo = 'INSERT INTO relaciones (id1,tipo1,id2,tipo2,fecha,comentario,vigente)\
        values (%(habilitacion)s,"Habilitacion",%(archivo)s,"Archivo",now(),"Habilitacion",1);'

    ordenHabilitarAgencia = 'UPDATE agencias set habilitada = 1 where id = %(agencia)s'

    db = DBServer()


    habilitacion = db.contestarQuery(ordenHabilitacion,{
        'agencia':agencia,
        'vencimiento':fecha
    },False)

    db.contestarQuery(ordenVinculo,{
        'habilitacion':habilitacion,
        'archivo':archivo,
    },False)

    db.contestarQuery(ordenHabilitarAgencia,{
        'agencia':agencia
    },False)

    db.aceptarCambios()
    db.desconectar()

    return dumps({'habilitacion':habilitacion})


@Agencias.route('/listar',method='GET')
def devolverAgencias():

    db = DBServer()

    ordenDevolver = 'SELECT id,nombrefantasia,cuit,habilitada FROM agencias;'

    resultado = db.contestarQuery(ordenDevolver)

    db.desconectar()
    return dumps(resultado)