## Установка
### Предварительно требования
[Node](https://nodejs.org/en/download/), [NPM](https://docs.npmjs.com/getting-started/installing-node)

### Установка зависимостей
`npm install`

## Окружение
Береться из файла .env из корня проекта, где:

LOGIN - логин тестового пользователя, у которого есть сообщество

PASSWORD - пароль тестового пользователя

MAIN_URL - url приложения, по умолчанию "https://vk.com/"

## Запуск имеющихся тестов
Для запуска на ОС windows `npm run-script win:test:firefox`, где `firefox` указывает на запускаемый браузер. Аналогично можно указать `chromium`, `webkit`.

Для OS *nix `npm run-script test:firefox`, с аналогичной логикой.

Результаты выполнения кладутся в папку `./output/allure-results`

## Генерация отчета
Для генерации отчета требуется выполнить `npm run-script report`

Сгенерированный отчет будет находиться в папке `./allure-report`