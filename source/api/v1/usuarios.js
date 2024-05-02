const {fetch_handler} = require('.')

const USERS_ROUTE = '/usuarios'

const get_users = async (token, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(`${USERS_ROUTE}`, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

const get_user_by_id = async (token, user_id, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(`${USERS_ROUTE}/id/${user_id}`, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

const get_user_by_correo = async (token, correo, callback = undefined) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(`${USERS_ROUTE}/correo/${correo}`, headers, "GET", undefined, callback)
    return datos ? datos.data : null
}

module.exports = {
    get_users,
    get_user_by_id,
    get_user_by_correo
}