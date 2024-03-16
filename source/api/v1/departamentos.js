const {fetch_handler} = require('.')

const DEPARTAMENTOS_ROUTE = '/departamentos'

const get_departamentos = async (token) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(DEPARTAMENTOS_ROUTE, headers, "GET")
    return datos ? datos.data : null
}

const get_departamento = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(DEPARTAMENTOS_ROUTE + '/' + id, headers, "GET")
    return datos ? datos.data : null
}

const crear_departamento = async (token, titulo) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo
    })

    const datos = await fetch_handler(DEPARTAMENTOS_ROUTE, headers, "POST", body)
    return datos ? datos.data : null
}

const editar_departamento = async (token, id, titulo) => {
    const headers = {
        'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
    }, body = JSON.stringify({
        titulo: titulo
    })

    const datos = await fetch_handler(DEPARTAMENTOS_ROUTE + '/' + id, headers, "PUT", body)
    return datos ? datos.data : null
}

const eliminar_departamento = async (token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const datos = await fetch_handler(DEPARTAMENTOS_ROUTE + '/' + id, headers, "DELETE")
    return datos ? datos.data : null
}

module.exports = {
    get_departamentos, get_departamento, crear_departamento, editar_departamento, eliminar_departamento
}
