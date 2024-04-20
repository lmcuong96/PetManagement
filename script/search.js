"use strict";
const findBtn = document.getElementById("find-btn");
const inputID = document.getElementById("input-id");
const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");
const inputName = document.getElementById("input-name");
const inputVaccinated = document.getElementById("input-vaccinated");
const inputDewormed = document.getElementById("input-dewormed");
const inputSterilized = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");

//Hiển thị danh sách thú cưng
function renderPetTable(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = ` <tr>
      <th scope="col">${pet.id}</th>
      <td scope="col">${pet.name}</td>
      <td scope="col">${pet.age}</td>
      <td scope="col">${pet.type}</td>
      <td scope="col">${pet.weight}</td>
      <td scope="col">${pet.size}</td>
      <td scope="col">${pet.breed}</td>
      <td>
      <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
  </td>
  <td><i class="${
    pet.vaccinated ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
  }   "></i></td>
    <td><i class="${
      pet.dewormed ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
    }   "></i></td>
    <td><i class="${
      pet.sterilized ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
    }   "></i></td>
      <td scope="col">${displayTime(pet.date).slice(8, 10)}
      /${displayTime(pet.date).slice(5, 7)}
      /${displayTime(pet.date).slice(0, 4)}
      </td>
     
      </tr>`;
    tableBodyEl.appendChild(row);
  });
}
renderPetTable(petArr);
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}

//Bắt sự kiện vào nút find
findBtn.addEventListener("click", function () {
  let findPet = petArr;
  // Tìm thú cưng theo vị trí tương đối
  // Tìm theo id
  if (inputID.value) {
    //trong arr tìm tất cả các kết quả chứa chuỗi vừa nhập
    findPet = findPet.filter((pet) => pet.id.includes(inputID.value));
  }
  //Tìm theo tên
  if (inputName.value) {
    //trong arr tìm tất cả các kết quả chứa chuỗi vừa nhập
    findPet = findPet.filter((pet) => pet.name.includes(inputName.value));
  }
  //Tìm theo type
  //Nếu inputType không phải là Select Type thì tìm kiếm tất cả các kết quả chứa lựa chọn đã chọn
  if (inputType.value !== "Select Type") {
    findPet = findPet.filter((pet) => pet.type === inputType.value);
  }
  //Tìm theo Breed
  //Nếu inputBreed không phải là Select Breed thì tìm kiếm tất cả các kết quả chứa lựa chọn đã chọn
  if (inputBreed.value !== "Select Breed") {
    findPet = findPet.filter((pet) => pet.breed === inputBreed.value);
  }
  //Tìm theo các chỉ số tiêm phòng
  if (inputVaccinated.checked === true) {
    findPet = findPet.filter((pet) => pet.vaccinated === true);
  }
  if (inputDewormed.checked === true) {
    findPet = findPet.filter((pet) => pet.dewormed === true);
  }
  if (inputSterilized.checked === true) {
    findPet = findPet.filter((pet) => pet.sterilized === true);
  }
  renderPetTable(findPet);
});

//Các breed được hiển thị hết không cần theo type
function renderBreed() {
  breedArr.forEach((bre) => {
    const option = document.createElement("option");
    option.innerHTML = `${bre.breed}`;
    inputBreed.appendChild(option);
  });
}
renderBreed();
