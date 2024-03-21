const {fetch_handler} = require('.')

const AREAS_ROUTE = '/areas'

const get_areas = async (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(AREAS_ROUTE, headers, "GET")
    return datos ? datos.data : null
}

const get_area = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(AREAS_ROUTE + '/' + id, headers, "GET")
    return datos ? datos.data : null
}

const crear_area = async (token, titulo) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo
    })

    const datos = await fetch_handler(AREAS_ROUTE, headers, "POST", body)
    return datos ? datos.data : null
}

const editar_area = async (token, id, titulo) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo
    })

    const datos = await fetch_handler(AREAS_ROUTE + '/' + id, headers, "PUT", body)
    return datos ? datos.data : null
}

module.exports = {
    get_areas, get_area, crear_area, editar_area
}
