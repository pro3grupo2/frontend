const {fetch_handler} = require('.')

const CODIGOS_ROUTE = '/codigos'

const get_codigos = async (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(CODIGOS_ROUTE, headers, "GET")
    return datos ? datos.data : null
}

const crear_codigo = async (token, usos = 1) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({usos: usos})

    const datos = await fetch_handler(CODIGOS_ROUTE, headers, "POST", body)
    return datos ? datos.data : null
}

module.exports = {
    get_codigos, crear_codigo
}
