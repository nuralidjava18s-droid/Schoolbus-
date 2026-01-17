document.addEventListener("DOMContentLoaded", () => {

  // ===== LOAD STAT =====
  function loadDashboardStat(){
    const drivers = storage.getDrivers();
    const data = storage.getDataPerjalanan();

    document.getElementById("totalDriver").textContent =
      drivers.length;

    document.getElementById("totalSiswa").textContent =
      new Set(data.map(d => d.siswa)).size;

    document.getElementById("totalTrayek").textContent =
      new Set(data.map(d => d.trayek)).size;

    const today = new Date().toISOString().split("T")[0];
    document.getElementById("totalNew").textContent =
      data.filter(d => d.tgl === today).length;
  }

  // ===== CHART =====
  function loadTrayekChart(){
    const data = storage.getDataPerjalanan();
    const map = {};

    data.forEach(d=>{
      if(!d.tgl) return;
      const bulan = d.tgl.slice(0,7);
      map[bulan] = (map[bulan] || 0) + 1;
    });

    const ctx = document.getElementById("trayekChart");
    if(!ctx) return;

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(map),
        datasets: [{
          data: Object.values(map)
        }]
      },
      options: {
        plugins: { legend: { display:false } }
      }
    });
  }

  loadDashboardStat();
  loadTrayekChart();

});