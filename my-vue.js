function Watcher(vm,node,name){
  Dep.target = this
  this.node = node
  this.name = name
  this.vm = vm
  this.update()
  Dep.target = null
}

Watcher.prototype = {
  update: function(){
    this.get()
    this.node.nodeValue = this.value
  },
  get: function(){
    this.value = this.vm[this.name]
  }
}

function Dep(){
  this.subs = []
}

Dep.prototype = {
  addSub: function(sub){
    this.subs.push(sub)
  },
  notify: function(){
    this.subs.forEach((sub)=>{
      sub.update()
    })
  }
}

function MyVue(options){
  this.data = options.data
  let data = this.data
  observe(data,this)
  let id = options.el
  let frag = nodeToFragment(document.getElementById(id),this)
  document.getElementById(id).appendChild(frag)
}

function nodeToFragment(node,vm){
  let frag = document.createDocumentFragment()
  let child
  while (child = node.firstChild){
    compile(child,vm)
    frag.appendChild(child)
  }
  return frag
}

function compile(node,vm){
  const reg = /\{\{(.*)\}\}/
  if(node.nodeType===1){ //元素
    let attr = node.attributes
    for(let i=0;i<attr.length;i++){
      if(attr[i].nodeName == 'v-model'){
        let name = attr[i].nodeValue
        node.addEventListener('input',function(e){
          vm[name] = e.target.value
        })
        node.value = vm[name]
        node.removeAttribute('v-model')
      }
    }
  }else if(node.nodeType===3){
    if(reg.test(node.nodeValue)){
      let name = RegExp.$1
      name = name.trim()
      new Watcher(vm,node,name)
    }
  }
}

function defineReactive(obj,key,value){
  let dep = new Dep()
  Object.defineProperty(obj,key,{
    get: function(){
      if(Dep.target) dep.addSub(Dep.target)
      return value
    },
    set: function(newValue){
      if(newValue === value) return
      value = newValue
      dep.notify(Dep.target)
      console.log(`${key}的值变为${value}`)
    }
  })
}

function observe(obj,vm){
  Object.keys(obj).forEach(function(key){
    defineReactive(vm,key,obj[key])
  })
}