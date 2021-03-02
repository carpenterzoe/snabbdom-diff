// 真正创建节点
// 将 vnode 创建为 dom, 目前是孤儿节点，不插入真实dom树

export default function createElement(vnode) {

  let domNode = document.createElement(vnode.sel)

  // 有子节点 还是有文本
  if (vnode.text !== '' && 
     (vnode.children === undefined || !vnode.children.length)
  ) {

    domNode.innerText = vnode.text

  } else if (Array.isArray(vnode.children) && vnode.children.length) {

    for(let i=0; i<vnode.children.length; i++) {
      let ch = vnode.children[i]
      let chDom = createElement(ch)

      // chDom的父级 是 vnode.elm
      // vnode.elm.appendChild(chDom) // 有误
      // 走到这里的时候， 文本判断的部分还没有进去
      // 所以 vnode.elm 没有值，要用 domNode
      domNode.appendChild(chDom)
    }
  }

  vnode.elm = domNode
  return vnode.elm      // 传入vnode，返回真实的dom元素
}