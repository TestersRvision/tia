## Настройки / Управление инцидентами / справочники

TODO: Добавить тестплан для системных (т.е. непользовательских) справочников.

TODO: Поля инцидентов - можно выбрать справочник. Пока негде выбирать значения из справочников. Но, скоро это будет готово. Тогда проверить, что новые записи из справочников появляются в контролах. А при удалении записей и справочников - проверить, что эти записи больше не появляются в контролах.
TODO: Пока не тестируем удаление системных справочников. Ещё не решили оставлять ли этот функционал.

TODO:  Унифицировать тест для разных локализаций. И вообще ожиданемые сообщения брать из локали а не из захардкоженных строк.

TODO for Future:  Eсли добавятся другие кнопки, кроме "Информация" справа от средней панели - сделать тесты для этих кнопок.


### Общий код автотестов
 
#### checkDictExistsInMidPanel(dict). Проверить что справочник с именем dict есть в списке в средней панели.

* Открыть список справочников в средней панели.
* Убедиться, что среди списка есть справочник с именем dict.

#### checkDictAbsentsInMidPanel(dict). Проверить что справочник с именем dict отсутствует в списке в средней панели.

* Открыть список справочников в средней панели.
* Убедиться, что среди списка отсутствует справочник с именем dict.

#### checkDictExists(newDict, oldDict). Проверить, что в системе есть справочник с именем newDict и опционально, что нет справочника с именем oldDict.
* checkDictExistsInMidPanel(newDict)
* Перейти в Управление инцидентами / Поля инцидентов.
* Выбрать справа "Тип:" -> "Выпадающий список".
* Убедиться, что в раскрывающемся списке "Справочник:" нет oldDict (если оно задано), но есть newDict.

#### checkDictAbsents(dict). Проверить, что в системе нет справочника с именем name.
* Перейти в Управление инцидентами / Поля инцидентов.
* Выбрать справа "Тип:" -> "Выпадающий список".
* Убедиться, что в раскрывающемся списке "Справочник:" нет dict.

#### checkDictRecordExistsInMidPanel(record). Проверить, что в средней панели есть запись record.

* subj

#### checkDictRecordExists(dict, record). Проверить, что в системе есть справочник с именем dict и у него есть запись record.

TODO: сделать после имплементации.

#### checkDictRecordAbsents(dict, record). Проверить, что в системе есть справочник с именем dict и у него нет записи record.

TODO: сделать после имплементации.

#### waitForReadiness(). Ждать пока обработается запрос к базе.

TODO: пока не знаю как имплементировать. Возможно, тупой sleep.
TODO: возможно, стоит отделить торможение при обращении к базе от других торможений в интерфейсе.

###  Подготовка

	* Зайти на http://localhost:1337, залогиниться.
	* Зайти в меню настройки.
	* Сликнуть мышкой по разделу "Управление инцидентами" слева.
	* Проверить, что курсор находится на папке дерева "Управление инцидентами" -> "Справочники".

### Шапка средней панели (приоритет минимальный)

TODO: Когда/если заработают фильтр и сортировка - сделать тесты для них. Либо вообще убрать этот функционал.

	* Проверить, что в средней панели есть два столбца: "№" И "Наименование".
	* Навести мышь на заголовок "№". Убедиться, что появился значок выпадающего меню.
	* Кликнуть на значок. Проверить, что появилось всплывающее меню: Сортировать по возрастанию, Сортировать по убыванию, Столбцы. TODO: если уберем сортировку - подправить пункт.
	* Навести на столбцы, убедиться, что всплыло ещё одно меню с чекбоксами "№" И "Наименование", оба чекбокса enabled и в состоянии checked.
	* Анчекнуть чекбокс "№". Убедиться, что столбец "№" исчез. Оба всплывающих меню всё ещё на экране. А чекбокс "Наименование" стал disabled.
	* Кликнуть по чекбоксу "Наименование". Убедиться, что столбец "Наименование" всё ещё отображается. Убедиться, что оба всплывающих меню на экране.
	* Кликнуть по чекбоксу "№". Проверить, что столбец появился.

### Операции со списком справочников

#### Вывод и изменение наименования справочника

