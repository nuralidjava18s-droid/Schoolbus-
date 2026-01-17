fetch("navbar.html")
.then(r=>r.text())
.then(html=>{
  document.getElementById("navbar").innerHTML = html;

  // MENU ACTIVE OTOMATIS
  const currentPage = location.pathname.split("/").pop();

  document.querySelectorAll(".bottom-nav a[data-page]").forEach(a=>{
    if(a.dataset.page === currentPage){
      a.classList.add("active");
    }
  });

  // LOGOUT
  const btnLogout = document.getElementById("btnLogout");
  if(btnLogout){
    btnLogout.addEventListener("click", e=>{
      e.preventDefault();
      if(confirm("Yakin ingin logout?")){
        localStorage.removeItem("sb_logged");
        location.href = "index.html"; // arahkan ke login
      }
    });
  }
});
