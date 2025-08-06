const nameBtn = document.querySelector("#name");
const contactBtn = document.querySelector("#number");
const updateBtn = document.querySelector("#update");
const backBtn = document.querySelector("#back");
const tagsBtn = document.querySelector("#tags");
const url = "http://localhost:3000/contacts";
const token = localStorage.getItem("token");
let id;
if (localStorage.getItem("button") != "view") {
  nameBtn.setAttribute("contenteditable", "true");
  contactBtn.setAttribute("contenteditable", "true");
  tagsBtn.setAttribute("contenteditable", "true");
} else {
  updateBtn.style.display = "none";
}
const getData = async () => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonData = await response.json();
  const requiredData = jsonData.data;
  id = localStorage.getItem("id");
  nameBtn.innerText = requiredData[id].name;
  contactBtn.innerText = requiredData[id].phoneNumber;
  tagsBtn.innerText = requiredData[id].tags;
  id = requiredData[id].id;
};

const updateData = async () => {
  try {
    const response = await fetch(url + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameBtn.innerText,
        phoneNumber: contactBtn.innerText,
        tags: tagsBtn.innerText.split(","),
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

backBtn.addEventListener("click", () => {
  window.open("DisplayContact.html", "_self");
});
