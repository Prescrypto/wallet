var PUBLIC_KEY;
var PRIVATE_KEY;
var PRIVKEY_VALUE;
var PUBKEY_VALUE;

// alert templating

var alert_success_template = '\
    <div class="alert alert-success alert-dismissible fade show" role="alert"> \
      <strong>Success Key Saved!</strong> You can go to the next page safety! \
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
        <span aria-hidden="true">&times;</span> \
      </button> \
    </div>'

var alert_error_template = '\
    <div class="alert alert-danger alert-dismissible fade show" role="alert"> \
      <strong>ERROR!</strong> Please, please check your keys! \
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
        <span aria-hidden="true">&times;</span> \
      </button> \
    </div>'


function save_key(){
  localforage.setItem('privatekey', $("#privkey").val());
  localforage.setItem('publickey', $("#pubkey").val());
//$("#result").html(alert_success_template);
}

function validate_pubkey(){
  if ($("#pubkey").val().length===0){
    return false
  }else{
    return true
  }
}
function validate_privkey(){
  if($("#privkey").val().lengthh===0){
      return false
  }else{
      return true
  }
}
function validate_keys(){
  save_key()
  if (validate_privkey() && validate_pubkey()){
    $("#result").html(alert_success_template);
  }else{
    $("#result").html(alert_error_template);
  }
}
function show_publickey(){
  var value;
localforage.getItem('publickey', function(err, value){
  // Run this code once the value has been
  // loaded from the offline store.
  PUBLIC_KEY = value;
  //$('#result').html(value);
  });
}
function show_privatekey(){
  var _value;
localforage.getItem('privatekey', function(err, value){
  // Run this code once the value has been
  // loaded from the offline store.
  PRIVATE_KEY = value;
  });
}
