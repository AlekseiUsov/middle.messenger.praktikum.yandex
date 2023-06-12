//Pages
import LoginPage from '../partials/pages/page-login.hbs'
import RegistrationPage from '../partials/pages/registration-page.hbs'
import error404 from '../partials/pages/page-error-404.hbs'
import error505 from '../partials/pages/page-error-505.hbs'
import profilePage from '../partials/pages/page-profile.hbs'
import mainPage from '../partials/pages/page-main.hbs'

export function getPage() {
    switch (window.location.pathname) {
        case '/profile/':
            return profilePage();
        case '/login/':
            return LoginPage();
        case '/registration/':
            return RegistrationPage();
        case '/':
            return mainPage();
        case '/not_found/':
            return error404();
        case '/error/':
            return error505();
    }
}
