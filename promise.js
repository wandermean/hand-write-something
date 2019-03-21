const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class myPromise{
  constructor(fn){
    this.state = PENDING;
    this.value =null;
    this.resolvedCbs = [];
    this.rejectedCbs = [];
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
    try {
      fn(this.resolve,this.reject)
    } catch (error) {
      reject(error)
    }
  }

  resolve(value){
    if(this.state == PENDING){
      this.state = RESOLVED;
      this.value = value;
      this.resolvedCbs.map((cb)=>cb(this.value))
    }
  }

  reject(value){
    if(this.state == PENDING){
      this.state = REJECTED;
      this.value = value;
      this.rejectedCbs.map((cb)=>cb(this.value))
    }
  }

  then(resolvedCb,rejectedCb){
    resolvedCb = typeof resolvedCb == 'function' ? resolvedCb : value => value;
    rejectedCb = typeof rejectedCb == 'function' ? rejectedCb : error => { throw error };
    if(this.state == PENDING){
      this.resolvedCbs.push(resolvedCb);
      this.rejectedCbs.push(rejectedCb);
    }
    if(this.state == RESOLVED){
      this.resolvedCb(this.value)
    }
    if(this.state == REJECTED){
      this.rejectedCb(this.value)
    }
  }
}

new myPromise((resolve,reject)=>{
  setTimeout(() => {
    resolve(1)
  }, 1000);
}).then(res => console.log(res),error => {throw error})
