/* =========================
   DRIVER MANAGEMENT (FINAL)
   ========================= */

/* ===== TOAST ===== */
function showToast(msg){
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.style.display = "block";
  setTimeout(()=>t.style.display="none", 2000);
}

/* ===== RENDER LIST ===== */
function loadDriver(){
  const list = document.getElementById("driverList");
  const drivers = storage.getDrivers();

  list.innerHTML = "";

  if(drivers.length === 0){
    list.innerHTML = "<p>Belum ada driver</p>";
    return;
  }

  drivers.forEach((name, i)=>{
    const row = document.createElement("div");
    row.className = "driver-row";

    row.innerHTML = `
      <span>${name}</span>
      <div class="btn-group">
        <button class="edit" onclick="editDriver(${i})">✏️</button>
        <button class="delete" onclick="hapusDriver(${i})">🗑️</button>
      </div>
    `;

    list.appendChild(row);
  });
}

/* ===== TAMBAH DRIVER ===== */
function tambahDriver(){
  const input = document.getElementById("namaDriverBaru");
  const nama = input.value.trim();
  if(!nama) return alert("Isi nama driver!");

  const drivers = storage.getDrivers();
  if(drivers.includes(nama)) return alert("Driver sudah ada!");

  drivers.push(nama);
  storage.setDrivers(drivers);

  input.value = "";
  loadDriver();
  showToast("Driver ditambahkan");
}

/* ===== HAPUS DRIVER ===== */
function hapusDriver(i){
  if(!confirm("Hapus driver ini?")) return;

  const drivers = storage.getDrivers();
  const name = drivers[i];
  drivers.splice(i,1);
  storage.setDrivers(drivers);

  let data = storage.getDataPerjalanan();
  data = data.map(d=>{
    if(d.driver === name) d.driver = "Unknown";
    return d;
  });
  storage.setDataPerjalanan(data);

  loadDriver();
  showToast("Driver dihapus");
}

/* ===== EDIT DRIVER ===== */
function editDriver(i){
  const drivers = storage.getDrivers();
  const lama = drivers[i];

  let baru = prompt("Edit nama driver:", lama);
  if(baru === null) return;

  baru = baru.trim();
  if(!baru) return alert("Nama tidak boleh kosong!");
  if(drivers.includes(baru) && baru !== lama)
    return alert("Driver sudah ada!");

  drivers[i] = baru;
  storage.setDrivers(drivers);

  let data = storage.getDataPerjalanan();
  data = data.map(d=>{
    if(d.driver === lama) d.driver = baru;
    return d;
  });
  storage.setDataPerjalanan(data);

  loadDriver();
  showToast("Driver diperbarui");
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", loadDriver);