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

var button_next = '\
    <a id="next_button" href="/pages/list_tx.html">\
      <button id="button_next" class="btn btn-primary btn-lg active"> Next </button>\
    </a>'

function save_key(){
  localforage.setItem('privatekey', $("#privkey").val());
  localforage.setItem('publickey', $("#pubkey").val());
  console.log("Set keys on Localstorage");
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

$("#button_load").click(function(){
  validate_keys();
});

function validate_keys(){
  save_key();

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
      $("#next_button").html(button_next);
    }else{
      localforage.clear('publickey');
      localforage.clear('privatekey');
      $('#result').html(alert_error_template);
    }
  }else{
    localforage.clear('publickey');
    localforage.clear('privatekey');
    $('#result').html(alert_error_template);
  }
}

$('#button_create').click(function() {
  create_keys();
});

function create_keys(){
  $('#result').html(please_wait_template);
  console.log("Start genereting keys");
  var crypt = new JSEncrypt({default_key_size: 2048});
  crypt.getKey();
  $("#privkey").val(crypt.getPrivateKey());
  $("#pubkey").val(crypt.getPublicKey());
  console.log("Finish");
}

function encrypted_fields(){
  var encrypt = new JSEncrypt();
  localforage.getItem('publickey', function(err, value){
  PUBLIC_KEY = value;
});
encrypt.setPublicKey(PUBLIC_KEY);
var encrypted_size = encrypt.encrypt(size_data);
document.getElementById('encrypt_text').innerHTML=encrypted_size;
}

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