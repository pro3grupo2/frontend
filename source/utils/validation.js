const EMAIL_TERMINATIONS = [
    "live.u-tad.com",
    "u-tad.com",
    "ext.u-tad.com"
]

const check_password = (password, callback = undefined) => {
    let check = true

    if (password.length < 8) {
        check = false
        if (callback) callback('8 caracteres')
    }

    if (!/[a-zñ]/.test(password)) {
        check = false
        if (callback) callback('Una minúscula')
    }

    if (!/[A-ZÑ]/.test(password)) {
        check = false
        if (callback) callback('Una mayúscula')
    }

    if (!/[0-9]/.test(password)) {
        check = false
        if (callback) callback('Un número')
    }

    if (!/[!"#$%&'()*+,-./:;<=>?@[^_`{|}~]/.test(password)) {
        check = false
        if (callback) callback('Un caracter especial')
    }

    return check
}

const check_email = (email, callback = undefined) => {
    if (!email) {
        if (callback) callback('No estar vacio')
        return false
    }

    let
        check = true,
        [username, domain] = email.split('@')

    if (!EMAIL_TERMINATIONS.includes(domain)) {
        check = false
        if (callback) callback('Dominio de correo de U-Tad')
    }

    if (!/^[a-zA-Z0-9ñÑ]+\.[a-zA-Z0-9ñÑ]+$/.test(username)) {
        check = false
        if (callback) callback('Nombre del recipiente de U-Tad')
    }

    return check
}

module.exports = {
    EMAIL_TERMINATIONS,
    check_password,
    check_email
}