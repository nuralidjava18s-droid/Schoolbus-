document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     DRIVER
  ===================== */

  const pilihDriver = document.getElementById("pilihDriver");
  const driverBaruInput = document.getElementById("driverBaru");
  const displayDriver = document.getElementById("displayDriver");

  function loadDriver(){
    const drivers = storage.getDrivers();

    pilihDriver.innerHTML =
      '<option value="">-- Pilih Driver --</option>';

    drivers.forEach(d=>{
      const o = document.createElement("option");
      o.value = d;
      o.textContent = d;
      pilihDriver.appendChild(o);
    });
  }

  window.tambahDriver = function(){
    const nama = driverBaruInput.value.trim();
    if(!nama) return alert("Masukkan nama driver!");

    const drivers = storage.getDrivers();
    if(drivers.includes(nama))
      return alert("Driver sudah ada!");

    drivers.push(nama);
    storage.setDrivers(drivers);

    driverBaruInput.value = "";
    loadDriver();
    alert("Driver berhasil ditambahkan");
  };

  window.lanjutSiswa = function(){
    if(!pilihDriver.value)
      return alert("Pilih driver dulu!");

    displayDriver.textContent = pilihDriver.value;

    document.getElementById("driverCard").style.display = "none";
    document.getElementById("siswaContainer").style.display = "block";

    document.getElementById("discOneWay").value =
      +storage.getDiscOw() || 0;

    document.getElementById("discPP").value =
      +storage.getDiscPp() || 0;
  };

  /* =====================
     HARGA
  ===================== */

  window.updateHarga = function(){
    const jarak = +document.getElementById("jarak").value || 0;
    const trayek = document.getElementById("trayek").value;

    const dasar = +storage.getHargaDasar();
    const naik  = +storage.getKenaikanPerTitik();

    let total = dasar;

    if(jarak > 1){
      const titik = Math.ceil((jarak - 1) / 0.1);
      total += titik * naik;
    }

    if(trayek === "pp") total *= 2;

    if(trayek === "pp"){
      document.getElementById("hargaPP").value = total;
    }else{
      document.getElementById("totalOneWay").value = total;
    }

    hitungTotal();
  };

  window.hitungTotal = function(){
    const trayek = document.getElementById("trayek").value;
    let total = 0;

    if(trayek === "pp"){
      const h = +document.getElementById("hargaPP").value || 0;
      const d = +document.getElementById("discPP").value || 0;
      total = h - (h * d / 100);
      document.getElementById("totalPP").value = total;
    }else{
      const h = +document.getElementById("totalOneWay").value || 0;
      const d = +document.getElementById("discOneWay").value || 0;
      total = h - (h * d / 100);
      document.getElementById("totalOneWay").value = total;
    }

    document.getElementById("previewTotal").textContent =
      "Preview Total: Rp " + total.toLocaleString("id-ID");
  };

  window.ubahTrayek = function(){
    const trayek = document.getElementById("trayek").value;

    document.getElementById("onewaySection").style.display =
      (trayek === "pergi" || trayek === "pulang") ? "block" : "none";

    document.getElementById("ppSection").style.display =
      (trayek === "pp") ? "block" : "none";

    updateHarga();
  };

  /* =====================
     SIMPAN DATA
  ===================== */

  window.simpanData = function(){
    const data = {
      driver: displayDriver.textContent,
      tgl: document.getElementById("tanggalInput").value,
      siswa: document.getElementById("namaSiswa").value.trim(),
      kelas: document.getElementById("kelas").value.trim(),
      alamat: document.getElementById("alamat").value.trim(),
      jarak: +document.getElementById("jarak").value || 0,
      trayek: document.getElementById("trayek").value,
      total:
        document.getElementById("trayek").value === "pp"
        ? +document.getElementById("totalPP").value
        : +document.getElementById("totalOneWay").value
    };

    if(!data.driver || !data.tgl || !data.siswa || !data.trayek){
      alert("Lengkapi semua data!");
      return;
    }

    const all = storage.getDataPerjalanan();
    all.push(data);
    storage.setDataPerjalanan(all);

    alert("✅ Data berhasil disimpan");

    document.querySelectorAll("input, textarea").forEach(i=>i.value="");
    document.getElementById("trayek").value = "";
    ubahTrayek();
  };

  /* =====================
     BACKUP & RESTORE
  ===================== */

  window.exportData = function(){
    const d = JSON.stringify(storage.getDataPerjalanan());
    const b = new Blob([d], {type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(b);
    a.download = "backup_perjalanan.json";
    a.click();
  };

  window.restoreData = function(fileInput){
    const f = fileInput.files[0];
    if(!f) return;

    const r = new FileReader();
    r.onload = e=>{
      try{
        const parsed = JSON.parse(e.target.result);
        storage.setDataPerjalanan(parsed);
        alert("Restore berhasil");
      }catch{
        alert("File tidak valid!");
      }
    };
    r.readAsText(f);
  };

  /* =====================
     INIT
  ===================== */

  loadDriver();
  updateHarga();

});