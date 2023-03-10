/// 导出默认函数, 用于创建一个element节点

import './index.css';

import photo from './assets/test.jpeg';

const getName = () => {
  return 'hello world';
}



export default () => {
  const element = document.createElement('h3');
  element.textContent = 'Hello world';

  const image = new Image();
  image.src = photo;

  const ele = document.createElement('div');
  console.log('hello world');

  ele.append(image);
  ele.append(element);
  return ele;
}