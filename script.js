/**
 * CLOUDARY Portal – Secure Access with User Management
 * Version: 1.3.0
 * Author: webmaster@cloudary.de
 */

const CONFIG = {
  ADMIN_PASSWORD: "Uyeg0422!", // 🔐 Admin-Passwort
  STORAGE_KEY_AUTH: "cloudary-auth",
  STORAGE_KEY_USERS: "cloudary-users",
  STORAGE_KEY_CURRENT_USER: "cloudary-current-user",
  LOGIN_DELAY: 450
};

const els = {
  loginSection: document.getElementById("login-section"),
  mainContent: document.getElementById("main-content"),
  adminContent: document.getElementById("admin-content"),
  form: document.getElementById("login-form"),
  password: document.getElementById("password"),
  message: document.getElementById("login-message"),
  logout: document.getElementById("logout-btn"),
  year: document.getElementById("year"),
  greeting: document.getElementById("greeting"),
  userForm: document.getElementById("user-form"),
  userName: document.getElementById("user-name"),
  userPassword: document.getElementById("user-password"),
  userList: document.getElementById("user-list"),
  tiles: document.querySelectorAll(".tile")
};

// Jahr anzeigen
if (els.year) els.year.textContent = new Date().getFullYear();

// Benutzer laden oder initialisieren
let users = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_USERS)) || [];

// Session prüfen
const currentUser = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_CURRENT_USER));
if (localStorage.getItem(CONFIG.STORAGE_KEY_AUTH) === "true" && currentUser) {
  showMain(currentUser);
} else {
  showLogin();
}

function showLogin() {
  els.loginSection.classList.remove("hidden");
  els.mainContent.classList.add("hidden");
  els.adminContent.classList.add("hidden");
}

function showMain(user) {
  els.loginSection.classList.add("hidden");
  els.mainContent.classList.remove("hidden");
  updateGreeting(user.name);
  filterTiles(user.tiles);
  if (user.password === CONFIG.ADMIN_PASSWORD) {
    els.adminContent.classList.remove("hidden");
    loadUserList();
  } else {
    els.adminContent.classList.add("hidden");
  }
}

function updateGreeting(name) {
  const hour = new Date().getHours();
  let timeGreeting = "Guten Abend";
  if (hour < 12) timeGreeting = "Guten Morgen";
  else if (hour < 18) timeGreeting = "Guten Mittag";
  els.greeting.textContent = `${timeGreeting} ${name}`;
}

function filterTiles(allowedTiles) {
  els.tiles.forEach(tile => {
    const tileId = tile.getAttribute("data-tile-id") || tile.querySelector("h3").textContent.toLowerCase();
    if (allowedTiles.includes(tileId)) {
      tile.style.display = "block";
    } else {
      tile.style.display = "none";
    }
  });
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
    const user = users.find(u => u.password === input) || (input === CONFIG.ADMIN_PASSWORD ? { name: "Admin", password: CONFIG.ADMIN_PASSWORD, tiles: ["cloud", "truenas", "support"] } : null);
    if (user) {
      showMessage("Erfolgreich angemeldet.", "success");
      localStorage.setItem(CONFIG.STORAGE_KEY_AUTH, "true");
      localStorage.setItem(CONFIG.STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
      setTimeout(() => showMain(user), 700);
    } else {
      showMessage("Falsches Passwort. Bei Problemen siehe Mail unten.", "error");
      els.password.value = "";
    }
    els.password.disabled = false;
  }, CONFIG.LOGIN_DELAY);
});

els.logout.addEventListener("click", () => {
  localStorage.removeItem(CONFIG.STORAGE_KEY_AUTH);
  localStorage.removeItem(CONFIG.STORAGE_KEY_CURRENT_USER);
  showLogin();
});

// Admin: Benutzer erstellen
els.userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = els.userName.value.trim();
  const password = els.userPassword.value.trim();
  const tiles = Array.from(document.querySelectorAll("#user-form input[type='checkbox']:checked")).map(cb => cb.value);
  if (!name || !password || tiles.length === 0) {
    alert("Alle Felder ausfüllen und mindestens eine Kachel auswählen.");
    return;
  }
  if (users.find(u => u.password === password)) {
    alert("Passwort bereits vergeben.");
    return;
  }
  users.push({ name, password, tiles });
  localStorage.setItem(CONFIG.STORAGE_KEY_USERS, JSON.stringify(users));
  loadUserList();
  els.userForm.reset();
});

function loadUserList() {
  els.userList.innerHTML = "";
  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.textContent = `${user.name} (${user.tiles.join(", ")})`;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Löschen";
    deleteBtn.onclick = () => {
      users.splice(index, 1);
      localStorage.setItem(CONFIG.STORAGE_KEY_USERS, JSON.stringify(users));
      loadUserList();
    };
    li.appendChild(deleteBtn);
    els.userList.appendChild(li);
  });
}

function showMessage(text, type) {
  els.message.textContent = text;
  els.message.className = `message ${type}`;
  els.message.classList.remove("hidden");
}

console.info("%c✅ CLOUDARY Portal loaded with user management.", "color:#22c55e;font-weight:bold;");