const id = Number(localStorage.getItem("id"));
const url = "https://6878e85e63f24f1fdc9ff7c5.mockapi.io/Contacts";

const getData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  document.querySelector("#name").innerText = "name: " + data[id].name;
  document.querySelector("#email").innerText = "email: " + data[id].email;
  document.querySelector("#Mob").innerText = "Mob: " + data[id].contact;
  localStorage.clear();
};
getData();
