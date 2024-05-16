import page_json from './page.json'
import help_json from './help.json'
import home_json from './home.json'
import profile_json from './profile.json'
import project_json from './project.json'
import recover_json from './recover.json'
import sign_in_json from './sign_in.json'
import sign_up_json from './sign_up.json'
import validate_json from './validate.json'
import navbar_json from './navbar.json'
import footer_json from './footer.json'

const help_texts = (lang) => {
    return help_json[lang]
}

const home_texts = (lang) => {
    return home_json[lang]
}

const profile_texts = (lang) => {
    return profile_json[lang]
}

const project_texts = (lang) => {
    return project_json[lang]
}

const recover_texts = (lang) => {
    return recover_json[lang]
}

const sign_in_texts = (lang) => {
    return sign_in_json[lang]
}

const sign_up_texts = (lang) => {
    return sign_up_json[lang]
}

const validate_texts = (lang) => {
    return validate_json[lang]
}

const navbar_texts = (lang) => {
    return navbar_json[lang]
}

const footer_texts = (lang) => {
    return footer_json[lang]
}

const page_texts = (lang) => {
    return page_json[lang]
}

module.exports = {
    help_texts,
    home_texts,
    profile_texts,
    project_texts,
    recover_texts,
    sign_in_texts,
    sign_up_texts,
    validate_texts,
    navbar_texts,
    footer_texts,
    page_texts
}