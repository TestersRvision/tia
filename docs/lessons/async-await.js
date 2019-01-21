'use strict';

function readFromHttp() {
  return new Promise((resolve, reject) => {

    // setTimeout(() => {
    //   resolve('Результат');
    // }, 1000);

    throw new Error('Ошибка');
    // reject(new Error('Ошибка'));
  });
}


async function test() {

  let result;
  //
  // try {
  //   result = await readFromHttp(); // throw
  //   console.log(result);
  // } catch (err) {
  //   console.error('Отлов ошибки внутри асинхронной функции');
  //   console.error(err);
  // }

  result = await readFromHttp();

  // result
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err)=> {
  //     console.error(err);
  //   })


  console.log(result);
  //
  // result = await readFromHttp();
  // console.log(result);
  //
  // result = await readFromHttp();
  // console.log(result);
  //
  // result = await readFromHttp();
  // console.log(result);
  //
  // result = await readFromHttp();
  // console.log(result);
  //
  // result = await readFromHttp();
  // console.log(result);

  // throw new Error('Моя ошибка');

  return 'Конец';
}


test()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error('Отлов ошибки снаружи асинхронной функции');
    console.error(err);
  });

