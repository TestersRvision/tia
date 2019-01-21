'use strict';

function readFromHttp() {
  return new Promise((resolve, reject) => {

    // setTimeout(() => {
    //   resolve('Результат');
    // }, 1000);

    // throw new Error('Ошибка');
    // reject(new Error('Ошибка'));
  });
}

async function test() {
  let result;
  result = await readFromHttp();
  return 'Конец';
}

// readFromHttp()
//   .then((result) => {
//     console.log(result);
//   });

// Кода нет.
//


//
// test()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.error('Отлов ошибки снаружи асинхронной функции');
//     console.error(err);
//   });
//
