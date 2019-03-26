function curry(fn){
  let fnArgs = fn.length;
  args = [...arguments].slice(1);
  return function(){
    let _args = [...arguments,...args];
    if(_args.length < fnArgs){
      return curry.call(this,fn,args);
    }
    return fn.apply(this,_args);
  }
}

function add(x,y,z){
  return x+y+z;
}

// const curry12 = curry(add,1,2);
console.log(curry(add,1)(3)(3)(3))