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
import confirm_modal_json from './confirm_modal.json'
import delete_project_modal_json from './delete_project_modal.json'
import edit_profile_modal_json from './edit_profile_modal.json'
import new_premios_modal_json from './new_premios_modal.json'
import new_project_modal_json from './new_project_modal.json'
import project_card_json from './project_card.json'
import project_solicitud_lista_json from './project_solicitud_lista.json'
import solicitud_project_modal_json from './solicitud_project_modal.json'

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

const confirm_modal_texts = (lang) => {
    return confirm_modal_json[lang]
}

const delete_project_modal_texts = (lang) => {
    return delete_project_modal_json[lang]
}

const edit_profile_modal_texts = (lang) => {
    return edit_profile_modal_json[lang]
}

const new_premios_modal_texts = (lang) => {
    return new_premios_modal_json[lang]
}

const new_project_modal_texts = (lang) => {
    return new_project_modal_json[lang]
}

const project_card_texts = (lang) => {
    return project_card_json[lang]
}

const project_solicitud_lista_texts = (lang) => {
    return project_solicitud_lista_json[lang]
}

const solicitud_project_modal_texts = (lang) => {
    return solicitud_project_modal_json[lang]
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
    page_texts,
    confirm_modal_texts,
    delete_project_modal_texts,
    edit_profile_modal_texts,
    new_premios_modal_texts,
    new_project_modal_texts,
    project_card_texts,
    project_solicitud_lista_texts,
    solicitud_project_modal_texts
}