// 1、输入框以及文本节点与 data 中的数据绑定

// 2、输入框内容变化时，data 中的数据同步变化。即 view => model 的变化。

// 3、data 中的数据变化时，文本节点的内容同步变化。即 model => view 的变化。

function MyVue(options){
  this.data = options.data //获取data对象
  let data = this.data
  observe(data,this)
  let id = options.el //获取挂载的div的id
  let frag = nodeToFragment(document.getElementById(id),this) //创建vnode
  document.getElementById(id).appendChild(frag) //挂载dom
}

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
  // 获取 data 中的属性值
  get: function(){
    this.value = this.vm[this.name]  // 触发相应属性的 get
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

function nodeToFragment(node,vm){
  let frag = document.createDocumentFragment()
  let child
  //appendChild 方法有个隐蔽的地方，就是调用以后 child 会从原来 DOM 中移除
  // 所以，第二次循环时，node.firstChild 已经不再是之前的第一个子元素了
  while (child = node.firstChild){
    compile(child,vm)
    frag.appendChild(child) //劫持node的所有子节点
  }
  return frag
}

function compile(node,vm){
  const reg = /\{\{(.*)\}\}/
  if(node.nodeType===1){  //节点类型为元素
    let attr = node.attributes
    for(let i=0;i<attr.length;i++){
      if(attr[i].nodeName == 'v-model'){  //找到v-model属性
        let name = attr[i].nodeValue  //获取v-model绑定的属性名
        node.addEventListener('input',function(e){
          vm[name] = e.target.value  //给相应的data赋值，触发该属性的set方法
        })
        // node.value = vm[name] 
        node.value = vm[name] //将data的值赋给node
        node.removeAttribute('v-model')
      }
    }
  }else if(node.nodeType===3){  //节点类型为text
    if(reg.test(node.nodeValue)){ //正则匹配{{...}}
      let name = RegExp.$1  //获取括号里的字符串
      name = name.trim()
      new Watcher(vm,node,name)
    }
  }
}

function defineReactive(obj,key,value){
  let dep = new Dep()
  Object.defineProperty(obj,key,{
    get: function(){
      if(Dep.target) dep.addSub(Dep.target) // 添加订阅者 watcher 到主题对象 Dep
      return value
    },
    set: function(newValue){
      if(newValue === value) return
      value = newValue
      // 作为发布者发出通知
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