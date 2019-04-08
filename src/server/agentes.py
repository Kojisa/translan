from bottle import Bottle,route,request,static_file
from json import dumps,loads
Agentes = Bottle()


@Agentes.route('/<:re:.*>', method='OPTIONS')
def dummy():
    return



@Agentes.route('/agregar',method='OPTIONS')
def agregarAgente():
    