function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  let _args = [...arguments];
  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  let adder = function() {
    let _adder = function() {
      _args.push(...arguments);
      console.log(_args)
      return _adder;
    };
    // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function() {
      return _args.reduce(function(a, b) {
        return a + b;
      });
    };
    return _adder;
  };
  return adder(..._args);
}
console.log(add(1,2,3)(2)(3)(4)(5).toString());
