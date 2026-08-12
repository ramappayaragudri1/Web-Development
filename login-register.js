function toggleForm() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const title = document.getElementById("form-title");

  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    title.textContent = "Login";
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    title.textContent = "Register";
  }
}

function setLoginState(loggedIn) {
  localStorage.setItem("isLoggedIn", loggedIn ? "true" : "false");
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const card = document.querySelector(".card");

  if (card) {
    card.classList.add("show");
  }

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!name || !email || !password) {
      alert("Please fill in all registration fields.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Registration successful! Please login.");
    toggleForm();
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setLoginState(true);
      document.querySelector(".card").innerHTML = "<p class='text-center'>Logging in...</p>";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      alert("Invalid email or password.");
    }
  });
});
