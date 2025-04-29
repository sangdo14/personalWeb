import { checkLogin } from './auth.js';
checkLogin();

UserList();

async function UserList(pageNum = 0) {
  // API로 데이터 불러오기
  const res = await fetch(`http://localhost:8080/api/admin?page=${pageNum}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();

  if (data.error) {
    alert(data.error);
    location.href = "login.html";
  }

  // 데이터 html에 붙여넣기
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = ""; // 페이지를 위해 초기화

  const userArr = data.users;
  
  userArr.forEach((user) => {
    const tr = document.createElement('tr');
    
    const date = formatDate(user.created_dt)
    const tag = `
      <td>${user.userid}</td>
      <td>${user.password}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.intro}</td>
      <td>${date}</td>
      <td style="letter-spacing: 10px;">
        <a href="edit.html?userid=${user.userid}">
          <i class="fa-solid fa-pen"></i>
        </a>
        <i class="fa-solid fa-trash btnDel" data-userid}=${user.userid}></i>
      </td>
    `;

    tr.innerHTML = tag;
    tbody.append(tr);
  });

  // 수정은 a태그 이용해 수정 전용 페이지로 이동
  //edit_form.html?id=회원아이디 식으로 링크 설정

  // 삭제 버튼
  const btnDel = document.querySelectorAll(".btnDel");
  bindingDelEvent(btnDel);

  // 페이징 처리
  setPageBtn(data);
}


// 동적 생성된 삭제 버튼
function bindingDelEvent(btns) {
  btns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const isConfirmed = confirm("정말 삭제하시겠습니까?");
      if (!isConfirmed) {
        return; // 취소 누르면 함수 종료
      }

      const userid = e.currentTarget.getAttribute("data-userid}");
      const data = await fetch(
        `http://127.0.0.1:8080/api/admin/del/${userid}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const result = await data.json();
      alert(result.message);

      location.reload();
    });
  });
}


// 페이지 버튼
function setPageBtn(data) {
  const pagination = document.querySelector("#pagination");
  pagination.innerHTML = ""; // 이전 버튼들 초기화

  const { currentPage, totalPages } = data;

  // 이전 버튼
  if (currentPage > 0) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "이전";
    prevBtn.addEventListener("click", () => UserList(currentPage - 1));
    pagination.appendChild(prevBtn);
  }

  // 페이지 번호 버튼
  for (let i = 0; i < totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i + 1;
    if (i === currentPage) pageBtn.disabled = true; // 현재 페이지 비활성화
    pageBtn.addEventListener("click", () => UserList(i));
    pagination.appendChild(pageBtn);
  }

  // 다음 버튼
  if (currentPage < totalPages - 1) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "다음";
    nextBtn.addEventListener("click", () => UserList(currentPage + 1));
    pagination.appendChild(nextBtn);
  }
}


// 날짜 표시 변환
function formatDate(str) {
  const date = new Date(str);
  const year = String(date.getFullYear()).slice(2); // '25'
  const month = String(date.getMonth() + 1).padStart(2, '0'); // '04'
  const day = String(date.getDate()).padStart(2, '0'); // '28'
  const hour = String(date.getHours()).padStart(2, '0'); // '14'
  const minute = String(date.getMinutes()).padStart(2, '0'); // '11'
  return `${year}-${month}-${day} ${hour}:${minute}`;
}