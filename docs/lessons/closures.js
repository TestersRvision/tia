'use strict';

global.a = 34;

//let a = 4;

function createFunction() {
  return function asdf() {
    console.log(a);
  };
}

function createFunc(a) {

  // a - 10

  return function() {
    // let a = 5;
    console.log(a);
  };
}

const myFunc = createFunc(10);

myFunc();
