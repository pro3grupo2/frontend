const signin = async (body) => {
    const response = await fetch("https://proyectos3.sertor.es/api/v1/auth/signin", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    
    const data = await response.json();
    return data.data.token;
}

const signup = async (body) => {
    const response = await fetch("https://proyectos3.sertor.es/api/v1/auth/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    
    const data = await response.json();
    return data.data;
}

const me = async (token) => {
    const response = await fetch("https://proyectos3.sertor.es/api/v1/auth/me", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data.data;
}

module.exports = {
    signin,
    signup,
    me
}