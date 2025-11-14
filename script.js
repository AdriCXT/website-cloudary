/**
 * CLOUDARY Portal – Secure Access
 * Version: 1.2.0
 * Author: webmaster@cloudary.de
 */

const CONFIG = {
  PASSWORD: "Uyeg0422!", // 🔐 Passwort anpassen
  STORAGE_KEY: "cloudary-auth",
  LOGIN_DELAY: 450
};

const els = {
  loginSection: document.getElementById("login-section"),
  mainContent: document.getElementById("main-content"),
  form: document.getElementById("login-form"),
  password: document.getElementById("password"),
  message: document.getElementById("login-message"),
  logout: document.getElementById("logout-btn"),
  year: document.getElementById("year")
};

// Jahr anzeigen
if (els.year) els.year.textContent = new Date().getFullYear();

// Session prüfen
if (localStorage.getItem(CONFIG.STORAGE_KEY) === "true") {
  showMain();
} else {
  showLogin();
}

function showLogin() {
  els.loginSection.classList.remove("hidden");
  els.mainContent.classList.add("hidden");
}

function showMain() {
  els.loginSection.classList.add("hidden");
  els.mainContent.classList.remove("hidden");
}

els.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = els.password.value.trim();
  els.message.className = "message";
  if (!input) {
    showMessage("Bitte Passwort eingeben.", "error");
    return;
  }

  showMessage("Überprüfe Zugangsdaten ...", "info");
  els.password.disabled = true;

  setTimeout(() => {
    if (input === CONFIG.PASSWORD) {
      showMessage("Erfolgreich angemeldet.", "success");
      localStorage.setItem(CONFIG.STORAGE_KEY, "true");
      setTimeout(showMain, 700);
    } else {
      showMessage("Falsches Passwort. bei Problemen siehe Mail unten", "error");
      els.password.value = "";
    }
    els.password.disabled = false;
  }, CONFIG.LOGIN_DELAY);
});

els.logout.addEventListener("click", () => {
  localStorage.removeItem(CONFIG.STORAGE_KEY);
  showLogin();
});

function showMessage(text, type) {
  els.message.textContent = text;
  els.message.className = `message ${type}`;
  els.message.classList.remove("hidden");
}

console.info("%c✅ CLOUDARY Portal loaded.", "color:#22c55e;font-weight:bold;");
