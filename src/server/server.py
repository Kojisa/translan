from bottle import Bottle, route, run, response, hook, request, static_file
import os,signal
import paste

default = Bottle()

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




@default.route('/<modulo>')
def devolverModulo(modulo):
    return static_file(modulo,root="../../build/")

@default.route('/static/<tipo>/<modulo>')
def devolverModulo(modulo,tipo):
    return static_file(modulo,root="../../build/static/" + tipo)

@default.route('/')
def devolverPagina():
    return static_file("index.html",root="../../build/")



run(default,host = '0.0.0.0', port = 1800,server='paste')
