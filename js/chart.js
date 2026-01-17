let trayekChart;

function loadTrayekChart(){
  const data = JSON.parse(localStorage.getItem("dataPerjalanan")) || [];
  const trayek = [...new Set(data.map(d=>d.trayek).filter(Boolean))];
  const jumlah = trayek.map(t=>data.filter(d=>d.trayek===t).length);

  const ctx = document.getElementById("trayekChart");
  if(trayekChart) trayekChart.destroy();

  trayekChart = new Chart(ctx,{
    type:"bar",
    data:{
      labels:trayek,
      datasets:[{data:jumlah}]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      scales:{y:{beginAtZero:true}}
    }
  });
}