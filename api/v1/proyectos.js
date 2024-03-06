const {fetch_handler} = require('.')

const PROYECTOS_ROUTE = '/proyectos'

const get_proyectos = async (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PROYECTOS_ROUTE, headers, "GET")
    return datos ? datos.data : null
}

const get_proyecto = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PROYECTOS_ROUTE + '/' + id, headers, "GET")
    return datos ? datos.data : null
}

const crear_proyecto = async (token, titulo, ficha, url, portada, participantes, id_asignatura = null) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const body = new FormData()
    body.append('titulo', titulo)
    body.append('ficha', ficha)
    body.append('url', url)
    body.append('portada', portada)
    body.append('participantes', JSON.stringify(participantes))
    if (id_asignatura) body.append('id_asignatura', id_asignatura)

    const datos = await fetch_handler(PROYECTOS_ROUTE, headers, "POST", body)
    return datos ? datos.data : null
}

const editar_proyecto = async (token, id, titulo, ficha, url, participantes, id_asignatura = null) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const body = new FormData()
    body.append('titulo', titulo)
    body.append('ficha', ficha)
    body.append('url', url)
    body.append('participantes', JSON.stringify(participantes))
    if (id_asignatura) body.append('id_asignatura', id_asignatura)

    const datos = await fetch_handler(PROYECTOS_ROUTE + '/' + id, headers, "PUT", body)
    return datos ? datos.data : null
}

const eliminar_proyecto = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PROYECTOS_ROUTE + '/' + id, headers, "DELETE")
    return datos ? datos.data : null
}

module.exports = {
    get_proyectos, get_proyecto, crear_proyecto, editar_proyecto, eliminar_proyecto
}
