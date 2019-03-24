function debounce(fn,wait,context){
  let timer = null;
  return function(){
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context,args)
    }, wait);
  }
}

function throttle(fn,wait,context){
  let canRun = true;
  return function(){
    let args = arguments;
    if(!canRun){
      return
    }
    fn.apply(context,args)
    canRun = fasle;
    setTimeout(() => {
      canRun = true;
    }, wait);
  }
}