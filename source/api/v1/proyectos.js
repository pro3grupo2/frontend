const {fetch_handler} = require('.')

const PROYECTOS_ROUTE = '/proyectos'

const get_proyectos = async (token, page = 0, filters = undefined, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    let filters_query = 'ignore=true'
    if (filters) filters_query = Object.keys(filters).map(key => key + '=' + filters[key]).join('&')

    const datos = await fetch_handler(PROYECTOS_ROUTE + `?page=${page}&` + filters_query, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

const get_proyectos_pendientes = async (token, page = 0, filters = undefined, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    let filters_query = 'ignore=true'
    if (filters) filters_query = Object.keys(filters).map(key => key + '=' + filters[key]).join('&')

    const datos = await fetch_handler(PROYECTOS_ROUTE + `/pendientes?page=${page}&` + filters_query, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

const get_proyectos_rechazados = async (token, page = 0, filters = undefined, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    let filters_query = 'ignore=true'
    if (filters) filters_query = Object.keys(filters).map(key => key + '=' + filters[key]).join('&')

    const datos = await fetch_handler(PROYECTOS_ROUTE + `/rechazados?page=${page}&` + filters_query, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

const get_me_proyectos = async (token, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PROYECTOS_ROUTE + '/me', headers, "GET", undefined, callback)
    console.log(datos)
    return datos ? datos.data : null
}

const get_proyecto = async (token, id, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PROYECTOS_ROUTE + '/' + id, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

const subir_ficheros = async (token, fichero = null, portada = null, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const body = new FormData()
    body.append('url', fichero)
    body.append('portada', portada)

    const datos = await fetch_handler(PROYECTOS_ROUTE + "/subir", headers, "POST", body, callback)
    return datos ? datos.data : null
}

const crear_proyecto = async (token, titulo, ficha, url, portada, anio, participantes, proyectos_asignaturas, premios, premiado = false, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo, ficha: ficha, url: url, portada: portada, anio: anio, participantes: participantes, proyectos_asignaturas: proyectos_asignaturas, premiado: premiado, premios: premios
    })

    const datos = await fetch_handler(PROYECTOS_ROUTE, headers, "POST", body, callback)
    return datos ? datos.data : null
}

const eliminar_proyecto = async (token, id, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PROYECTOS_ROUTE + '/' + id, headers, "DELETE", undefined, callback)
    return datos ? datos.data : null
}

const aceptar_proyecto = async (token, id, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PROYECTOS_ROUTE + '/' + id + '/aceptar', headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

const rechazar_proyecto = async (token, id, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PROYECTOS_ROUTE + '/' + id + '/rechazar', headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

module.exports = {
    get_proyectos,
    get_proyectos_pendientes,
    get_proyectos_rechazados,
    get_me_proyectos,
    get_proyecto,
    subir_ficheros,
    crear_proyecto,
    eliminar_proyecto,
    aceptar_proyecto,
    rechazar_proyecto
}
