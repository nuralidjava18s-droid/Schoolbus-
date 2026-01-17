let selectedIndex = null;

/* =====================
   STORAGE (PAKAI storage.js)
===================== */
function getData(){
  return storage.getDataPerjalanan();
}

function saveData(data){
  storage.setDataPerjalanan(data);
}

/* =====================
   SEARCH
===================== */
function searchData(){
  const key = searchBox.value.toLowerCase();
  resultList.innerHTML = "";

  getData().forEach((d,i)=>{
    const teks = `${d.siswa}${d.driver}${d.tgl}`.toLowerCase();
    if(teks.includes(key)){
      const div = document.createElement("div");
      div.className = "student-card";
      div.textContent = `${d.siswa} - ${d.driver} (${d.tgl})`;
      div.onclick = ()=> openPopup(i);
      resultList.appendChild(div);
    }
  });
}

/* =====================
   POPUP
===================== */
function openPopup(i){
  selectedIndex = i;
  const d = getData()[i];

  popupInfo.innerHTML = `
    <b>Driver:</b> ${d.driver}<br>
    <b>Siswa:</b> ${d.siswa}<br>
    <b>Kelas:</b> ${d.kelas}<br>
    <b>Trayek:</b> ${d.trayek}<br>
    <b>Total:</b> Rp ${Number(d.total).toLocaleString("id-ID")}
  `;

  popupDetail.style.display = "flex";
}

function closePopup(){
  popupDetail.style.display = "none";
}

/* =====================
   EDIT
===================== */
function openEditForm(){
  closePopup();

  listSection.style.display = "none";
  editSection.style.display = "block";

  const d = getData()[selectedIndex];

  editDriver.value = d.driver;
  editTgl.value    = d.tgl;
  editSiswa.value  = d.siswa;
  editKelas.value  = d.kelas;
  editAlamat.value = d.alamat;
  editJarak.value  = d.jarak;
  editTrayek.value = d.trayek;
  editDisc.value   = d.disc || 0;

  recalc();
}

function saveChange(){
  const data = getData();

  data[selectedIndex] = {
    driver : editDriver.value,
    tgl    : editTgl.value,
    siswa  : editSiswa.value,
    kelas  : editKelas.value,
    alamat : editAlamat.value,
    jarak  : +editJarak.value || 0,
    trayek : editTrayek.value,
    disc   : +editDisc.value || 0,
    total  : +editTotal.value || 0
  };

  saveData(data);
  cancelEdit();
  searchData();
}

function cancelEdit(){
  editSection.style.display = "none";
  listSection.style.display = "block";
}

/* =====================
   DELETE
===================== */
function deleteSelected(){
  if(!confirm("Hapus data perjalanan ini?")) return;

  const data = getData();
  data.splice(selectedIndex, 1);
  saveData(data);

  closePopup();
  searchData();
}

/* =====================
   DRIVER
===================== */
function loadDriver(){
  const drivers = storage.getDrivers();

  editDriver.innerHTML =
    drivers.map(d=>`<option value="${d}">${d}</option>`).join("");
}

/* =====================
   HITUNG ULANG TOTAL
===================== */
function recalc(){
  const jarak  = +editJarak.value || 0;
  const trayek = editTrayek.value;
  const disc   = +editDisc.value || 0;

  const dasar  = +storage.getHargaDasar();
  const naik   = +storage.getKenaikanPerTitik();

  let total = dasar;

  if(jarak > 1){
    const titik = Math.ceil((jarak - 1) / 0.1);
    total += titik * naik;
  }

  if(trayek === "pp") total *= 2;

  total -= total * disc / 100;

  editTotal.value = Math.round(total);
}

/* =====================
   INIT
===================== */
document.addEventListener("DOMContentLoaded", ()=>{
  loadDriver();
  searchData();
});