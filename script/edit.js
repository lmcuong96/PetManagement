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
const container = document.getElementById("container-form");

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
      <button type="button" class="btn btn-warning" onclick="editPet('${
        pet.id
      }')">Edit</td> 
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

// Hàm sửa pet
function editPet(petID) {
  //Hiện form để sửa
  container.classList.remove("hide");
  // Hiện nội dung cần sửa
  const findPet = petArr.find((pet) => pet.id === petID);
  inputID.value = findPet.id;
  inputName.value = findPet.name;
  inputAge.value = findPet.age;
  inputColor.value = findPet.color;
  inputType.value = findPet.type;
  inputWeight.value = findPet.weight;
  inputLength.value = findPet.size;
  inputVaccinated.checked = findPet.vaccinated;
  inputDewormed.checked = findPet.dewormed;
  inputSterilized.checked = findPet.sterilized;
  //gọi hàm renderBreed để hiển thị type
  renderBreed();
  inputBreed.value = `${findPet.breed}`;
}

// Hiển thị breed
//chọn vào nút type và gọi callback function renderBreed
inputType.addEventListener("click", renderBreed);

//Tạo hàm renderBreed để hiển thị breed theo type
function renderBreed() {
  inputBreed.innerHTML = `<option>Select Breed</option>`;

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
  //Nếu là cat thì chỉ hiển thị cat
  if (inputType.value === "Cat") {
    //Lọc qua breedArr để chỉ hiển thị cat
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

//Bắt sự kiện nút submit để lưu các giá trị vừa thay đổi
submitBtn.addEventListener("click", function (e) {
  //lấy data từ form
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

  //kiểm tra xem các dữ liệu thay đổi có phù hợp không
  const validate = validateData(data);
  //Nếu phù hợp thì thực hiện :
  if (validate) {
    //Tìm vị trí index của pet đang được edit theo id
    const index = petArr.findIndex((pet) => pet.id === data.id);
    //Lưu ý thời gian không thay đổi khi edit Pet
    data.date = petArr[index].date;
    // gán dữ liệu mới vào lại petArr thay dữ liệu cũ theo vị trí index
    petArr[index] = data;
    //Lưu lại dữ liệu mới
    saveToStorage("petArr", petArr);
    //Hiển thị lại dữ liệu
    renderPetTable(petArr);
    //Ẩn form
    container.classList.add("hide");
  }
});
//Hàm kiểm tra dữ liệu
function validateData(data) {
  let isValidate = true;
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
