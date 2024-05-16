const EMAIL_TERMINATIONS = [
    "live.u-tad.com",
    "u-tad.com",
    "ext.u-tad.com"
]

import validation from "@/lang/validation.json"

const check_password = (password, lang = "EN", callback = undefined) => {
    const texts = validation[lang].check_password
    let check = true

    if (password.length < 8) {
        check = false
        if (callback) callback(texts.characters)
    }

    if (!/[a-zñ]/.test(password)) {
        check = false
        if (callback) callback(texts.lowercase)
    }

    if (!/[A-ZÑ]/.test(password)) {
        check = false
        if (callback) callback(texts.uppercase)
    }

    if (!/[0-9]/.test(password)) {
        check = false
        if (callback) callback(texts.number)
    }

    if (!/[!"#$%&'()*+,-./:;<=>?@[^_`{|}~]/.test(password)) {
        check = false
        if (callback) callback(texts.special_character)
    }

    return check
}

const check_email = (email, lang = "EN", callback = undefined) => {
    const texts = validation[lang].check_email

    if (!email) {
        if (callback) callback(texts.empty)
        return false
    }

    let
        check = true,
        [username, domain] = email.split('@')

    if (!EMAIL_TERMINATIONS.includes(domain)) {
        check = false
        if (callback) callback(texts.domain)
    }

    if (!/^[a-zA-Z0-9ñÑ]+\.[a-zA-Z0-9ñÑ]+$/.test(username)) {
        check = false
        if (callback) callback(texts.name)
    }

    return check
}

module.exports = {
    EMAIL_TERMINATIONS,
    check_password,
    check_email
}