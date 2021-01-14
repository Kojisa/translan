from bottle import Bottle,route,request,static_file
from json import dumps,loads
from DbHandler import DBServer
Relaciones = Bottle()

db = DBServer()

@Relaciones.route('/<:re:.*>', method='OPTIONS')
def dummy():
    return


#genericamente genera un vinculo entre dos IDS, sus respectivos tipos (vehiculo, persona, etc) y un dato extra que explica el tipo de vinculacion.
@Relaciones.route('/generar',method='POST')
def generarRelacion():

    datos = request.json['datos']

    id1 = datos['id1']
    id2 = datos['id2']
    tipo1 = datos['tipo1']
    tipo2 = datos['tipo2']
    extra = datos['comentario'] #podria ser el tipo de vinculo entre las dos ids, como chofer, socio, CEO, etc

    orden = 'Insert into relaciones(id1,id2,tipo1,tipo2,comentario,fecha,vigente) \
    values(%(id1)s,%(id2)s,%(tipo1)s,%(tipo2)s,%(comentario)s,now(),1);'

    db.conectar()

    db.contestarQuery(orden,datos,False)

    db.aceptarCambios()

    db.desconectar()

    return

@Relaciones.route('/baja',method='POST')
def bajarRelacion():

    datos = request.json['datos']

    relacion = datos['relacion']
    
    orden = 'update relaciones set vigente = false where id = %(relacion)s'

    db.conectar()

    db.contestarQuery(orden,datos,False)
    db.aceptarCambios()

    db.desconectar()

    return



