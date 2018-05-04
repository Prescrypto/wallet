var PUBLIC_KEY;
var PRIVATE_KEY;
var size_data = "10 bits";

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
      <strong>ERROR!</strong> Please, check your keys! \
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
        <span aria-hidden="true">&times;</span> \
      </button> \
    </div>'

var please_wait_template = '\
    <div class="alert alert-primary alert-dismissible fade show" role="alert"> \
      <strong>WORKING!</strong> Please wait, this process takes at least one minute\
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
        <span aria-hidden="true">&times;</span> \
      </button> \
    </div>'

function save_key(){
  localforage.setItem('privatekey', $("#privkey").val());
  localforage.setItem('publickey', $("#pubkey").val());
  console.log("Set keys on Localstorage");
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

$("#button_load").click(function(){
  validate_keys();
});

function validate_keys(){

  if (validate_privkey() && validate_pubkey()){
    // Encrypt with the public key
    var encrypt = new JSEncrypt();
    var test = 'This a test'
    encrypt.setPublicKey($("#pubkey").val());
    var encrypted = encrypt.encrypt(test);
    // Decrypt with the private key
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey($("#privkey").val());
    var uncrypted = decrypt.decrypt(encrypted);
    if(uncrypted === test){
      $('#result').html(alert_success_template);
      save_key();
    }else{
      $('#result').html(alert_error_template);
    }
  }else{
    $('#result').html(alert_error_template);
  }
}

$('#button_create').click(function() {
  $('#result').html(please_wait_template);
  create_keys();

});

function create_keys(){
  console.log("Start genereting keys");
  var crypt = new JSEncrypt({default_key_size: 2048});
  crypt.getKey();
  $("#privkey").val(crypt.getPrivateKey());
  $("#pubkey").val(crypt.getPublicKey());
  console.log("Finish");
  save_key();
  window.setTimeout(change_page(), 20000);
}

function change_page(){
  window.location = ("/pages/list_tx.html");
}

function decrypt_fields(){
  // descrypt function
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey($('#priv_key').val());

  var uncrypted = decrypt.decrypt($('#location').html());
  $("#location").html(uncrypted);
  console.log("Resultado "+ uncrypted);
}

$('#button_decrypt').click(function () {
  decrypt_fields();
});


$('#button_encrypt').click(function(){
  // Encrypt function
  var encrypt_object = new JSEncrypt();
  encrypt_object.setPublicKey($('#pub_key').val());
  var location_text = $("#location").html().trim();
  location_text = encrypt_object.encrypt(location_text);
  $("#location").html(location_text);
  console.log("Resultado "+ location_text);
});


$('#button_test').click(function() {
  $.get("http://mockbin.org/bin/cd8810c2-9274-442e-a5d4-4de191e13202/", function(data) {
    console.log("Success")
    console.log(data)
    $("#test").html(data);
  },"json");
});

//function test_get(data){
//
//}
//function show_publickey(){
//  localforage.getItem('publickey', function(err, value){
  // Run this code once the value has been
  // loaded from the offline store.
//  PUBLIC_KEY = value;
  //$('#result').html(value);
//  });
//}
//function show_privatekey(){
//  localforage.getItem('privatekey', function(err, value){
  // Run this code once the value has been
  // loaded from the offline store.
//  PRIVATE_KEY = value;
//  });
//}
