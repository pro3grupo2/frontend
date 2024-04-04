const {fetch_handler} = require('.')

const SIGNIN_ROUTE = '/auth/signin', SIGNUP_ROUTE = '/auth/signup', SIGNUP_ROUTE_VALIDATE = '/auth/signup/validate', ME_ROUTE = '/auth/me', RECOVER_ROUTE = '/auth/recover'

const signin = async (correo, password, callback = undefined) => {
    const headers = {
        'Content-Type': 'application/json'
    }, body = JSON.stringify({
        correo: correo, password: password
    })

    const datos = await fetch_handler(SIGNIN_ROUTE, headers, "POST", body, callback)
    return datos ? datos.data : null
}

const signup = async (correo, nombre_completo, alias, password, descripcion, portfolio, foto, rol, promocion, codigo = undefined, callback = undefined) => {
    const headers = {
        'Content-Type': 'application/json'
    }, body = JSON.stringify({
        correo: correo, nombre_completo: nombre_completo, alias: alias, password: password, descripcion: descripcion, portfolio: portfolio, foto: foto, rol: rol, promocion: promocion, codigo: codigo
    })

    const datos = await fetch_handler(SIGNUP_ROUTE, headers, "POST", body, callback)
    return datos ? datos.data : null
}

const validate = async (token, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(SIGNUP_ROUTE_VALIDATE, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

const recover = async (correo, callback = undefined) => {
    const headers = {
        'Content-Type': 'application/json'
    }, body = JSON.stringify({
        correo: correo
    })

    const datos = await fetch_handler(RECOVER_ROUTE, headers, "POST", body, callback)
    return datos ? datos.data : null
}

const me = async (token, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(ME_ROUTE, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

module.exports = {
    signin, signup, validate, recover, me
}