* Кликнуть на директорию "Управление рисками" / "Справочники" в левой панели.
* Кликнуть на первый справочник. Проверить, что справа в поле ввода "Наименование" появляется наименование справочника.
* Кликнуть на "Тестовый справочник".
* Поменять Наименование на "Тестовый справочник 1". waitForReadiness().
* Проверить, что имя справочника в средней панели поменялось на "Тестовый справочник 1".
* checkDictExists("Тестовый справочник 1", "Тестовый справочник")
* Поменять название обратно на "Тестовый справочник".
* Удалить справа название "Тестовый справочник" полностью (т.е. до пустой строки). waitForReadiness().
* Убедиться, что в средней панели, есть по прежнему название "Тестовый справочник".
* Кликнуть на другой справочник, кликнуть на "Тестовый справочник". Убедиться, что справа в "Наименование:" появился "Тестовый справочник".

####  Добавление пользовательского справочника

* Проверить, что (справа от средней панели) есть кнопка +, и при наведении мыши на неё - есть tooltip "Добавить справочник".
* Нажать на кнопку +.
* Нажать на кнопку "Добавить" справа. Убедиться, что в списке словарей их осталось столько, сколько было.
* Убедиться, что поле ввода "Наименование" справа подсветилось красным.
* Навести мышь на поле ввода "Наименование" справа. Убедиться, что есть всплывающая подсказка "Это поле обязательно для заполнения".
* Справа ввести "Наименование" "Тестовый справочник 2". Нажать "Добавить". waitForReadiness().
* checkDictExists("Тестовый справочник 2").
* TODO: любые ли наборы символов поддерживаются как название? Сейчас можно создавать словарь с именем, состоящим из одних пробелов.

#### Попытка добавления пользовательского справочника с уже существующим именем

* Убедиться, что при добавлении справочника с уже существующим именем будет такое-то сообщение об ошибке. (NOTE: В тестплане допустимы такие общие формулировки в простых случаях. Это значит создатель автотестов сделает это на своё усмотрение). (TODO: уточнить какое, такое, как сейчас - не очень подходит для конечного пользователя).

#### Удаление пользовательского справочника

* Кликнуть в средней панели "Тестовый справочник 2".
* Убедиться, что есть кнопка "-" (справа от средней панели). Убедиться, что на ней есть tooltip "Удалить справочник".
* Нажать на эту кнопку. Убедиться, что появился диалог "Удаление", "Вы действительно хотите удалить выбранный справочник?".
* Нажать "Нет".
* checkDictExistsInMidPanel("Тестовый справочник 2"). Ещё раз нажать на кнопку "-". На этот раз закрыть диалог крестиком справа сверху.
* checkDictExistsInMidPanel("Тестовый справочник 2"). Ещё раз нажать на кнопку "-". На этот раз в диалоге нажать "Да".
* waitForReadiness(). checkDictAbsents("Тестовый справочник 2").

#### Прерывание процесса добавления нового справочника

* Начните добавлять новый пользовательский справочник "Тестовый справочник 3". Но не нажимайте кнопку "Добавить".
* Кликните на "Тестовый справочник".
* Убедитесь, что появился диалог "Подтверждение". "Вы начали заполнять форму добавления. После выделения записи в списке слева все несохраненные данные будут утеряны. Продолжить?".
* Нажмите "Нет". Убедитесь, что в поле "Наименование" справа всё ещё текст "Тестовый справочник 3".
* Опять кликните на "Тестовый справочник". В диалоге подтверждения нажмите "Да". Убедитесь, что "Тестовый справочник" помечен как текущий и в поле "Наименование" справа текст "Тестовый справочник".

### Операции над записями в пользовательском справочнике.

* Добавить "Тестовый справочник 3". Выбрать его в левой панели.
* Нажать кнопку "Добавить" в правой панели.
* В правой панели в Наименование ввести "Тестовая запись".
* Убедиться, что курсор ввода переместился в поле "Наименование", и оно подсветилось красным.
* Навести мышь на поле "Наименование" и проверить, что tooltip: "Это поле обязательно для заполнения".
* Ввести "Тестовая запись". Нажать "Добавить". waitForReadiness().
* checkDictRecordExistsInMidPanel("Тестовая запись").
* ...


=====================
