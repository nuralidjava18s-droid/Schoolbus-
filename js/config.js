// ==== KONFIGURASI ====
const PASSWORD_ADMIN = "ali123";
const DEFAULT_HARGA_DASAR = 608000;
const DEFAULT_KENAIKAN = 7800;

/* =========================
   LOAD HARGA
========================= */
function muatHarga(){
  document.getElementById("hargaDasar").value =
    Number(storage.getHargaDasar()) || DEFAULT_HARGA_DASAR;

  document.getElementById("kenaikanPerTitik").value =
    Number(storage.getKenaikanPerTitik()) || DEFAULT_KENAIKAN;
}

/* =========================
   SIMPAN HARGA
========================= */
function simpanHarga(){
  const pass = document.getElementById("password").value;
  if(pass !== PASSWORD_ADMIN){
    alert("Password salah!");
    return;
  }

  const hargaDasar = Number(document.getElementById("hargaDasar").value);
  const kenaikan   = Number(document.getElementById("kenaikanPerTitik").value);

  if(isNaN(hargaDasar) || isNaN(kenaikan)){
    alert("Input harga tidak valid!");
    return;
  }

  storage.setHargaDasar(hargaDasar);
  storage.setKenaikanPerTitik(kenaikan);

  alert("✅ Harga berhasil diperbarui!");
}

/* =========================
   RESET HARGA
========================= */
function resetHarga(){
  const pass = document.getElementById("password").value;
  if(pass !== PASSWORD_ADMIN){
    alert("Password salah!");
    return;
  }

  storage.setHargaDasar(DEFAULT_HARGA_DASAR);
  storage.setKenaikanPerTitik(DEFAULT_KENAIKAN);

  muatHarga();
  alert("🔄 Harga di-reset ke default");
}

/* =========================
   NAVIGASI
========================= */
function keinput(){
  location.href = "input.html";
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", muatHarga);