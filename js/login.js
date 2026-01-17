const PASSWORD = "1234";
const LOGIN_KEY = "sb_logged";

/* ===== LOGIN ===== */
function checkLogin(){
  const input = document.getElementById("passwordInput").value.trim();
  const error = document.getElementById("loginError");

  if(input === PASSWORD){
    localStorage.setItem(LOGIN_KEY, "yes");
    hideLogin();
  } else {
    error.textContent = "Password salah!";
  }
}

/* ===== HIDE LOGIN ===== */
function hideLogin(){
  const login = document.getElementById("loginScreen");
  if(!login) return;

  login.style.opacity = "0";
  setTimeout(()=>{
    login.style.display = "none";
  }, 300);
}

/* ===== LOGOUT (PENTING) ===== */
function logout(){
  localStorage.removeItem(LOGIN_KEY);
  location.reload(); // kembali ke login
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", ()=>{
  if(localStorage.getItem(LOGIN_KEY) === "yes"){
    hideLogin();
  }
});