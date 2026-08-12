// Sends visitors to the login/registration page until they are logged in.
(function () {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.replace("login-register.html");
  }
})();