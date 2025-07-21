const nameBtn = document.querySelector("#name");
const emailBtn = document.querySelector("#email");
const contactBtn = document.querySelector("#number");
const updateBtn = document.querySelector("#update");
const url = "https://6878e85e63f24f1fdc9ff7c5.mockapi.io/Contacts";
let id;

const getData = async () => {
  const response = await fetch(url);
  const data = await response.json();

  id = localStorage.getItem("id");
  nameBtn.innerText = data[id].name;
  emailBtn.innerText = data[id].email;
  contactBtn.innerText = data[id].contact;
  id++;
};

const updateData = async () => {
  try {
    const response = await fetch(url + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameBtn.innerText,
        email: emailBtn.innerText,
        contact: contactBtn.innerText,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.log("Error: ", e);
  }
};

getData();
updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  updateData();
});
