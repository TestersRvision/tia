'use strict';

// Обычная функция.
function commonFunc() {
  return 11;
}

// Функция в переменной.
const varFunc = function varFunc() { // myVarFunc опционально, но желательно.
  return 22;
};

// =================

// Стрелочная функция.
const arrowFunc = arg => arg * 3;

const arrowFunc1 = (arg1, arg2) => {
  return {
    property1: arg1 * 3,
    property2: arg2 * 4,
  };
};

// Это почти то же самое, что и:
function nonArrowFunc(arg) {
  return arg * 3;
}

const arrowFuncWithThis = () => {
  console.log('arrowFuncWithThis');
  console.log(this);
  console.log(this.a);
};

const myObj1 = {

  a: 'myObj1.a',

  // Функция внутри объекта.
  obj1Func() {
    console.log('obj1Func');
    console.log(this.a);
  },

  obj1ArrowFunc: () => {
    console.log('obj1ArrowFunc');
    console.log(this.a);
  },
};

const myObj2 = {
  a: 'myObj2.a',
};

const myObj3 = {
  a: 'myObj3.a',

  obj3Func() {
    myObj1.obj1ArrowFunc();
  },

};

console.log('Test1 ============== ');
myObj1.obj1Func();


const myFuncCopy = myObj1.obj1Func;

// console.log('Test2 ============== ');
// myFuncCopy();

console.log('Test3 ============== ');
myFuncCopy.apply(myObj2);

console.log('Test4 ============== ');
myObj1.obj1ArrowFunc();

console.log('Test5 ============== ');
myObj3.obj3Func();
