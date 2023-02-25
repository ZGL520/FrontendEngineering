/// 导出默认函数, 用于创建一个element节点

import './index.css';

import photo from './assets/test.jpeg';



export default () => {
  const element = document.createElement('h3');
  element.textContent = 'Hello world';

  const image = new Image();
  image.src = photo;

  const ele = document.createElement('div');

  ele.append(image);
  ele.append(element);
  return ele;
}