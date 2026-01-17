// ==== KONFIGURASI ====    
const PASSWORD_ADMIN = "ali123"; // ganti sendiri    
const DEFAULT_HARGA_DASAR = 608000;    
const DEFAULT_KENAIKAN = 7800;    // Load harga saat halaman dibuka
function muatHarga(){
document.getElementById("hargaDasar").value = localStorage.getItem("hargaDasar") || DEFAULT_HARGA_DASAR;
document.getElementById("kenaikanPerTitik").value = localStorage.getItem("kenaikanPerTitik") || DEFAULT_KENAIKAN;
}

// Simpan harga baru
function simpanHarga(){
let pass = document.getElementById("password").value;
if(pass !== PASSWORD_ADMIN){ alert("Password salah!"); return; }

let hargaDasar = parseFloat(document.getElementById("hargaDasar").value);
let kenaikan = parseFloat(document.getElementById("kenaikanPerTitik").value);

if(isNaN(hargaDasar) || isNaN(kenaikan)){ alert("Input harga tidak valid!"); return; }

localStorage.setItem("hargaDasar", hargaDasar);
localStorage.setItem("kenaikanPerTitik", kenaikan);
alert("Harga berhasil diperbarui!");
}

// Reset harga ke default
function resetHarga(){
let pass = document.getElementById("password").value;
if(pass !== PASSWORD_ADMIN){ alert("Password salah!"); return; }
localStorage.setItem("hargaDasar", DEFAULT_HARGA_DASAR);
localStorage.setItem("kenaikanPerTitik", DEFAULT_KENAIKAN);
muatHarga();
alert("Harga telah di-reset ke default!");
}

// Link ke input.html
function keindex(){
window.location.href = "index.html";
}

// Inisialisasi
muatHarga();
// ==== KONFIGURASI ====    
const PASSWORD_ADMIN = "ali123"; // ganti sendiri    
const DEFAULT_HARGA_DASAR = 608000;    
const DEFAULT_KENAIKAN = 7800;    // Load harga saat halaman dibuka
function muatHarga(){
document.getElementById("hargaDasar").value = localStorage.getItem("hargaDasar") || DEFAULT_HARGA_DASAR;
document.getElementById("kenaikanPerTitik").value = localStorage.getItem("kenaikanPerTitik") || DEFAULT_KENAIKAN;
}

// Simpan harga baru
function simpanHarga(){
let pass = document.getElementById("password").value;
if(pass !== PASSWORD_ADMIN){ alert("Password salah!"); return; }

let hargaDasar = parseFloat(document.getElementById("hargaDasar").value);
let kenaikan = parseFloat(document.getElementById("kenaikanPerTitik").value);

if(isNaN(hargaDasar) || isNaN(kenaikan)){ alert("Input harga tidak valid!"); return; }

localStorage.setItem("hargaDasar", hargaDasar);
localStorage.setItem("kenaikanPerTitik", kenaikan);
alert("Harga berhasil diperbarui!");
}

// Reset harga ke default
function resetHarga(){
let pass = document.getElementById("password").value;
if(pass !== PASSWORD_ADMIN){ alert("Password salah!"); return; }
localStorage.setItem("hargaDasar", DEFAULT_HARGA_DASAR);
localStorage.setItem("kenaikanPerTitik", DEFAULT_KENAIKAN);
muatHarga();
alert("Harga telah di-reset ke default!");
}

// Link ke input.html
function keindex(){
window.location.href = "index.html";
}

// Inisialisasi
muatHarga();