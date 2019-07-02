from bottle import Bottle,route,request,static_file
from json import dumps,loads
from DbHandler import DBServer
Agentes = Bottle()

db = DBServer()

@Agentes.route('/<:re:.*>', method='OPTIONS')
def dummy():
    return



@Agentes.route('/agregar',method='OPTIONS')
def agregarAgente():
    
    datos = request.json['datos']
    agente = datos['agente']
    responsable = datos['responsable']

    ordenAgente = 'INSERT INTO agentes(nombreFantasia,cuit,direccion,telefono,tipoIva,localidad)\
        values(%(Nombre de Fantasia)s,%(CUIT)s,%(Dirección)s,%(Telefono)s,%(Tipo IVA)s,%(Localidad)s'
    ordenRelacionAgentePersona ='INSERT INTO '