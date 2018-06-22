function save_key(private_key, public_key){
  //Save keys in localforage
  localforage.setItem('privatekey', private_key);
  localforage.setItem('publickey', public_key);
  console.log("Set keys on Localstorage");
}

