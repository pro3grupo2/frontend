const {fetch_handler} = require('.')

const ASIGNATURAS_ROUTE = '/asignaturas'

const get_asignaturas = async (token, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(ASIGNATURAS_ROUTE, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

const get_asignatura = async (token, id, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(ASIGNATURAS_ROUTE + '/' + id, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

const crear_asignatura = async (token, titulo, curso, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo, curso: curso
    })

    const datos = await fetch_handler(ASIGNATURAS_ROUTE, headers, "POST", body, callback)
    return datos ? datos.data : null
}

const editar_asignatura = async (token, id, titulo, curso, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo, curso: curso
    })

    const datos = await fetch_handler(ASIGNATURAS_ROUTE + '/' + id, headers, "PUT", body, callback)
    return datos ? datos.data : null
}

module.exports = {
    get_asignaturas, get_asignatura, crear_asignatura, editar_asignatura
}
