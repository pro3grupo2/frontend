/*
POST https://proyectos3.sertor.es/api/v1/auth/signup
Content-Type: application/json

{
  "correo": "adriantoral@live.u-tad.com",
  "nombre_completo": "Adrian Toral",
  "alias": "adriantoral",
  "password": "12345",
  "frase_recuperacion": "adriantoral"
}
*/
const signin = async (body) => {
    const response = fetch("https://proyectos3.sertor.es/api/v1/auth/signin", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    
    const data = response.data;
    console.log(data);
    return data;
}

// Ruta para manejar el registro de usuarios
const signup = async (req, res) => {
    const {body} = req
    const data = await auth_service.create_usuario(body)

    if (!data) return res.status(400).send({data: "Bad Request"})

    return res.send({
        data: data
    })
}

// Ruta para manejar la obtencion de datos de un usuario mediante Bearer Token (JWT)
const me = async (req, res) => {
    const {usuario_id} = req
    return res.send({data: await auth_service.get_usuario_by_id(usuario_id)})
}

module.exports = {
    signin,
    signup,
    me
}