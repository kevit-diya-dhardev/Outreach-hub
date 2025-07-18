const url = "https://6878e85e63f24f1fdc9ff7c5.mockapi.io/login";
const submitBtn = document.querySelector("#inputLogin");
const emailBtn = document.querySelector("#inputEmail");
const passBtn = document.querySelector("#inputPassword");

const checkData = () => {
  if (emailBtn.value != "" && passBtn.value != "") {
    return true;
  }
  return false;
};

const verify = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data[0]);

    const email = emailBtn.value;
    const pass = passBtn.value;

    if (
      data.find((obj) => obj.email == email) &&
      data.find((obj) => obj.password == pass)
    ) {
      window.open("home.html", "_self");
    } else {
      console.log("Invalid inputs");
    }
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
