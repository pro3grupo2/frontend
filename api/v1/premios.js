const {fetch_handler} = require('.')

const PREMIOS_ROUTE = '/premios'

const get_premios = async (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PREMIOS_ROUTE, headers, "GET")
    return datos ? datos.data : null
}

const get_premio = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PREMIOS_ROUTE + '/' + id, headers, "GET")
    return datos ? datos.data : null
}

const crear_premio = async (token, titulo) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo
    })

    const datos = await fetch_handler(PREMIOS_ROUTE, headers, "POST", body)
    return datos ? datos.data : null
}

const editar_premio = async (token, id, titulo) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo
    })

    const datos = await fetch_handler(PREMIOS_ROUTE + '/' + id, headers, "PUT", body)
    return datos ? datos.data : null
}

const eliminar_premio = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(PREMIOS_ROUTE + '/' + id, headers, "DELETE")
    return datos ? datos.data : null
}

module.exports = {
    get_premios, get_premio, crear_premio, editar_premio, eliminar_premio
}
