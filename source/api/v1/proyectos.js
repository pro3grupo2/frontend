const {fetch_handler} = require('.')

const PROYECTOS_ROUTE = '/proyectos'

const get_proyectos = async (token, page = 0, filters = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    let filters_query = 'ignore=true'
    if (filters) filters_query = Object.keys(filters).map(key => key + '=' + filters[key]).join('&')

    const datos = await fetch_handler(PROYECTOS_ROUTE + `?page=${page}&` + filters_query, headers, "GET")
    return datos ? datos.data : null
}

const get_proyecto = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PROYECTOS_ROUTE + '/' + id, headers, "GET")
    return datos ? datos.data : null
}

const subir_ficheros = async (token, fichero = null, portada = null) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const body = new FormData()
    body.append('url', fichero)
    body.append('portada', portada)

    const datos = await fetch_handler(PROYECTOS_ROUTE + "/subir", headers, "POST", body)
    return datos ? datos.data : null
}

const crear_proyecto = async (token, titulo, ficha, url, portada, anio, participantes, proyectos_asignaturas, premios, premiado = false) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo, ficha: ficha, url: url, portada: portada, anio: anio, participantes: participantes, proyectos_asignaturas: proyectos_asignaturas, premiado: premiado, premios: premios
    })

    const datos = await fetch_handler(PROYECTOS_ROUTE, headers, "POST", body)
    return datos ? datos.data : null
}

const eliminar_proyecto = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PROYECTOS_ROUTE + '/' + id, headers, "DELETE")
    return datos ? datos.data : null
}

const aceptar_proyecto = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PROYECTOS_ROUTE + '/' + id + '/aceptar', headers, "GET")
    return datos ? datos.data : null
}

const rechazar_proyecto = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PROYECTOS_ROUTE + '/' + id + '/rechazar', headers, "GET")
    return datos ? datos.data : null
}

module.exports = {
    get_proyectos, get_proyecto, subir_ficheros, crear_proyecto, eliminar_proyecto, aceptar_proyecto, rechazar_proyecto
}
