const {fetch_handler} = require('.')

const MATERIAS_ROUTE = '/materias'

const get_materias = async (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(MATERIAS_ROUTE, headers, "GET")
    return datos ? datos.data : null
}

const get_materia = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(MATERIAS_ROUTE + '/' + id, headers, "GET")
    return datos ? datos.data : null
}

const crear_materia = async (token, titulo) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo
    })

    const datos = await fetch_handler(MATERIAS_ROUTE, headers, "POST", body)
    return datos ? datos.data : null
}

const editar_materia = async (token, id, titulo) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo
    })

    const datos = await fetch_handler(MATERIAS_ROUTE + '/' + id, headers, "PUT", body)
    return datos ? datos.data : null
}

const eliminar_materia = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(MATERIAS_ROUTE + '/' + id, headers, "DELETE")
    return datos ? datos.data : null
}

module.exports = {
    get_materias, get_materia, crear_materia, editar_materia, eliminar_materia
}
