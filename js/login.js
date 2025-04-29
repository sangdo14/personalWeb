const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", requestLogin);

async function requestLogin(e) {
  e.preventDefault();
  //폼에 입력한 로그인 정보를 아래 패턴의 구문을 통해 바로 DTO형식으로 반한받음
  const formData = new FormData(e.target);
  const loginDTO = Object.fromEntries(formData.entries());

  //DTO형식의 폼정보를 문자화해서 Post 요청 서버에 전달
  const res = await fetch("http://127.0.0.1:8080/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(loginDTO)
  });
  const result = await res.json();

  // 반환된 result 값에 따라 로그인 판별
  if (result.isLogin) {
    window.alert("로그인 되었습니다.");
    window.location.href = "admin.html";
  } else {
    window.alert("해당 정보의 사용자가 없습니다.");
  }
}
