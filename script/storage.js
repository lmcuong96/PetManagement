"use strict";
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
// Hàm lưu dữ liệu vào bộ nhớ
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//Hàm lấy dữ liệu từ bộ nhớ
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Tạo biến petArr để lưu vào bộ nhớ
const petArr = getFromStorage("petArr");

//Tạo biến breedArr để lưu vào bộ nhớ
const breedArr = getFromStorage("breedArr");

// Tạo dữ liệu để test
//PetArr
const data1 = {
  id: "P001",
  name: "Tom",
  age: 2,
  type: "Dog",
  weight: 12,
  size: 50,
  breed: "Corgi",
  color: "Red",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(2022, 2, 1),
};
const data2 = {
  id: "P002",
  name: "Meo",
  age: 2,
  type: "Cat",
  weight: 12,
  color: "Black",
  size: 50,
  breed: "Mun",
  vaccinated: true,
  dewormed: false,
  sterilized: false,
  date: new Date(2022, 3, 5),
};
//breedArr
const breed1 = {
  breed: "Corgi",
  type: "Dog",
};
const breed2 = {
  breed: "Mun",
  type: "Cat",
};

// đẩy dữ liệu test vào trong arr
//Nếu data không nằm trong petArr thì lưu chúng vào petArr
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [data1, data2]);
}
//Nếu data không nằm trong petArr thì lưu chúng vào petArr
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [breed1, breed2]);
}
