const {fetch_handler} = require('.')

const TITULACIONES_ROUTE = '/titulaciones'

const get_titulaciones = async (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(TITULACIONES_ROUTE, headers, "GET")
    return datos ? datos.data : null
}

const get_titulacion = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(TITULACIONES_ROUTE + '/' + id, headers, "GET")
    return datos ? datos.data : null
}

const crear_titulacion = async (token, titulo, id_area) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo, id_area: id_area
    })

    const datos = await fetch_handler(TITULACIONES_ROUTE, headers, "POST", body)
    return datos ? datos.data : null
}

const editar_titulacion = async (token, id, titulo, id_area) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo, id_area: id_area
    })

    const datos = await fetch_handler(TITULACIONES_ROUTE + '/' + id, headers, "PUT", body)
    return datos ? datos.data : null
}

module.exports = {
    get_titulaciones, get_titulacion, crear_titulacion, editar_titulacion
}
