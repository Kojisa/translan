from bottle import Bottle, route, run, response, hook, request, static_file
import bottle
import os,signal
import paste
from json import dumps,loads
from agencias import Agencias
from vehiculos import Vehiculos
from personas import Personas

from DbHandler import DBServer



default = Bottle()

bottle.BaseRequest.MEMFILE_MAX = (1024 * 1024) * 3 #maximo 3mb




@default.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'



@default.route('/<:re:.*>', method='OPTIONS')
def dummy():
    return


#ejemplo para importar modulos 'ruta principal', modulo)
#default.mount('/modulo',modulo.modulo)


default.mount('/agencias',Agencias)
default.mount('/vehiculos',Vehiculos)
default.mount('/personas',Personas)


@default.route('/archivos/recibir',method='POST')
def recibirArchivo():
    
    datos = loads(request.forms.get('datos'))
    nombre = datos['nombre'].replace(':','')
    request.files['file'].filename = nombre
    request.files['file'].save('./archivos/',True)

    ordenGuardar = 'INSERT INTO archivos(idvinculante,tipo,ruta,tipovinculante)\
        VALUES(%(idvinculo)s,%(tipo)s,%(ruta)s,%(tipovinculante)s);'
    
    db = DBServer()

    idarchivo = db.contestarQuery(ordenGuardar,{
        'idvinculo':datos['idvinculo'],
        'tipo':datos['tipo'],
        'tipovinculante':datos['tipovinculante'],
        'ruta':'./archivos/' + nombre,
    },False)

    db.aceptarCambios()

    return dumps({'archivo':idarchivo})


@default.route('/<modulo>')
def devolverModulo(modulo):
    return static_file(modulo,root="../../build/")

@default.route('/static/<tipo>/<modulo>')
def devolverModulo(modulo,tipo):
    return static_file(modulo,root="../../build/static/" + tipo)

@default.route('/')
def devolverPagina():
    return static_file("index.html",root="../../build/")



run(default,host = '0.0.0.0', port = 1800)#,server='paste')
