import { checkLogin } from './auth.js';

async function main() {
  const user = await checkLogin();

  if(user.isLogin){
    const h1 = document.querySelector('h1');
    const h2 = document.querySelector('h2');
    h1.innerHTML = `${user.username} 님의 화면입니다.`;
    h2.innerHTML = `남기는 말: ${user.intro}`;
  }
}
main()