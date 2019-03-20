function People(name){
  this.name = name;
}

People.prototype.say = function(){
  console.log(this.name);
}

function Man(sex){
  this.sex = sex;
}

Man.prototype.saySex = function(){
  console.log(this.sex);
}

function Goodpeople(name,sex){
  People.call(this,name);
  Man.call(this,sex);

}

// Goodpeople.prototype = new People(); //组合继承，有缺点

Goodpeople.prototype = Object.create(People.prototype)
Goodpeople.prototype = Object.assign(People.prototype,Man.prototype)

//道爷的方法
// function F(){}
// F.prototype = People.prototype;
// Goodpeople.prototype = new F();
Goodpeople.prototype.constructor = Goodpeople;

let a = new Goodpeople('阿汪','男');
console.log(Goodpeople.prototype.constructor)
a.say();
a.saySex();