from bottle import Bottle,route,request,static_file
from json import dumps,loads
from DbHandler import DBServer
Tramites = Bottle()

db = DBServer()

@Tramites.route('/<:re:.*>', method='OPTIONS')
def dummy():
    return

@Tramites.route('/crear',method='POST')
def crearTramite():

    datos = request.json['datos']

    query = 'insert into tramites(fecha,tipo,estado,etapa) values(now(),%(tipo)s,%(estado)s,%(etapa)s)'

    db.conectar()
    
    nroTramite = db.contestarQuery(query,datos)
    
    db.aceptarCambios()
    
    queryHistorial = 'insert into historialmovimientos(idtramite,estado,fecha,usuario,etapa)\
    values(%(idtramite)s,%(estado)s,now(),1,%(etapa)s)'
    db.contestarQuery(queryHistorial,{
        'idtramites':nroTramite,
        'estado':datos['estado'],
        'etapa':datos['etapa']
        })
    
    db.desconectar()

    return dumps({'tramite':nroTramite})


@Tramites.route('/avanzar',method='POST')
def crearTramite():

    datos = request.json['datos']

    db.conectar()

    query = 'update tramites set estado = %(estado)s ,etapa = %(etapa)s where id = %(nrotramite)s'

    db.contestarQuery(query,{
        'estado':datos['estado'],
        'etapa':datos['etapa'],
        'nrotramite':datos['tramite'],
    })

    queryHistorial = 'insert into historialmovimientos(idtramite,estado,fecha,usuario,etapa,comentario)\
    values(%(idtramite)s,%(estado)s,now(),1,%(etapa)s,%(comentario)s)'
    db.contestarQuery(queryHistorial,{
        'idtramites':datos['tramite'],
        'estado':datos['estado'],
        'etapa':datos['etapa'],
        'comentario':datos['comentario']
        })

    db.aceptarCambios()
    db.desconectar()
    return

'''reemplazar esta funcion con la de avanzar pero tomando un bool extra en datos
tambien puede usarse para anular, dando como finalizado el tramite'''
@Tramites.route('/finalizar',method='POST')
def finalizarTramite():

    datos = request.json['datos']

    db.conectar()

    query = 'update tramites set stado = %(estado)s, etapa = %(etapa)s, \
    fechafinalizado = now() where id=%(nrotramite)s'

    db.contestarQueryquery,{
        'estado':datos['estado'],
        'etapa':datos['etapa'],
        'nrotramite':datos['tramite'],
    })

    queryHistorial = 'insert into historialmovimientos(idtramite,estado,fecha,usuario,etapa) \
    values(%(idtramite)s,%(estado)s,now(),1,%(etapa)s)'
    db.contestarQuery(queryHistorial,{
        'idtramites':datos['tramite'],
        'estado':datos['estado'],
        'etapa':datos['etapa']
        })

    db.aceptarCambios()
    db.desconectar()
    return

@Tramites.route('/listado',method='POST')#cambiar a get
def devolvercabecera():
    
    datos = request.json['datos']

    estado = datos['estado'] #si es finalizado, cancelado, en revision, etc.

    query = 'select t.id as numero, ti.descripcion as tipovisible, t.tipo as tipo,\
    e.descripcion as estadovisible, t.estado as estado, et.descripcion as etapa,\
    t.fecha as fechainicio from tramites t inner join tipotramites ti on t.tipo = ti.id \
    inner join estadotramites e on t.estado = e.id inner join etapatramites'

    if(estado != -1):
        query += 'where t.estado = %(estado)s'
    
    db.conectar()

    final = db.contestarQuery(query,{
        'estado':estado
    })

    for tramite in final:
        tramite['fechainicio'] = tramite['fechainicio'].isoformat()

    db.desconectar()

    return dumps(final)

@Tramites.route('/devolverMovimientos',method='POST')
def devolverMovimientos():

    datos = request.json['datos']

    tramite = datos['idtramite']
    if(tramite == NULL):
        return dumps([])

    query = 'select ti.descripcion as tipovisible, t.tipo as tipo,\
    e.descripcion as estadovisible, t.estado as estado, et.descripcion as etapa,\
    t.fecha as fecha from historialmovimientos t inner join tipotramites ti on t.tipo = ti.id \
    inner join estadotramites e on t.estado = e.id inner join etapatramites where t.idtramite = %(tramite)s'

    db.conectar()

    final = db.contestarQuery(query,{
        'tramite':tramite
    })

    db.desconectar()

    for tramtie in final:
        tramite['fecha'] = tramite['fecha'].isoformat()

    return dumps(final)

