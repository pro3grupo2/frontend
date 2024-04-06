const API_HOST = 'https://api.reservorio-u-tad.com/api/v1'

const fetch_handler = async (api_route, headers, method, body, callback = undefined) => {
    const response = await fetch(API_HOST + api_route,
        body
            ? {method: method || "GET", headers: headers || {}, body: body, cache: "no-cache"}
            : {method: method || "GET", headers: headers || {}, cache: "no-cache"}
    )

    const datos = await response.json()
    if (!response.ok) {
        if (datos.data.errors) datos.data.errors.map(error => callback ? callback(error) : console.error('Error: ' + error))
        return null
    }

    return datos
}

module.exports = {
    fetch_handler
}
