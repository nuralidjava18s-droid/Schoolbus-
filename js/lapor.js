document.addEventListener("DOMContentLoaded", () => {
  isiDropdownDriver();
});

/* =====================
   DROPDOWN DRIVER
   ===================== */
function isiDropdownDriver(){
  const select = document.getElementById("pilihDriver");
  const drivers = storage.getDrivers();

  select.innerHTML = `<option value="">-- Pilih Driver --</option>`;

  drivers.forEach(d=>{
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    select.appendChild(opt);
  });
}

/* =====================
   LAPORAN PER DRIVER
   ===================== */
function tampilLaporan(){
  const driver = document.getElementById("pilihDriver").value;
  const bulan  = document.getElementById("bulanSelect").value;

  if(!driver){
    alert("Pilih driver dulu!");
    return;
  }

  const data = storage.getDataPerjalanan();
  const tbody = document.querySelector("#tabelLapor tbody");

  tbody.innerHTML = "";
  let total = 0;
  let no = 1;

  data.forEach(d=>{
    if(
      d.driver === driver &&
      (!bulan || (d.tgl && d.tgl.startsWith(bulan)))
    ){
      total += Number(d.total) || 0;

      tbody.innerHTML += `
        <tr>
          <td>${no++}</td>
          <td>${d.siswa}</td>
          <td>${d.kelas}</td>
          <td>${d.alamat}</td>
          <td>${d.trayek}</td>
          <td>${d.jarak}</td>
          <td>${Number(d.total).toLocaleString()}</td>
        </tr>
      `;
    }
  });

  // === TAMPILKAN INFO HEADER ===
  document.getElementById("infoLaporan").style.display = "block";
  document.getElementById("infoDriver").textContent = driver;

  if(bulan){
    const [y,m] = bulan.split("-");
    const namaBulan = new Date(y, m-1).toLocaleString("id-ID",{month:"long"});
    document.getElementById("infoBulan").textContent =
      `${namaBulan} ${y}`;
  }else{
    document.getElementById("infoBulan").textContent = "Semua Bulan";
  }

  // === HITUNG POTONGAN ===
  const pot = total * 0.1;
  const bersih = total - pot;

  document.getElementById("ringkasanDriver").style.display = "block";
  document.getElementById("totalKotor").textContent =
    "Rp " + total.toLocaleString();
  document.getElementById("potongan").textContent =
    "Rp " + pot.toLocaleString();
  document.getElementById("totalBersih").textContent =
    "Rp " + bersih.toLocaleString();

  // === TOGGLE TABEL ===
  document.getElementById("tabelLapor").style.display = "table";
  document.getElementById("tabelSemua").style.display = "none";
}
/* =====================
   LAPORAN SEMUA DRIVER
   ===================== */
function tampilSemuaDriver(){
  const data = storage.getDataPerjalanan();
  const tbody = document.querySelector("#tabelSemua tbody");

  tbody.innerHTML = "";
  let totalSemua = 0;

  data.forEach((d,i)=>{
    totalSemua += Number(d.total) || 0;

    tbody.innerHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${d.driver}</td>
        <td>${d.siswa}</td>
        <td>${d.kelas}</td>
        <td>${d.alamat}</td>
        <td>${d.trayek}</td>
        <td>${d.jarak}</td>
        <td>${Number(d.total).toLocaleString()}</td>
      </tr>
    `;
  });

  document.getElementById("tabelSemua").style.display = "table";
  document.getElementById("tabelLapor").style.display = "none";
  document.getElementById("totalPerDriver").style.display = "none";

  document.getElementById("totalDriver").textContent =
    new Set(data.map(d=>d.driver)).size;

  document.getElementById("totalSemua").textContent =
    totalSemua.toLocaleString();
}