import { API_URL } from "../js/config.js";

class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav style="z-index:1;">
        <a href="index.html" id="index"><i class="fa-solid fa-square-h"></i></a>
        <a href="profile.html" id="profile"><i class="fa-solid fa-circle-info"></i></a>
        <a href="join.html" id="join"><i class="fa-solid fa-square-plus"></i></a>
        <a href="login.html" id="login"><i class="fa-solid fa-arrow-right-to-bracket" ></i></a>
        <a href="#" id="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
        <a href="admin.html" id="admin"><i class="fa-solid fa-users-gear"></i></a>
      </nav>
    `;
  }
}
customElements.define("my-header", MyHeader);

// 로그아웃 버튼
const btnLogout = document.querySelector("#logout");
btnLogout.addEventListener("click", requestLogout);

async function requestLogout(e) {
  e.preventDefault();
  const res = await fetch(`${API_URL}/api/logout`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();
  window.alert(result.message);
  window.location.href = "login.html";
}