//styles
import './src/assert/styles/_index.scss'

//handlebars
import Handlebars from 'handlebars/runtime';

//partials

//ui
import button from './src/partials/ui-kit/button.hbs'
import input from './src/partials/ui-kit/input.hbs'
import inputSearch from './src/partials/ui-kit/input-search.hbs'
import link from './src/partials/ui-kit/link.hbs'

//Component 

//forms
import form from './src/partials/components/forms/form.hbs'
import formLogin from './src/partials/components/forms/form-login.hbs'
import formRegistration from './src/partials/components/forms/form-registration.hbs'
import formProfile from './src/partials/components/forms/form-profile.hbs'
import formPassword from './src/partials/components/forms/form-password.hbs'

//others
import error from './src/partials/components/error.hbs'
import profileItem from './src/partials/components/profile-item.hbs'
import avatar from './src/partials/components/avatar.hbs'
import chat from './src/partials/components/chat.hbs'
import chats from './src/partials/components/chats.hbs'
import chatsItem from './src/partials/components/chats-item.hbs'

//getPage
import { getPage } from './src/utils/getPage';

//ui partials
Handlebars.registerPartial('button', button);
Handlebars.registerPartial('input', input);
Handlebars.registerPartial('link', link);
Handlebars.registerPartial('input-search', inputSearch);

//form partials
Handlebars.registerPartial('form', form);
Handlebars.registerPartial('form-profile', formProfile);
Handlebars.registerPartial('form-password', formPassword);
Handlebars.registerPartial('form-login', formLogin);
Handlebars.registerPartial('form-registration', formRegistration);

//components partials
Handlebars.registerPartial('error', error);
Handlebars.registerPartial('profile-item', profileItem);
Handlebars.registerPartial('avatar', avatar);
Handlebars.registerPartial('chat', chat);
Handlebars.registerPartial('chats', chats);
Handlebars.registerPartial('chats-item', chatsItem);



document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById("app");
    root.innerHTML = '';
    root.innerHTML = getPage();
})
