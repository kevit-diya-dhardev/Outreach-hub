if (localStorage.getItem("token") == null) {
  console.log("token is absent!");
  window.open("login.html", "_self");
}
const url = "http://localhost:3000/auth/logout";
const logoutBtn = document.querySelector("#logout");
const token = localStorage.getItem("token");
logoutBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
    localStorage.removeItem("token");
    window.open("login.html", "_self");
  } catch (e) {
    console.log("error");
    console.log(e);
  }
});
