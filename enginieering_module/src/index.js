/// 引入create_node.js
/// 将create_node.js中的方法结果添加到document.body中

import createDiv from './create_node';
import getUser from './api';


const div = createDiv();
console.log('div', div);
document.body.appendChild(div);

getUser();



module.hot.accept('./create_node', () => {
  document.body.removeChild(div);
  const div = createDiv();
  document.body.appendChild(div);
});