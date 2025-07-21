//contact-form
const newContactBtn = document.querySelector("#newContact");
const name = document.querySelector("#name");
const email = document.querySelector("#inputEmail");
const number = document.querySelector("#inputContact");
const crossBtn = document.querySelector("#crossBtn");
const url = "https://6878e85e63f24f1fdc9ff7c5.mockapi.io/Contacts";
const checkContactDetails = () => {
  if (name.value != "" && email.value != "" && number.value != "") {
    console.log(typeof Number(number.value));
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
        email: email.value,
        contact: Number(number.value),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    newContactBtn.textContent = "Contact created !";
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
