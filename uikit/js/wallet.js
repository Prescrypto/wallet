var PUBLIC_KEY;
var PRIVATE_KEY;

// alert templating

var alert_success_template = '\
    <div class="alert alert-success alert-dismissible fade show" role="alert"> \
      <strong>Success Key Saved!</strong> You can go to the next page safety! \
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
        <span aria-hidden="true">&times;</span> \
      </button> \
    </div>'


function save_key(){
  localforage.setItem('privatekey', $("#privkey").val());
  localforage.setItem('publickey', $("#pubkey").val());
  $("#result").html(alert_success_template);
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
