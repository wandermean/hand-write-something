let c = [1,[2,3,4]];
let [a,b] = c;
c[1].push(5);
console.log(a);
console.log(b);