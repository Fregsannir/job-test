<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Oписание

Данное описание содержит гайд по установке и настройке данного модуля на своей рабочей машине.

## Установка

Первым делом нужно клонировать данный репозиторий на свою рабочую машину:

```bash
$ git clone https://github.com/Fregsannir/job-test.git
```

После успешного клонирования репозитория нужно добавить env файл.
Допустимые названия файлов переменных сред:

- `dev.env` (используется для запуска контейнеров в тестовом окружении);
- `.env` (используется для запуска контейнеров в «продакшн» окружении).

Разница между двумя данными подходами состоит в том, что в продакшн режиме используется компиляция проекта и занесение скомпилированного кода его в отдельный volume с последующим запуском. В тестовом же окружении остаётся отслеживание изменений кода и запускается dev скрипт запуска сервиса.

## Запуск

Для запуска на операционной системе с ядром unix, либо если есть WSL, можно использовать один из следующих скриптов: `run_dev.sh` или `run_prod.sh`.

```bash
# development
$ ./run_dev.sh

# production
$ ./run_prod.sh
```

После запуска контейнеров нужно запустить миграцию.

```bash
$ npm run database:migrate
```

Для перезапуска контейнеров есть скрипты `rebuild_dev.sh` и `rebuild_prod.sh`.

```bash
# development
$ ./rebuild_dev.sh

#production
$ ./rebuild_prod.sh
```
