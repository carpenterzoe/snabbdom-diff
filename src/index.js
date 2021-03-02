import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'

const myVnode1 = h('h2', {}, [
  h('li', {}, 'A'),
  h('li', {}, 'B'),
  h('li', {}, [
    h('ol', {}, [
      h('li', {}, '哈哈'),
      h('li', {}, '呼呼'),
      h('li', {}, '呱呱'),
    ]),
  ]),
  h('li', {}, 'D')
])

// const myVnode1 = h('h2', {}, '张三')

const container = document.getElementById('container')

patch(container, myVnode1)