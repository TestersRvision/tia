# Time Is All (log driven test engine)

----------------------------------

## Selenium WebDriver

Движок пока в стадии разработки (хотя, и работает), и я не поддерживаю обратную совместимость даже для 'minor' и 'patch'
компонентов версии. С версии 1.0.0 я начну четко следовать semver.

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

После установки tia, в `tia/node_modules/selenium-webdriver/test` директории можно посмотреть примеры тестов на чистом selenium webdriver
(т.е. не через tia).

Я буду стараться создавать разные обертки в API, чтобы тестерам не нужно было знать об этих объектах.
Но, пока для написания нетривиальных тестов эти знания могут понадобиться.
sOrig объект внутри теста, дает доступ к этим элементам Selenium (т.е. имеет одноименные свойства).

### Ворфлоу тестов с Selenium Webdriver

* Идешь на какой-то URL. (см. s.browser.loadPage(url) ф-ю).
* Ждешь какого-то события: появления элемента, появления JS объекта,
появления нужного title страницы, и т.д. (см. s.wait* ф-и)
* Ещё можно искать элемент без ожидания (если точно уверен, что элемент есть, иначе словишь exception).
  Лучше с ожиданием.
* Посылаешь в этот элемент всякие события от клавиатуры и мыши (s.click*, s.sendKeys*).
* Считываешь что-то из элемента.
* Считываешь что-то из JS переменных браузера. (см. s.browser.executeScript()).

### Замечания об ExtJs

* Для динамически генерируемых id нужно через разные обертки движка (пока их мало),
 или через s.browser.executeScript находить id элемента и посылать в него разные действия.
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

Имя файла для лога теста такое же, как у теста, но расширение '.log', а не '.js'.

### Лог пакета (мета - лог).

Лог со статистической информацией по всем тестам пакета.
Называется так же, как директория пакета, но добавляется расширение '.mlog'.
Рассылается на мейл.

### Профайлы браузеров.

Директория br-profiles создается в директории, где лежит директория с тестами
(см. --tests-dir и TIA_TESTS_DIR) и хранит профайлы браузеров.
По идее, это должна быть временная директория.

См. также selProfilePath опцию в config/default-suite-config.js.

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
    xvfb directory contains xfvb script and readme.md.

----------------------------------

## Установка

$ npm install -g tia

----------------------------------

## Отладка тестов

### Первый способ

Можно установить модуль локально, так чтобы node_modules директория была сиблингом директории с вашими тестами:

$ npm install tia

И при отладке запускать

mode_modules/tia/bin/tia.js

с нужными параметрами.
 
### Второй способ:

Устанавливаете модуль локально, и создаете проект прямо в нем.

Главно помнить, что запускаемый файл это bin/tia.js.

### Использование typings:

Я пока не делал DTS определения, а вот для selenium-webdriver определения есть (правда на данный момент (2016.04.04)
версия DTS 2.44, хотя уже есть selenium-webdriver 2.53.1):

npm i -g typings
typings install selenium-webdriver --ambient --save

----------------------------------

## Конфигурационные файлы:

### Для движка:

Конфиги приложения находятся в директории "config":

В этих файлах есть комментарии по всем опциям конфигов.

Вот так выглядит локальный конфиг для директории (названия опций должны быть точно такими же как в config/default-dir-config.js):
Последнее выражение в скрипте должно быть объектом с перегружаемыми опциями конфига.

```js
module.exports = {
  sectionTitle: "Config testing",
};
```

Конфиг suite-config.js (подхватывается только из директории, указанной как рутовая при запуске)
делается так же:

```js
module.exports = {
  mailRecipientList: "vasya@pupkin.ru",
};
```

### Для рассылки писем:

Нужно сделать в директории тестов конфиг: suite-config.js.
В нем нужно задать параметры mail* (см. описание параметров в config/default-suite-config.js).
Я лично делаю json файл, который делаю require в suite-config.js, и засовываю этот json в .gitignore,
чтобы не светить креденшлзы.
Помните, что js файлы (кроме config.js и suite-config.js рассматриваются движком как тесты).

## Переменные окружения.

Обратите внимание на описание переменных TIA_TESTS_DIR, TIA_REQUIRE_MODULES в tia --help.
TIA_NO_COLORS - True значение отключает примерение ANSI colors.

----------------------------------

## Запуск

Вот так можно посмотреть хелп по запуску при глобальной установке:

$ tia --help

при локальной установке:

$ node --harmony bin/tia.js --help

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
и пишущие логи (`*.log`) (см. Лог Теста), используя API (см. директорию 'api').

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

[ET_MLOG/DIF_MLOG, ]linux_3.16.0-4-amd64, AS PREV , "testsWdHelpers", Dif: 0, Fail: 0, EDif: 0, Skip: 0, Pass: 4, 19203.05 ms

