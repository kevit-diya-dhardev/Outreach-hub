//contact-form
const newContactBtn = document.querySelector("#newContact");
const name = document.querySelector("#name");
const number = document.querySelector("#inputContact");
const tags = document.querySelector("#tags");
const crossBtn = document.querySelector("#crossBtn");
const url = "http://localhost:3000/contacts";
const token = localStorage.getItem("token");
const checkContactDetails = () => {
  if (name.value != "" && number.value != "") {
    return true;
  }
  return false;
};

const newContact = async () => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        phoneNumber: Number(number.value),
        tags: tags.value.split(","),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    console.log("Success!");
  } catch (e) {
    console.log("Error");
    console.log(e);
  }
};

newContactBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkContactDetails()) {
    newContact();
  } else {
    console.log("Make correct inputs");
  }
});

crossBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.open("DisplayContact.html", "_self");
});
