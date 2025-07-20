//main contact page
const createContactBtn = document.querySelector("#createContactBtn");
const contactList = document.querySelector(".contact-list");
const url = "https://6878e85e63f24f1fdc9ff7c5.mockapi.io/Contacts";

const displayContact = (data) => {
  for (i = 0; i < data.length; i++) {
    const parentDiv = document.createElement("div");
    const viewBtn = document.createElement("button");
    const updateBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    viewBtn.innerText = "View";
    viewBtn.setAttribute("id", "view");
    updateBtn.innerText = "Update";
    updateBtn.setAttribute("id", "update");
    deleteBtn.innerText = "Delete";
    deleteBtn.setAttribute("id", "delete");
    parentDiv.innerText = data[i].name;
    parentDiv.appendChild(viewBtn);
    parentDiv.appendChild(updateBtn);
    parentDiv.appendChild(deleteBtn);
    contactList.appendChild(parentDiv);
  }
};

const getContact = async () => {
  console.log("Enter");
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayContact(data);
  } catch (e) {
    console.log("error");
    console.log(e);
  }
};

document.addEventListener("click", (e) => {
  if (e.target.getAttribute == "view") {
  } else if (e.target.getAttribute == "update") {
  } else if (e.target.getAttribute == "delete") {
  }
});

createContactBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.open("contact-form.html", "_self", true);
});
getContact();
