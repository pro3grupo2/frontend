const {fetch_handler} = require('.')

const AREAS_ROUTE = '/areas'

const get_areas = async (token, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(AREAS_ROUTE, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

const get_area = async (token, id, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(AREAS_ROUTE + '/' + id, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

const crear_area = async (token, titulo, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo
    })

    const datos = await fetch_handler(AREAS_ROUTE, headers, "POST", body, callback)
    return datos ? datos.data : null
}

const editar_area = async (token, id, titulo, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo
    })

    const datos = await fetch_handler(AREAS_ROUTE + '/' + id, headers, "PUT", body, callback)
    return datos ? datos.data : null
}

module.exports = {
    get_areas, get_area, crear_area, editar_area
}
