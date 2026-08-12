document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');
  const logoutMessage = document.getElementById('logoutMessage');

  function performLogout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('user');
    logoutMessage.textContent = 'Logout successful. Redirecting to login...';

    setTimeout(() => {
      window.location.href = 'login-register.html';
    }, 1000);
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', performLogout);
  }

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    logoutMessage.textContent = 'No active session found. Redirecting to login...';
    setTimeout(() => {
      window.location.href = 'login-register.html';
    }, 1000);
  } else {
    performLogout();
  }
});
