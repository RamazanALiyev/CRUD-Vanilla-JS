let dataList;
let editRow;
const table = document.querySelector("table");
const spinner = document.querySelector("#spinner");
const autoGroups = document.querySelector("#autoGroups");
const motoGroups = document.querySelector("#motoGroups");
const inputName = document.querySelector("#car-name");
const inputModel = document.querySelector("#car-model");
const inputDesc = document.querySelector("#car-text");
const inputNameNew = document.querySelector("#car-nameNew");
const inputModelNew = document.querySelector("#car-modelNew");
const inputDescNew = document.querySelector("#car-textNew");
const newAddBtn = document.querySelector("#newAddBtn");
const editAddBtn = document.querySelector("#editAddBtn");
const tbody = document.querySelector("tbody");
const initialVal = { name: "", model: "", description: "" };
autoGroups.addEventListener("click", function () {
  window.location.href = "index.html";
});
motoGroups.addEventListener("click", function () {
  window.location.href = "motor.html";
});
window.addEventListener("load", getData);
function getData() {
  fetch("https://63d35c46c1ba499e54bff4ef.mockapi.io/ProjectCars")
    .then((response) => response.json())
    .then((datas) => {
      spinner.style.display = "none";
      table.style.display = "table";
      dataList = datas;
      let list = datas
        .reverse()
        .map(
          (data, i) =>
            `
        <tr>
             <td scope="row">${i + 1}</td>
             <td>${data.name}</td>
             <td>${data.model}</td>
             <td>${data.description}</td>
             <td onClick=editItem(${
               data.id
             }) class='carEdit' data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-pen-to-square"></i></td>
             <td onClick=deleteItem(${
               data.id
             })><i class="fa-solid fa-delete-left"></i></td>
             <td ${data.status ? "class=active" : "class=deactive"}>${
              data.status ? "Aktiv" : "Deaktiv"
            }</td>
             <td ${
               data.status ? "class=activeDo" : "class=deactiveDo"
             } onClick=changeStatus(${data.id})>${
              data.status ? "Deacktiv et" : "Aktiv et"
            }</td>
        </tr>
        `
        )
        .join(" ");
      tbody.innerHTML = list;
    });
}
function changeStatus(id) {
  statusData = dataList.filter((editList) => editList.id == id);
  if (statusData[0].status) {
    statusData[0].status = false;
  } else {
    statusData[0].status = true;
  }
  console.log(statusData[0]);
  fetch(`https://63d35c46c1ba499e54bff4ef.mockapi.io/ProjectCars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(statusData[0]),
  })
    .then((response) => response.json())
    .then(() => {
      window.location.reload();
    });
}
function editItem(id) {
  editRow = dataList.filter((editList) => editList.id == id);
  inputNameNew.value = editRow[0].name;
  inputModelNew.value = editRow[0].model;
  inputDescNew.value = editRow[0].description;
  editAddBtn.addEventListener("click", function () {
    console.log(id);
    console.log(editRow[0]);
    if (
      inputNameNew.value.length !== 0 &&
      inputModelNew.value.length !== 0 &&
      inputDescNew.value.length !== 0
    ) {
      fetch(`https://63d35c46c1ba499e54bff4ef.mockapi.io/ProjectCars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editRow[0]),
      })
        .then((response) => response.json())
        .then(() => {
          window.location.reload();
        });
    }
  });
}
function deleteItem(id) {
  fetch(`https://63d35c46c1ba499e54bff4ef.mockapi.io/ProjectCars/${id}`, {
    method: "DELETE",
  }).then(() => {
    window.location.reload();
  });
}
inputName.addEventListener("keyup", function (e) {
  initialVal.name = e.target.value;
  initialVal.model = initialVal.model;
  initialVal.description = initialVal.description;
});
inputModel.addEventListener("keyup", function (e) {
  initialVal.name = initialVal.name;
  initialVal.model = e.target.value;
  initialVal.description = initialVal.description;
});
inputDesc.addEventListener("keyup", function (e) {
  initialVal.name = initialVal.name;
  initialVal.model = initialVal.model;
  initialVal.description = e.target.value;
});
//----------------------------------------------
inputNameNew.addEventListener("keyup", function (e) {
  editRow[0].name = e.target.value;
  editRow[0].model = editRow[0].model;
  editRow[0].description = editRow[0].description;
  console.log(editRow);
});
inputModelNew.addEventListener("keyup", function (e) {
  editRow[0].name = editRow[0].name;
  editRow[0].model = e.target.value;
  editRow[0].description = editRow[0].description;
  console.log(editRow);
});
inputDescNew.addEventListener("keyup", function (e) {
  editRow[0].name = editRow[0].name;
  editRow[0].model = editRow[0].model;
  editRow[0].description = e.target.value;
  console.log(editRow);
});
newAddBtn.addEventListener("click", function () {
  if (
    inputName.value.length !== 0 &&
    inputModel.value.length !== 0 &&
    inputDesc.value.length !== 0
  ) {
    fetch("https://63d35c46c1ba499e54bff4ef.mockapi.io/ProjectCars", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initialVal),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
