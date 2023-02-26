import getUser from './api';

getUser();


const div = document.createElement('div');
div.innerHTML = 'here is  about page';
console.log('div', div);
document.body.appendChild(div);
