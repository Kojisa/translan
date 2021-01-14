from bottle import Bottle,route,request,static_file
from json import dumps,loads
from DbHandler import DBServer
Archivos = Bottle()

db = DBServer()

@Archivos.route('/<:re:.*>', method='OPTIONS')
def dummy():
    return


@Archivos.route('/anexarArchivo',method='POST')
def anexarArchivo():

    datos = request.json['datos']

    archivo = datos['archivo']
    id1 = datos['id']
    tipo = datos['tipo']
    tipoarch = ['tipoarch']
    
    