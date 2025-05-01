import { API_URL } from "./config.js";
import { checkLogin } from './auth.js';
checkLogin();

const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const check = checkForm(e);

  if(!check){ 
    sendForm(e);
  }
});

// 값 체크
function checkForm(e) {
  const formData = new FormData(form);
  
  // 0. 전송버튼 클릭할때마다 모든 에러문구 일단 숨김처리.
  const errs = form.querySelectorAll('span');
  errs.forEach((text, idx) => {
    text.style.display = 'none';
  });

  // 각 폼 값 확인.
  let check = false;

  // 1. 아이디
  if (formData.get('userid').trim().length < 2) {
    check = true;
    console.error('아이디는 최소 2글자 이상 입력하세요.');
    form.querySelector('.errid').style.display = 'block';
  }

  // 2. 비밀번호
  const pw1 = formData.get('pw1');
  const pw2 = formData.get('pw2');

  // 2-1. 비밀번호 인증 구현 (특수문자, 문자, 순자 모두 포함)
  // 테스트할 조건을 정규표현식으로 미리 설정
  const spc = /[~!@#$%^&*()]/;
  const str = /[a-zA-Z]/;
  const num = /[0-9]/;
  // 정규표현식이 포함되었는지 확인.
  if (!spc.test(pw1) || !str.test(pw1) || !num.test(pw1)) {
    check = true;
    console.error('비밀번호는 특수문자, 문자, 숫자 모두 포함해야 합니다.');
    form.querySelector('.errPwd1').style.display = 'block';
  }

  // 2-2. 비밀번호 확인과 동일한지 확인
  if (pw1 !== pw2) {
    check = true;
    console.error('비밀번호가 서로 다릅니다.');
    form.querySelector('.errPwd2').style.display = 'block';
  }

    // 3. 이름
  if (formData.get('name').trim().length < 2) {
    check = true;
    console.error('이름은 최소 2글자 이상 입력하세요.');
    form.querySelector('.errname').style.display = 'block';
  }

  // 4. 이메일 인증처리
  const email = formData.get('email');
  const [forwardText, backwardText] = email.split('@');

  // 4-1. @앞뒤로 문자값 모두 존재 (1차 실패시 인증 실패)
  // 4-2. 1번 조건이 만족된 상태에서 다시 ,앞뒤로 문자값 존재 (2차까지 인증완료 되야함)
  if (!forwardText || !backwardText) {
    check = true;
    console.error('@앞뒤로 문자값이 필요합니다.');
    form.querySelector('.erremail').style.display = 'block';
  } else if (!backwardText.split('.')[0] || !backwardText.split('.')[1]) {
    check = true;
    console.error('.앞뒤로 문자값이 필요합니다.');
    form.querySelector('.erremail').style.display = 'block';
  }

  return check;
}

// 값 전송
async function sendForm(e) {
  //아래 두줄의 코드는 form안쪽의 모든 값들을 직렬화 해서 객체로 변환할때 자주 쓰이는 패턴
  const formData = new FormData(e.target);
  const formJSON = Object.fromEntries(formData.entries());
  //formData.entries(); --->  [ [key,value], [key,value], [key,value] ]
  //Object.fromEntries([ [key,value], [key,value], [key,value] ]) ---> {key: value, key:value, key: value}

  const data = await fetch(`${API_URL}/api/join/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formJSON)
  })

  const result = await data.json();
  alert(result.message);
  
  location.href = "login.html";
}
