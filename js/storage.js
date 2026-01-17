const storage = {
  drivers: [],
  dataPerjalanan: [],
  hargaDasar: 608000,
  kenaikanPerTitik: 7800,
  discOw: 0,
  discPp: 0,

  init: function(){
    if(localStorage.getItem("drivers") === null){
      localStorage.setItem("drivers", JSON.stringify(this.drivers));
    }
    if(localStorage.getItem("dataPerjalanan") === null){
      localStorage.setItem("dataPerjalanan", JSON.stringify(this.dataPerjalanan));
    }
    if(localStorage.getItem("hargaDasar") === null){
      localStorage.setItem("hargaDasar", this.hargaDasar);
    }
    if(localStorage.getItem("kenaikanPerTitik") === null){
      localStorage.setItem("kenaikanPerTitik", this.kenaikanPerTitik);
    }
    if(localStorage.getItem("discOw") === null){
      localStorage.setItem("discOw", this.discOw);
    }
    if(localStorage.getItem("discPp") === null){
      localStorage.setItem("discPp", this.discPp);
    }
  },

  getDrivers: function(){
    return JSON.parse(localStorage.getItem("drivers"));
  },

  getDataPerjalanan: function(){
    return JSON.parse(localStorage.getItem("dataPerjalanan"));
  },

  getHargaDasar: function(){
    return localStorage.getItem("hargaDasar");
  },

  getKenaikanPerTitik: function(){
    return localStorage.getItem("kenaikanPerTitik");
  },

  getDiscOw: function(){
    return localStorage.getItem("discOw");
  },

  getDiscPp: function(){
    return localStorage.getItem("discPp");
  },

  setDrivers: function(drivers){
    localStorage.setItem("drivers", JSON.stringify(drivers));
  },

  setDataPerjalanan: function(dataPerjalanan){
    localStorage.setItem("dataPerjalanan", JSON.stringify(dataPerjalanan));
  },

  setHargaDasar: function(hargaDasar){
    localStorage.setItem("hargaDasar", hargaDasar);
  },

  setKenaikanPerTitik: function(kenaikanPerTitik){
    localStorage.setItem("kenaikanPerTitik", kenaikanPerTitik);
  },

  setDiscOw: function(discOw){
    localStorage.setItem("discOw", discOw);
  },

  setDiscPp: function(discPp){
    localStorage.setItem("discPp", discPp);
  }
};

storage.init();