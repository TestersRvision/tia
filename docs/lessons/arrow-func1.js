'use strict';


const objCreator = {

  a: 'objRunner.a',
  createObj() {

    // this - objCreator

    const innerObj = {

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

    return innerObj;
  },

};

const obj = objCreator.createObj();

obj.obj1Func();

obj.obj1ArrowFunc();
