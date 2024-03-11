const API_HOST = 'https://proyectos3.sertor.es/api/v1'

const fetch_handler = async (api_route, headers, method, body) => {
    const response = await fetch(API_HOST + api_route, body ? {
        method: method || "GET", headers: headers || {}, body: body
    } : {
        method: method || "GET", headers: headers || {}
    })

    const datos = await response.json()
    if (!response.ok) {
        if (datos.data.errors) datos.data.errors.map(error => console.error('Error: ' + error))
        return null
    }

    return datos
}

module.exports = {
    fetch_handler
}
