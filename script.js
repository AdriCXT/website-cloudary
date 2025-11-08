// <<< WICHTIG: HIER DEIN PASSWORT EINTRAGEN >>>
const PORTAL_PASSWORD = "ÄndereMich123!"; // <-- ändern!

const loginScreen = document.getElementById("login-screen");
const mainContent = document.getElementById("main-content");
const loginForm = document.getElementById("login-form");
const passwordInput = document.getElementById("password-input");
const loginMessage = document.getElementById("login-message");
const logoutBtn = document.getElementById("logout-btn");
const yearSpan = document.getElementById("year");

// aktuelles Jahr im Footer
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Prüfen, ob schon eingeloggt (LocalStorage)
const isAuthenticated = localStorage.getItem("cloudary-auth") === "true";

if (isAuthenticated) {
  showMainContent();
} else {
  showLogin();
}

function showLogin() {
  loginScreen.classList.remove("hidden");
  mainContent.classList.add("hidden");
}

function showMainContent() {
  loginScreen.classList.add("hidden");
  mainContent.classList.remove("hidden");
}

// Login-Formular
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const value = passwordInput.value.trim();

    if (value === PORTAL_PASSWORD) {
      loginMessage.classList.add("hidden");
      localStorage.setItem("cloudary-auth", "true");
      passwordInput.value = "";
      showMainContent();
    } else {
      loginMessage.textContent = "Falsches Passwort.";
      loginMessage.classList.remove("hidden");
      loginForm.classList.remove("shake");
      // reflow, damit Animation neu startet
      void loginForm.offsetWidth;
      loginForm.classList.add("shake");
    }
  });
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("cloudary-auth");
    showLogin();
  });
}
