## Messanger

### Ссылка на макеты:

https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1&p=f

### Команда для запуска:

npm run dev - режим разработки
npm run start - сборка и запуск на 3000 порту

### Публикация на Netlify

https://messanger-by-alex-de-suze.netlify.app/
[![Netlify Status](https://api.netlify.com/api/v1/badges/c577baf2-4deb-4ab3-bdac-0edf04fe8944/deploy-status)](https://app.netlify.com/sites/messanger-by-alex-de-suze/deploys)

### Страницы:

localhost:3000/ или localhost:3000/main -главная
localhost:3000/signin -главная
localhost:3000/registration - регистрация
localhost:3000/profile - профиль
localhost:3000/notFound - 404
localhost:3000/error - 500

### Sprint 2

Внедрил базовый класс Block и EventBus
Добавил на страницах SignIn, Registration, Profile валидацию поле и логирование всех полей по ключам и значения
Добавил класс HTTPTransport для работы с запросами
Добавил ESlint и Stylelint Airbnb

### Sprint 3

Внедрил роутинг
Добавил WebSoket для обмена сообщениями в реальном времени
Добавил API чатов, авторизации, регистрации и настроек
