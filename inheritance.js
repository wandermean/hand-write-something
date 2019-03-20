function People(name){
  this.name = name;
}

People.prototype.say = function(){
  console.log(this.name);
}

function Goodpeople(name){
  People.call(this,name);
}

// Goodpeople.prototype = new People(); //组合继承，有缺点
function F(){}
F.prototype = People.prototype;
Goodpeople.prototype = new F();
Goodpeople.constructor = Goodpeople;

let a = new Goodpeople('阿汪');
console.log(Goodpeople.constructor)
a.say();