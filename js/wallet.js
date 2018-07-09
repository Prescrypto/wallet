function save_key(private_key, public_key){
  //Save keys in localforage
  localforage.setItem('privatekey', private_key).then(function(value){
    // set privatekey
    localforage.setItem('publickey', public_key).then(function(value){
      console.log("Success Generated Keys!");
      window.open("/createkeys.html","_self");
    });
  }).catch(function(e){
    console.log(e);
  });
}

