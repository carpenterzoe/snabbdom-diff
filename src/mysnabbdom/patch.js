import vnode from './vnode'
import createElement from './createElement'

export default function(oldVnode, newVnode) {

  // 判断传入的第一个参数 是真实dom节点 还是虚拟节点
  // 初始的第一次，container 是真实dom节点

  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // 真实节点包装成vnode，好进行vnode属性对比
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    )
  }

  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
  
  } else {

    // 不是同个节点，暴力插入新的，删除旧的
    let newVnodeElm = createElement(newVnode)

    // 还没有处理数组情况时 vnode.elm的返回是undefined 所以newVnodeElm没有值
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
  }
}