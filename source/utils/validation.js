const EMAIL_TERMINATIONS = [
    "live.u-tad.com",
    "u-tad.com",
    "ext.u-tad.com"
]

const check_password = (password, callback = undefined) => {
    let check = true

    if (password.length < 8) {
        check = false
        if (callback) callback('La contraseña debe tener al menos 8 caracteres')
    }

    if (!/[a-z]/.test(password)) {
        check = false
        if (callback) callback('La contraseña debe tener al menos una letra minúscula')
    }

    if (!/[A-Z]/.test(password)) {
        check = false
        if (callback) callback('La contraseña debe tener al menos una letra mayúscula')
    }

    if (!/[0-9]/.test(password)) {
        check = false
        if (callback) callback('La contraseña debe tener al menos un número')
    }

    if (!/[!@#,?.-_|¿%&$/*()[{@"<>"']/.test(password)) {
        check = false
        if (callback) callback('La contraseña debe tener al menos un caracter especial')
    }

    return check
}

const check_email = (email, callback = undefined) => {
    if (!email) {
        if (callback) callback('El correo no puede estar vacío')
        return false
    }

    let
        check = true,
        [username, domain] = email.split('@')

    if (!EMAIL_TERMINATIONS.includes(domain)) {
        check = false
        if (callback) callback('El dominio del correo no es válido')
    }

    if (!/^[a-zA-Z]+\.[a-zA-Z]+$/.test(username)) {
        check = false
        if (callback) callback('El nombre de usuario del correo no es válido')
    }

    return check
}

module.exports = {
    EMAIL_TERMINATIONS,
    check_password,
    check_email
}