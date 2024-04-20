"use strict";

const submitBtn = document.getElementById("submit-btn");
const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");
//bắt sự kiện vào nút submit
submitBtn.addEventListener("click", function () {
  // Lấy dữ liệu từ form đã nhập
  const data = {
    breed: inputBreed.value,
    type: inputType.value,
  };

  const validate = validateData(data);
  // kiểm tra xem người dùng đã nhập dữ liệu chưa
  if (validate) {
    //đẩy data vào trong breedArr
    breedArr.push(data);
    //Lưu lại dữ liệu
    saveToStorage("breedArr", breedArr);
    //Hiển thị dữ liệu
    renderBreedTable();
    //Xóa dữ liệu vừa nhập
    clearInput();
  }
});
//Hàm kiểm tra dữ liệu
function validateData(data) {
  let isValidate = true;
  if (data.breed.trim() === "") {
    alert("Hãy nhập tên Breed");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("Hãy chọn Type");
    isValidate = false;
  }
  const findBreed = breedArr.find((bre) => bre.breed === data.breed);
  if (findBreed) {
    alert("Breed này đã có");
    isValidate = false;
  }
  return isValidate;
}
//Hàm hiển thị danh sách breed
function renderBreedTable() {
  tableBodyEl.innerHTML = ``;
  breedArr.forEach((bre, i) => {
    const row = document.createElement("tr");
    row.innerHTML = ` <tr>
    <td scope="col">${i + 1}</td>
	<td scope="col">${bre.breed}</td>
	<td scope="col">${bre.type}</td>
	<td>
    <button type="button" class="btn btn-danger" onclick="deleteBreed('${
      bre.breed
    }')">Delete</td> 
    </tr>`;
    tableBodyEl.appendChild(row);
  });
}
renderBreedTable();

//Hàm xóa dữ liệu vừa nhập
function clearInput() {
  inputBreed.value = "";
  inputType.value = "Select Type";
}

function deleteBreed(breed) {
  if (confirm("Bạn muốn xóa breed?")) {
    //Xóa theo vị trí index
    //Tìm vị trí index
    const index = breedArr.findIndex((bre) => bre.breed === breed);
    //Xóa pet
    breedArr.splice(index, 1);
    //Lưu lại
    saveToStorage("breedArr", breedArr);
    //Hiển thị lại bảng
    renderBreedTable(breedArr);
  }
}
