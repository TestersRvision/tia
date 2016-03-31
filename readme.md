
# Time Is All (log driven test engine)

----------------------------------

## Selenium WebDriver

GUI часть движка сделана на основе официального JS selenium-webdriver биндинга,
документация по JS Selenium тут:

http://seleniumhq.github.io/selenium/docs/api/javascript/index.html

Хорошо бы быть в курсе, что такое 

WebElement:

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html

Actions:

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/actions_exports_ActionSequence.html

By

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html

until

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html

chrome webdriver

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/chrome_exports_Driver.html

Key

http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html

Я буду стараться создавать разные обертки в API, чтобы тестерам не нужно было знать об этих объектах.
Но, пока для написания нетривиальных тестов эти знания могут понадобиться.
sel объект внутри теста, дает доступ к этим элементам Selenium (т.е. имеет одноименные свойства).

### Ворфлоу тестов с Selenium Webdriver

* Идешь на какой-то URL. (см. sel.get(url) ф-ю).
* Ждешь какого-то события: появления элемента, появления JS объекта,
появления нужного title страницы, и т.д. (см. sel.wait* ф-и)
* Ещё можно искать элемент без ожидания (если точно уверен, что элемент есть, иначе словишь exception).
  Лучше с ожиданием.
* Посылаешь в этот элемент всякие события от клавиатуры и мыши (sel.click*, sel.sendKeys*).
* Считываешь что-то из элемента.
* Считываешь что-то из JS переменных браузера. (см. sel.executeScript()).

### Замечания об ExtJs

* Для динамически генерируемых id нужно через разные обертки движка (пока их мало),
 или через sel.executeScript находить id элемента и посылать в него разные действия.
* Через executeScript можно обращаться к нужным ExtJs объектам и передавать из браузера в тесты
 какие угодно JS объекты.

## Термины

### Тест

JavaScript файл, лежащий где - либо внутри пакета тестов.
Этот файл просто запускается движком тестов.
Что делается внутри файла - дело автора теста, никаких ограничений нет.

Тест, используя API движка, может (и это очень рекомендуется) писать лог о своих действиях
(см. Лог теста).

Имена config.js, и suite-config.js используются как конфиги, а не как тесты.

### Лог теста.

Текстовый файл, создаваемый движком и API вызовами из исходника теста (см. Тест).
В нем отражается сценарий выполнения теста, т.е. что происходит и с каким результатом.
В идеале, должен быть очень похож на соответствующую секцию тестплана.
В конце лога движок дописывает статистическую информацию по тесту и если включены соответствующие опции
конфига - добавляет логи от браузерной консоли.

Имя файла для лога теста такое же, как у теста, но расширение 'log', а не 'js'.

### Лог пакета.

Лог со статистической информацией по всем тестам пакета.
Называется так же, как директория пакета, но добавляется расширение '.log'.
Рассылается на мейл.

----------------------------------

## Пререквизиты


* diff, rm, zip (на Windows можно установить Cygwin, на Linux есть родные)
* nodejs (версия должна поддерживать --harmony опцию, т.к. тестовый движок использует ES6 стандарт,
движок тестируется с версией 4.4.1)
* Xvfb (если нужно запускать тесты под Linux без GUI).
	Запускать так:
	 $ Xvfb :1 -screen 5 2560x1440x24
	Убивать можно так:
	 $ killall Xvfb

----------------------------------

## Установка

$ npm install -g tia

----------------------------------

## Отладка тестов


### Первый способ

Можно установить модуль локально:

$ npm install tia

И при отладке запускать

mode_modules/tia/bin/tia.js

с нужными параметрами.
 
### Второй способ:

Устанавливаете модуль локально, и создаете проект прямо в нем.

Главно помнить, что запускаемый файл это bin/tia.js.

----------------------------------

## Конфигурационные файлы:


Конфиги приложения находятся в директории "config":

В этих файлая есть комментарии по всем опциям конфигов.

Вот так выглядит локальный конфиг (названия опций должны быть точно такими же как в config/dir-config.js):
Последнее выражение в скрипте должно быть объектом с перегружаемыми опциями конфига.

```js
var config = {
  sectTitle: "Config testing",
};

config;
```

Конфиг suite-config.js делается так же:

```js
var config = {
  mailList: "vasya@pupkin.ru",
};

config;
```

----------------------------------

## Запуск

Вот так можно посмотреть хелп по запуску при глобальной установке:

$ tia --help

при локальной установке:

$ node [--harmony] bin/tia.js --help

----------------------------------

## Порядок выполнения тестов:

Тесты выполняются по-алфавиту, поэтому, рекомендуется придерживаться названий, типа 00_CheckingSomeStuff.js.

----------------------------------

## Как все работает:

### Как работает движок и какие создаются файлы.

tia в параметрах (помимо прочего) получает директорию с тестами.

Движок рекурсивно проходит указанную директорию.

Файлы config.js в директориях запускаются, и используются для перегрузки конфигов (см. "Конфигурационные файлы").

