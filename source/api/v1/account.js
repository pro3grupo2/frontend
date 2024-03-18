const {fetch_handler} = require('.')

const ACCOUNT_ROUTE = '/account'

const update = async (token, nombre_completo, password, frase_recuperacion, rol, promocion) => {
    const headers = {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
    }, body = JSON.stringify({
        nombre_completo: nombre_completo, password: password, frase_recuperacion: frase_recuperacion, rol: rol, promocion: promocion
    })

    const datos = await fetch_handler(ACCOUNT_ROUTE, headers, "PUT", body)
    return datos ? datos.data : null
}

module.exports = {
    update
}
