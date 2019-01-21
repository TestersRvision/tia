'use strict';

// caller - тот, кто вызывает функцию.

// callbacks - функции обратного вызова.
// Колбэк передается пользователем функции, обычно, чтобы ему её вызвали когда какая-то операция
// завершится.

// Зачем. Для асинхронности. Чтобы другие операции не ждали.

function readFromHttp(callback) {
  setTimeout(() => {
    // callback(null, 'Наш результат');
    callback(new Error('Ошибка'));
  }, 1000);
}


function handler(err, result) {

}

readFromHttp(() => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
  readFromHttp1(() => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
    readFromHttp2(() => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
      }
    });
  });
});

// Обычно, первым параметром передается ошибка или null, если ошибки нет.
// А вторым параметром передается результат.


// callback hell.
