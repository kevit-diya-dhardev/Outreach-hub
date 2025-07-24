const url = "http://localhost:3000/auth/login";
const submitBtn = document.querySelector("#inputLogin");
const usernameBtn = document.querySelector("#inputUsername");
const passBtn = document.querySelector("#inputPassword");

const checkData = () => {
  if (usernameBtn.value != "editor" && passBtn.value != "editor") {
    return false;
  }
  return true;
};

const verify = async () => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: usernameBtn.value,
        password: passBtn.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    localStorage.setItem("token", data.access_token);
    window.open("home.html", "_self");
  } catch (e) {
    console.log("Error occured");
    console.log(e);
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkData()) {
    verify();
  } else {
    console.log("Make correct inputs!!");
  }
});
