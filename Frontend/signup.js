const url = "https://6878e85e63f24f1fdc9ff7c5.mockapi.io/login";
const submitBtn = document.querySelector("#submit");
const nameBtn = document.querySelector("#username");
const emailBtn = document.querySelector("#inputEmail");
const passwordBtn = document.querySelector("#inputPassword");

const check = () => {
  if (nameBtn.value != "" && emailBtn.value != "" && passwordBtn.value != "") {
    return true;
  } else {
    return false;
  }
};

async function checkRepeat() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const exists = data.find((obj) => obj.email == emailBtn.value);
  if (!exists) {
    console.log("Succcheckess");
    return true;
  }
  return false;
}

const putData = async () => {
  try {
    const data = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: nameBtn.value,
        email: emailBtn.value,
        password: passwordBtn.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Success");
    console.log(data);
  } catch (e) {
    console.log("Error");
    console.log(e);
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (check()) {
    checkRepeat().then((value) => {
      if (value) {
        putData();
      } else {
        console.log("Duplicate data");
      }
    });
  } else {
    console.log("Invalid inputs");
  }
});
