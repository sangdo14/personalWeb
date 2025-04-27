const table = document.querySelector('table');

let tag = `
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>4</td>
  <td>5</td>
  <td>6</td>
  <td style="letter-spacing: 10px;"><i class="fa-solid fa-pen"></i>
  <i class="fa-solid fa-trash"></i></td>
`;

// tr을 두 번 새로 만들어서 각각 추가
for (let i = 0; i < 6; i++) {
  const tr = document.createElement('tr');
  tr.innerHTML = tag;
  table.append(tr);
}