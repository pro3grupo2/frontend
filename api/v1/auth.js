const {fetch_handler} = require('.')

const SIGNIN_ROUTE = '/auth/signin', SIGNUP_ROUTE = '/auth/signup', ME_ROUTE = '/auth/me'

const signin = async (correo, password) => {
    const headers = {
        'Content-Type': 'application/json'
    }, body = JSON.stringify({
        correo: correo, password: password
    })

    const datos = await fetch_handler(SIGNIN_ROUTE, headers, "POST", body)
    return datos ? datos.data.token : null
}

const signup = async (correo, nombre_completo, alias, password, frase_recuperacion, rol) => {
    const headers = {
        'Content-Type': 'application/json'
    }, body = JSON.stringify({
        correo: correo, nombre_completo: nombre_completo, alias: alias, password: password, frase_recuperacion: frase_recuperacion, rol: rol
    })

    const datos = await fetch_handler(SIGNUP_ROUTE, headers, "POST", body)
    return datos ? datos.data : null
}

const me = async (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(ME_ROUTE, headers, "GET")
    return datos ? datos.data : null
}

module.exports = {
    signin, signup, me
}