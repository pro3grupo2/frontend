const {fetch_handler} = require('.')

const CODIGOS_ROUTE = '/codigos'

const get_codigos = async (token, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(CODIGOS_ROUTE, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

const crear_codigo = async (token, usos = 1, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        usos: usos
    })

    const datos = await fetch_handler(CODIGOS_ROUTE, headers, "POST", body, callback)
    return datos ? datos.data : null
}

module.exports = {
    get_codigos, crear_codigo
}
