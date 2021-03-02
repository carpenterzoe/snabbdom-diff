import vnode from './vnode'

/**
 * 调用的三种情形
 * h('div', {}, '文字')
 * h('div', {}, [])
 * h('div', {}, h())
 */

export default function(sel, data, c) {

  if (arguments.length !== 3) {
    throw new Error('h函数接收3个参数')
  }

  if (typeof c === 'string' || typeof c === 'number') {
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    
    // 收集每一项子函数调用的结果，放进children
    let children = []
    for (let i = 0; i < c.length; i++) {

      if (typeof c[i] === 'object' && c[i].hasOwnProperty('sel')) {
        // 外部调用h函数时，这种数组情况的子节点也是函数
        // 所以这里拿到的是函数执行后的返回值  vnode对象
        // 直接push 到children里， 作为属性 放到vnode中即可
        children.push(c[i])   
      } else {
        throw new Error('参数有误 case2')
      }
    }

    return vnode(sel, data, children, undefined, undefined )
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // h() 函数调用返回是vnode对象  且对象中必定有sel属性
    let children = [c]
    return vnode(sel, data, children, undefined, undefined )
  } else {
    throw new Error('参数有误 case 3')
  }
}