(function (window){
  function set_baseurl(baseurl){
    // Set base url to Genobank Navigator, produdccion or developtment server
    window.baseurl = (window.location.protocol === "https:") ? "https://genobank.herokuapp.com/" : baseurl;
  };
  set_baseurl("http://127.0.0.1:8000/");
})(window);

function save_key(private_key, public_key){
  //Save keys in localforage
  localforage.setItem('privatekey', private_key).then(function(value){
    // set privatekey
    localforage.setItem('publickey', public_key).then(function(value){
      console.log("Success Generated Keys!");
      window.open("./createkeys.html","_self");
    });
  }).catch(function(e){
    console.log(e);
  });
}

