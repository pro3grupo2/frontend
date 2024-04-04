const {fetch_handler} = require('.')

const ACCOUNT_ROUTE = '/account'

const update = async (token, nombre_completo, password, descripcion, portfolio, foto, promocion, callback = undefined) => {
    const headers = {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    }, body = JSON.stringify({
        nombre_completo: nombre_completo, password: password, descripcion: descripcion, portfolio: portfolio, foto: foto, promocion: promocion
    })

    const datos = await fetch_handler(ACCOUNT_ROUTE, headers, "PUT", body, callback)
    return datos ? datos.data : null
}

module.exports = {
    update
}
