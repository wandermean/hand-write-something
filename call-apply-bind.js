Function.prototype.myCall = function(context){
  if(!typeof this == 'function'){
    throw new TypeError('not function')
  }
  const fn = Symbol('fn');
  context = context || global;
  context[fn] = this;
  const args = [...arguments].slice(1);
  const result = context[fn](...args);
  delete context[fn];
  return result;
}

Function.prototype.myApply = function(context){
  if(!typeof this == 'function'){
    throw new TypeError('not function')
  }
  const fn = Symbol('fn');
  context = context || global;
  context[fn] = this;
  let result;
  if(arguments[1]){
    result = context[fn](...arguments[1]);
  }else{
    result = context[fn]()
  }
  delete context[fn];
  return result;
}

Function.prototype.myBind = function(context){
  if(!typeof this == 'function'){
    throw new TypeError('not function')
  }
  const self = this;
  const args = [...arguments].slice(1);
  return function F(){
    if(this instanceof F){
      return new self(...args,...arguments)
    }
    return self.apply(context,args.concat(...arguments))
  }
}

function Parent(x,y,z){
  this.x = x;
  this.y = y;
  this.z = z;
}

function Sub(x,y,z){
  Parent.myCall(this,x,y,z)
}

function Sub2(x,y,z){
  Parent.myApply(this,[x,y,z])
}

// const testFn = {
//   testBind(y,z){
//     console.log(this.x+y+z)
//   }
// }

function myInstanceof (left,right){
  while(true){
    console.log(left)
    if(left === null){
      return false
    }
    if(left === right.prototype){
      return true
    }
    left = left.__proto__
  }
}

let a = new Sub(1,2,3)
console.log(myInstanceof(a,Parent))
// let b = new Sub2(5,6,7)
// console.log(a)
// console.log(b)
// testFn.testBind.myBind(b,9)(2)