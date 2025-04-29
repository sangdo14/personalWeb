document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("header", "ui/header.html");
  // document.querySelector(".btnOut").addEventListener("click", requestLogout);
  // checkLogin();
});

async function loadComponent(selector, file) {
  const res = await fetch(file);
  const html = await res.text();
  const targetEl = document.querySelector(selector);
  targetEl && (targetEl.innerHTML = html);
}

// async function requestLogout() {
//   const res = await fetch("http://127.0.0.1:8080/api/logout", {
//     method: "GET",
//     credentials: "include",
//   });
//   const result = await res.json();
//   window.alert(result.message);
//   window.location.href = "login.html";
// }

// // 해당 요청은 다시 DB탐색 요청이 아닌 이미 담겨있는 세션의 값 확인 요청
// async function checkLogin() {
//   const res = await fetch("http://127.0.0.1:8080/api/check", {
//     method: "GET",
//     credentials: "include",
//   });
//   const result = await res.json();
//   console.log(result);
//   return result;
// }