const {fetch_handler} = require('.')

const
    SIGNIN_ROUTE = '/auth/signin',
    SIGNUP_ROUTE = '/auth/signup',
    SIGNUP_ROUTE_VALIDATE = '/auth/signup/validate',
    ME_ROUTE = '/auth/me',
    RECOVER_ROUTE = '/auth/recover'

const signin = async (correo, password) => {
    const headers = {
        'Content-Type': 'application/json'
    }, body = JSON.stringify({
        correo: correo, password: password
    })

    const datos = await fetch_handler(SIGNIN_ROUTE, headers, "POST", body)
    return datos ? datos.data : null
}

const signup = async (correo, nombre_completo, alias, password, frase_recuperacion, rol, promocion) => {
    const headers = {
        'Content-Type': 'application/json'
    }, body = JSON.stringify({
        correo: correo, nombre_completo: nombre_completo, alias: alias, password: password, frase_recuperacion: frase_recuperacion, rol: rol, promocion: promocion
    })

    const datos = await fetch_handler(SIGNUP_ROUTE, headers, "POST", body)
    return datos ? datos.data : null
}

const validate = async (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(SIGNUP_ROUTE_VALIDATE, headers, "GET")
    return datos ? datos.data : null
}

const recover = async (correo) => {
    const headers = {
        'Content-Type': 'application/json'
    }, body = JSON.stringify({
        correo: correo
    })

    const datos = await fetch_handler(RECOVER_ROUTE, headers, "POST", body)
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
    signin, signup, validate, recover, me
}