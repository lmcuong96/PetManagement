"use strict";
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");
const inputID = document.getElementById("input-id");
const inputName = document.getElementById("input-name");
const inputAge = document.getElementById("input-age");
const inputWeight = document.getElementById("input-weight");
const inputLength = document.getElementById("input-length");
const inputColor = document.getElementById("input-color-1");
const inputVaccinated = document.getElementById("input-vaccinated");
const inputDewormed = document.getElementById("input-dewormed");
const inputSterilized = document.getElementById("input-sterilized");

//Bắt sự kiện vào submitBtn
submitBtn.addEventListener("click", function () {
  //Lấy dữ liệu từ form
  const data = {
    id: inputID.value,
    name: inputName.value,
    age: parseInt(inputAge.value),
    type: inputType.value,
    weight: parseInt(inputWeight.value),
    size: parseInt(inputLength.value),
    color: inputColor.value,
    breed: inputBreed.value,
    vaccinated: inputVaccinated.checked,
    dewormed: inputDewormed.checked,
    sterilized: inputSterilized.checked,
    date: new Date(),
  };
  //kiểm tra dữ liệu nhập
  const validate = validateData(data);
  if (validate) {
    //đẩy dữ liệu vào trong petArr
    petArr.push(data);
    //lưu lại dữ liệu
    saveToStorage("petArr", petArr);
    //hiển thị dữ liệu
    renderPetTable(petArr);
    //Xóa dữ liệu đã nhập
    clearInput();
  }
});

//Hàm kiểm tra dữ liệu
function validateData(data) {
  let isValidate = true;

  const findPet = petArr.find((pet) => pet.id === data.id);
  if (findPet) {
    alert("ID này đã tồn tại");
    isValidate = false;
  }
  switch (isValidate) {
    case data.id.trim() === "":
      alert("Hãy nhập id");
      isValidate = false;
      break;
    case data.name.trim() === "":
      alert("Hãy nhập tên");
      isValidate = false;
      break;
    case isNaN(data.age):
      alert("Hãy nhập age");
      isValidate = false;
      break;
    case data.age <= 0 || data.age > 15:
      alert("Age phải từ 1 đến 15");
      isValidate = false;
      break;
    case data.type === "Select Type":
      alert("Hãy chọn type");
      isValidate = false;
      break;
    case isNaN(data.weight):
      alert("Hãy nhập weight");
      isValidate = false;
      break;
    case data.weight <= 0 || data.weight > 15:
      alert("Weight phải từ 1 đến 15");
      isValidate = false;
      break;
    case isNaN(data.size):
      alert("Hãy nhập length");
      isValidate = false;
      break;
    case data.size <= 0 || data.size > 100:
      alert("Length phải từ 1 đến 100");
      isValidate = false;
      break;
    case data.breed === "Select Breed":
      alert("Hãy chọn breed");
      isValidate = false;
      break;
  }
  return isValidate;
}

// Hàm hiển thị thú cưng
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
	<td>
    <button type="button" class="btn btn-danger" onclick="deletePet('${
      pet.id
    }')">Delete</td> 
    </tr>`;
    tableBodyEl.appendChild(row);
  });
}
renderPetTable(petArr);

//Hàm hiển thị thời gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}

//Hiển thị lựa chọn Breed
//Bắt sự kiện vào type để gọi renderBreed
inputType.addEventListener("click", function () {
  renderBreed();
});

//Hàm renderBreed - hiển thị lựa chọn Breed
function renderBreed() {
  inputBreed.innerHTML = "<option>Select Breed</option>";

  //Nếu là dog thì chỉ hiển thị dog
  if (inputType.value === "Dog") {
    //Lọc qua breedArr để chỉ hiển thị dog
    breedArr
      .filter((bre) => bre.type === "Dog")
      .forEach(function (bre) {
        //tạo thẻ option chứa các breed của type dog
        const option = document.createElement("option");
        option.innerHTML = ` ${bre.breed}`;
        inputBreed.appendChild(option);
      });
  }
  //Nếu là dog thì chỉ hiển thị dog
  if (inputType.value === "Cat") {
    //Lọc qua breedArr để chỉ hiển thị dog
    breedArr
      .filter((bre) => bre.type === "Cat")
      .forEach(function (bre) {
        //tạo thẻ option chứa các breed của type dog
        const option = document.createElement("option");
        option.innerHTML = ` ${bre.breed}`;
        inputBreed.appendChild(option);
      });
  }
}

//Hàm xóa thú cưng
function deletePet(pet) {
  if (confirm("Bạn thực sự muốn xóa thú cưng này?")) {
    const index = petArr.findIndex((pet) => pet.id === pet);
    petArr.splice(index, 1);
    saveToStorage("petArr", petArr);
    renderPetTable(petArr);
  }
}

//Hiển thị thú cưng khỏe mạnh
let healthyCheck = true;
//Bắt sự kiện vào healthyBtn
healthyBtn.addEventListener("click", function () {
  if (healthyCheck) {
    //Lọc ra tất cả các thú cưng khỏe mạnh  và chuyển vào healthyPetArr
    const healthyPetArr = petArr.filter(
      (pet) =>
        pet.vaccinated === true &&
        pet.dewormed === true &&
        pet.sterilized === true
    );
    //Hiển thị thú cưng khỏe mạnh
    renderPetTable(healthyPetArr);
    // Chuyển lại về Show All Pet
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    //Hiển thị lại Show Healthy Pet
    renderPetTable(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

//Xóa form đã nhập
function clearInput() {
  inputID.value = "";
  inputName.value = "";
  inputAge.value = "";
  inputType.value = "Select Type";
  inputWeight.value = "";
  inputLength.value = "";
  inputBreed.value = "Select Breed";
  inputColor.value = "#000000";
  inputVaccinated.value = false;
  inputDewormed.value = false;
  inputSterilized.value = false;
}
