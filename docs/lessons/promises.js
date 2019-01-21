'use strict';

function readFromHttp() {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      resolve('Результат');
    }, 1000);

    // throw new Error('Ошибка');
    // reject(new Error('Ошибка'));
  });

}

function readFromHttp1() {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      resolve('Результат1');
    }, 1000);

    // throw new Error('Ошибка');
    // reject(new Error('Ошибка'));
  });

}


// then hell.

readFromHttp()
  .then((result) => {
    console.log(result);
    return readFromHttp1();
  })
  .then((result) => {
    console.log(result);
    return readFromHttp2();
  })
  .then((result) => {
    console.log(result);
    return readFromHttp3();
  })
  .then((result) => {
    console.log(result);
    return readFromHttp4();
  })
  .catch((err) => {
    console.error(err);
  });