* ET_MLOG - металог совпадает с эталонным металогом.
* DIF_MLOG - металог не совпадает с эталонным металогом.
* linux_3.16.0-4 - Операционная система.
* amd64 - Платформа.
* Один из трех вариантов, показывающий отношение текущего прогона к предыдущему:
	* DIF FROM PREV - означает, что появились дифы в тестах, где дифов не было, или исчезли дифы для тестов, где дифы были.
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

Конфиг опция metaLogToStdout со значением true, приводит к выводу мега - лога в stderr,
см. описание этой опции в config/default-dir-config.js.

----------------------------------

## API для создания тестов:

В директории api находятся функции, которые выполняют эмуляцию действий пользователя, логирование, и другие действия.
См. JSDoc документацию в комментариях к функциям.

----------------------------------
## FAQ и хитрости:

* Как запускать тесты на Windows, чтобы они не мешали работать?

  Можно установить desktops и запускать тесты на альтернативном рабочем столе.
  https://technet.microsoft.com/en-us/library/cc817881.aspx

	TODO: давно не тестировал на Windows, не уверен, что сходу всё заработает.

* Как подписаться на RSS обновлений движка:

	https://github.com/Dzenly/tia/releases.atom
	
	
* Если IDE плохо автодополняет 's.' конструкции внутри тестов, попробуйте использовать 'gT.s.',
мой WebStorm 2016.1.1 в этом случае автодополняет нормально.

* Можно исследовать глобальные объекты (например, s) в дебажном режиме,
  сделав брейк - поинт в тесте (см. объект global, например global.t, global.s и т.д.).
   
* Корень проекта содержит .jshintrc, .jscsrc файлы, которые могут сильно ускорить поиск ошибок.

----------------------------------

## Содержимое директории:

* bin/tia.js - утилита для запуска тестов, наберите "node --harmony tia.js --help", для просмотра помощи по утилите.
При глобальной установке, достаточно набрать "tia --help".
* api - API для использования в тестах.
  Поддиректории browser-part содержат скрипты, которые исполняются в браузере.
* inner-docs - внутренняя документация.
https://github.com/Dzenly/tia/tree/master/inner-docs
* engine - внутренние файлы движка.
* log-viewer - здесь разрабатывается веб-клиент для очень удобной работы с логами.
* tests - директория с пакетами тестов.
*     tia - Тесты для общей части.
*     wd-helpers - Тесты для web driver части.
* utils - внутренние утилитные функции, используемые движком.
* xvfb - utility to run GUI tests so as do not prevent other work with the computer.
  See xvfb/readme.md for more details.

* Есть следующие форматы файлов:
*     *.log - лог от теста.
*     *.mlog - мета лог от директории с тестами.
*     *.mlog.json - мета лог в JSON формате (для последующего использования веб - просмотрщиком логов)
*     *.mlog.notime - мета лог с вырезанным временем.
*     *.mlog.notime.prev - предыдущий мета лог с вырезанным временем.

----------------------------------

## Известные фичи и баги:

* Не обращайте внимания на такое сообщение:
  .../.nvm/versions/node/v4.4.1/bin/tia: line 2: //#: No such file or directory

* На Windows не работает сохранение профайла после выхода из браузеров.
  Т.е. можно юзать кастомные профайлы заранее созданные, но в них ничего не запишется при выходе из браузера.
  У Chrome получается битый профайл, а Firefox в сочетании с selenium воспринимает
  профайл, как шаблон для создания своего временного профайла, опция -profile не работает с selenium :(.
  Не очень долго разбирался с этим, ибо тесты с сохранением куков и сессий между запусками браузера,
  пока считаю экзотикой.
  
* На Linux сохранение профайла работает для chrome. А для firefox так же, как для Windows.

* Парочка тестов в пакете tia намеренно вызывает exceptions.
  см. также TODO* файлы в inner-docs директории:
  https://github.com/Dzenly/tia/tree/master/inner-docs

* Иногда Selenium глючит, если параллельно с тестами, что-то делать за компом (если не через xvfb).
  Т.е. желательно не менять фокусы ввода элементов и окон, пока работают тесты.
  
* На Windows иногда глючит ожидание title у страницы. Title уже давно сменился, а Selenium думает, что
  title старый (проверить, не связано ли это с одновременной работой параллельно с тестами).

----------------------------------

## Лицензия: MIT.

----------------------------------

## Благодарности.

Движок начинал развиваться в компании "R-Vision" (https://rvision.pro/).
Спасибо "R-Vision" за начальное спонсирование и разрешение открыть код.

----------------------------------

## Donations

More then 10 years I have been involved in auto-testing.
So I develop this test engine using all my experience and best practices.
Also I learn existing test engines and add their best parts to TIA.
My TODO lists are in 'inner-docs' project directory:
https://github.com/Dzenly/tia/tree/master/inner-docs.
In a few weeks I am planning to translate all docs to English and create a github wiki page.
Here is an info about my accounts for donations:
https://github.com/Dzenly/tia/blob/master/donations-info.md
