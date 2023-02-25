/// 导出默认函数, 用于创建一个element节点

import './index.css';

export default () => {
  const element = document.createElement('h3');
  element.textContent = 'Hello World';
  return element;
}