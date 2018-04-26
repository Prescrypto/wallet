var PUBLIC_KEY;
var PRIVATE_KEY;
function save_key(){
  localforage.setItem('privatekey', $("#privkey").val());
  localforage.setItem('publickey', $("#pubkey").val());
}
function show_publickey()
{
localforage.getItem('publickey', function(err, value){
  // Run this code once the value has been
  // loaded from the offline store.
  PUBLIC_KEY = value;
  //$('#result').html(value);
});
}
function show_privatekey()
{
var _value;
localforage.getItem('privatekey', function(err, value){
  // Run this code once the value has been
  // loaded from the offline store.
  PRIVATE_KEY = value;
});
}