//main contact page
const createContactBtn = document.querySelector("#createContactBtn");
const contactList = document.querySelector(".contact-list");
const url = "https://6878e85e63f24f1fdc9ff7c5.mockapi.io/Contacts";
let data;
const displayContact = () => {
  for (i = 0; i < data.length; i++) {
    const parentDiv = document.createElement("div");
    const viewBtn = document.createElement("button");
    const updateBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    viewBtn.innerText = "View";
    viewBtn.setAttribute("class", "view");
    viewBtn.setAttribute("id", i);

    updateBtn.innerText = "Update";
    updateBtn.setAttribute("class", "update");
    updateBtn.setAttribute("id", i);

    deleteBtn.innerText = "Delete";
    deleteBtn.setAttribute("class", "delete");
    deleteBtn.setAttribute("id", i);

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
    data = await response.json();
    displayContact();
  } catch (e) {
    console.log("error");
    console.log(e);
  }
};

document.addEventListener("click", async (e) => {
  e.preventDefault();
  const btn = e.target;

  if (btn.getAttribute("class") == "view") {
    const id = Number(btn.getAttribute("id"));
    localStorage.setItem("id", id);
    localStorage.setItem("button", "view");
    window.open("updateContact.html", "_self");
  } else if (btn.getAttribute("class") == "delete") {
    const value = confirm("Are you sure you want to delete this contact?");
    if (value) {
      console.log(data);
      let idx = Number(btn.getAttribute("id"));
      let id = Number(data[idx].id);
      const response = await fetch(url + "/" + id, {
        method: "DELETE",
      });
      btn.parentElement.remove();
    }
  } else if (btn.getAttribute("class") == "update") {
    const id = btn.getAttribute("id");
    localStorage.setItem("id", id);
    localStorage.setItem("button", "update");
    window.open("updateContact.html", "_self");
  }
});

createContactBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.open("Createcontact.html", "_self", true);
});
getContact();
