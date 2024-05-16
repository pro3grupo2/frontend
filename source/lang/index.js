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

const help = () => {
    const lang = localStorage.getItem('lang') ?? 'EN'

    return help_json[lang]
}

const home = () => {
    const lang = localStorage.getItem('lang') ?? 'EN'

    return home_json[lang]
}

const profile = () => {
    const lang = localStorage.getItem('lang') ?? 'EN'

    return profile_json[lang]
}

const project = () => {
    const lang = localStorage.getItem('lang') ?? 'EN'

    return project_json[lang]
}

const recover = () => {
    const lang = localStorage.getItem('lang') ?? 'EN'

    return recover_json[lang]
}

const sign_in = () => {
    const lang = localStorage.getItem('lang') ?? 'EN'

    return sign_in_json[lang]
}

const sign_up = () => {
    const lang = localStorage.getItem('lang') ?? 'EN'

    return sign_up_json[lang]
}

const validate = () => {
    const lang = localStorage.getItem('lang') ?? 'EN'

    return validate_json[lang]
}

const navbar = () => {
    const lang = localStorage.getItem('lang') ?? 'EN'

    return navbar_json[lang]
}

const footer = () => {
    const lang = localStorage.getItem('lang') ?? 'EN'

    return footer_json[lang]
}

const page = () => {
    const lang = localStorage.getItem('lang') ?? 'EN'

    return page_json[lang]
}

module.exports = {
    help: help(),
    home: home(),
    profile: profile(),
    project: project(),
    recover: recover(),
    sign_in: sign_in(),
    sign_up: sign_up(),
    validate: validate(),
    navbar: navbar(),
    footer: footer(),
    page: page()
}