Другие файлы `*.js` запускаются движком, в них должны находиться тесты, выполняющие что угодно (все, что может делать node.js),
и пишущие логи (`*.log`) (см. Лог Теста), используя API (см. api-high-level, api-low-level директории).

Для каждого теста есть эталонный лог (`*.et`), этот лог создается и тщательно проверяется автором теста.

После прогона теста, его текущий лог сравнивается с эталонным. Если есть разница, она записывается в виде `*.dif` файла.

Есть возможность создавать эталонные дифы (`*.edif`). Если диф равен эталонному, то он в логе пакета не считается дифом.

### При ошибках в лог теста пишутся:
 * информация об ошибке
 * консоль браузера
 * эксепшны, возникшие в браузере
 * путь к скриншоту, сделанному после обнаружения ошибки (это `*.png` файл.)

### Помимо локальных файлов для каждого теста, создаются общие логи статистики по всем тестам.

Эти логи рассылаются на почту.
Также на почту отсылается архив с результатами тестов, если соответвующие опции включены в конфиге.

#### В заголовке письма используются следующие обозначения:

linux_3.16.0-4-amd64, AS PREV , "testsWdHelpers", Dif: 0, Fail: 0, EDif: 0, Skip: 0, Pass: 4, 19203.05 ms

* linux_3.16.0-4 - Операционная система.
* amd64 - Платформа.
* Один из трех вариантов, показывающий отношение текущего прогона к предыдущему:
	* CHANGED - означает, что появились дифы в тестах, где дифов не было, или исчезли дифы для тестов, где дифы были.
	* AS PREV - означает, что при текущем прогоне абсолютно такие же результаты, что и при предыдущем.
	* AS PREV (8 diff(s) changed). - дифы в тех же тестах, что и раньше, но какие-то дифы изменились.
* testsWdHelpers - имя корневой директории для тестов.
* Dif: 0, - ноль тестов имеют неожиданные дифы.
* Fail: 0, - ноль ошибок во всех тестах.
* EDif: 0, - ноль ожидаемых дифов.
* Skip: 0, - ноль тестов проигнорено (из-за skip: true в локальном конфиге)
* Pass: 4, - 4 команды во всех тестах сообщили о том, что они прошли успешно.
* 19203.05 ms - тесты шли 19 с копейками секунд.


#### В логах используются следующие обозначения:

Обозначения те же, что и выше, только теперь они расписаны для каждой директории и каждого теста.
Лог состоит из двух частей: короткой (содержащей только подифанные тесты), и длинной (содержащей все тесты).

### Статус возврата, stdout, stderr.

tia возвращает 0 если тесты прошли ожидаемо и 1, если есть неожиданные дифы.

Конфиг опция logToStdErrOut со значением true, приводит к выводу лога в stderr и stdout, см. описание этой опции в config/dir-config.js.

----------------------------------

## API для создания тестов:

В директориях api-high-level, api-low-level находятся функции, которые выполняют эмуляцию действий пользователя, логирование, и другие действия.
См. документацию (она в формате JSDoc) в комментариях к функциям.

----------------------------------
## FAQ:

* Как запускать тесты на Windows, чтобы они не мешали работать?

  Можно установить desktops и запускать тесты на альтернативном рабочем столе.
  https://technet.microsoft.com/en-us/library/cc817881.aspx

	TODO: давно не тестировал на Windows, не уверен, что сходу всё заработает.

* Как подписаться на RSS обновлений движка:

	https://github.com/Dzenly/tia/releases.atom

----------------------------------

## Содержимое директории:

* bin/tia.js - утилита для запуска тестов, наберите "node --harmony tia.js --help", для просмотра помощи по утилите.
При глобальной установке, достаточно набрать "tia --help".
* to-inject/TestHelper.js - клиентский скрипт для поддержки не ExtJS части (TODO: скоро перестанет быть нужным).
* to-inject/TestHelperExt.js - клиентский скрипт для поддержки ExtJS части (TODO: скоро перестанет быть нужным).
* api-high-level - высокоуровневые функции для использования в тестах, например, логин.
* api-low-level - низкоуровневые функции для использования в тестах, например, кликнуть мышью туда-то.
* inner-docs - внутренняя документация.
* engine - основные файлы движка.
* log-viewer - здесь разрабатывается веб-клиент для очень удобного изучения логов.
* tests - директория с пакетами тестов.
*     tia - Тесты для движка тестирования.
*     wd-helpers - Тесты для low level and high level API функций.
* utils - утилитные функции, используемые движком.

* Есть следующие форматы файлов:
*     *.log - логи от тестов.
*     *.log.json - логи в JSON формате (для последующего использования веб - просмотрщиком логов)
*     *.log.notime - логи, с вырезанным временем.
*     *.log.notime.prev - предыдущие логи с вырезанным временем.


----------------------------------

## Известные фичи и баги:

Парочка тестов в пакете engine намеренно пишет несколько строк в stderr.
см. также TODO* файлы в inner-docs директории.

----------------------------------

## Лицензия: MIT.
