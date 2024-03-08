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

const crear_proyecto = async (token, titulo, ficha, url, portada, participantes, id_asignatura = null) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        "id_asignatura": id_asignatura, "titulo": titulo, "ficha": ficha, "url": url, "portada": portada, "participantes": participantes
    })

    const datos = await fetch_handler(PROYECTOS_ROUTE, headers, "POST", body)
    return datos ? datos.data : null
}

const editar_proyecto = async (token, id, titulo, ficha, url, portada, participantes, id_asignatura = null) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        "id_asignatura": id_asignatura, "titulo": titulo, "ficha": ficha, "url": url, "portada": portada, "participantes": participantes
    })

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

const validar_proyecto = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PROYECTOS_ROUTE + '/' + id + '/validar', headers, "POST")
    return datos ? datos.data : null
}

module.exports = {
    get_proyectos, get_proyecto, crear_proyecto, editar_proyecto, eliminar_proyecto, validar_proyecto
}
