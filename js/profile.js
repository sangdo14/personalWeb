import { checkLogin } from './auth.js';
checkLogin();

setTimeout(topShow, 1);
setTimeout(h1Show, 1000);
setTimeout(jobBoxShow, 2000);
setTimeout(summaryShow, 3000);
setTimeout(contentsShow, 4000);


function topShow() {
  document.querySelector('.top').classList.add('show');
}
function h1Show() {
  document.querySelector('h1').classList.add('show');
}
function jobBoxShow() {
  document.querySelector('.jobBox').classList.add('show');
}
function summaryShow() {
  document.querySelector('.summary').classList.add('show');
}
function contentsShow() {
  document.querySelector('.contents1').classList.add('show');
  document.querySelector('.contents2').classList.add('show');
}
