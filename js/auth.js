import { API_URL } from "./config.js";

// 로그인 체크
export async function checkLogin() {
  const res = await fetch(`${API_URL}/api/check`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();

  if (result.isLogin) {
    document.querySelector("#join").style.display = "none";
    document.querySelector("#login").style.display = "none";
    document.querySelector("#logout").style.display = "block";
    document.querySelector("#admin").style.display = "block";
  } else {
    document.querySelector("#join").style.display = "block";
    document.querySelector("#login").style.display = "block";
    document.querySelector("#logout").style.display = "none";
    document.querySelector("#admin").style.display = "none";
  }

  return result;
}
