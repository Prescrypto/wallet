(function (window){
  function set_baseurl(baseurl){
    // Set base url to Rexchain Navigator, produdccion or developtment server
    window.baseurl = (window.location.protocol === "https:") ? "https://www.rexchain.io/" : baseurl;
  };
  set_baseurl("https://rexchain-dev-pr-42.herokuapp.com/");
  //set_baseurl("https://www.rexchain.io/");
})(window);

function save_key(private_key, public_key){
  //Save keys in localforage
  localforage.setItem('privatekey', private_key).then(function(value){
    // set privatekey
    localforage.setItem('publickey', public_key).then(function(value){
      console.log("Success Generated Keys!");
    });
  }).catch(function(e){
    console.log(e);
  });
}

