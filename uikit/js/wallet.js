var PUBLIC_KEY;
var PRIVATE_KEY;
var size_data = "10 bits";

// alert sucess templating
var alert_success_template = '\
    <div class="alert alert-success alert-dismissible fade show" role="alert"> \
      <strong>Success Key Saved!</strong> You can go to the next page safety! \
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
        <span aria-hidden="true">&times;</span> \
      </button> \
    </div>'

var please_wait_template = '\
    <div class="alert alert-success alert-dismissible fade show" role="alert"> \
      <strong>Success Key Saved!</strong> Please click on NEXT to continue.\
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
        <span aria-hidden="true">&times;</span> \
      </button> \
    </div>'

// alert error template
var alert_error_template = '\
    <div class="alert alert-danger alert-dismissible fade show" role="alert"> \
      <strong>ERROR!</strong> Please, check your keys! \
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
        <span aria-hidden="true">&times;</span> \
      </button> \
    </div>'

// buttons
var button_next = '\
  <a id="next_button" href="/pages/list_tx.html">\
    <button id="button_next" class="btn btn-primary btn-lg active"> NEXT </button>\
  <\a>'

var forms = '\
  <div class="alert alert-success alert-dismissible fade show" role="alert"> \
  <form>\
  <div class="form-group">\
    <label> Sender</label>\
    <textarea class="form-control" id="sender_text_form" rows="2" placeholder="Name of the sender"></textarea>\
    <label> Receiver </label>\
    <textarea class="form-control" id="receiver_text_form" rows="2" placeholder="Name of the receiver"></textarea>\
    <label> Location </label>\
    <textarea class="form-control" id="location_text_form" rows="2" placeholder="Location"></textarea>\
    <label> Public Key of Receiver </label>\
    <textarea class="form-control" id="public_key_receiver" rows="2" placeholder="Enter the public key of the receiver"></textarea>\
    <label>Map file input</label>\
    <input type="file" class="form-control-file" id="file_map">\
    <label>Ped file input</label>\
    <input type="file" class="form-control-file" id="file_ped">\
  </div>\
  <button type="submit" class="btn btn-primary">Submit</button>\
</form>\
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

function change_page(){
  window.location = ("/pages/list_tx.html");
}

function create_keys(){
  console.log("Start genereting keys");
  var crypt = new JSEncrypt({default_key_size: 2048});
  crypt.getKey();
  $("#privkey").val(crypt.getPrivateKey());
  $("#pubkey").val(crypt.getPublicKey());
  console.log("Finish");
  save_key();
}

$('#button_create').click(function() {
  $('#result').html(please_wait_template);
  create_keys();
  $('#next_button').html(button_next);
});

function decrypt_fields(){
  // descrypt function
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey($('#priv_key').val());

  var location_text = decrypt.decrypt($('#location').html());
  $("#location").html(location_text);
  console.log("Resultado "+ location_text);

  var sender_text = decrypt.decrypt($('#sender').html());
  $("#sender").html(sender_text);
  console.log("Resultado "+ sender_text);

  var receiver_text = decrypt.decrypt($('#receiver').html());
  $("#receiver").html(receiver_text);
  console.log("Resultado "+ receiver_text);
}

$('#button_decrypt').click(function () {
  decrypt_fields();
  $("#button_decrypt").attr("disabled", true);
  $("#button_encrypt").removeAttr("disabled");
});

function encrypt_fields(){
// Encrypt function
  var encrypt_object = new JSEncrypt();
  encrypt_object.setPublicKey($('#pub_key').val());

  var location_text = $("#location").html().trim();
  location_text = encrypt_object.encrypt(location_text);
  $("#location").html(location_text);
  console.log("Resultado "+ location_text);

  var sender_text = $("#sender").html().trim();
  sender_text = encrypt_object.encrypt(sender_text);
  $("#sender").html(sender_text);
  console.log("Resultado "+ sender_text);

  var receiver_text = $("#receiver").html().trim();
  receiver_text = encrypt_object.encrypt(receiver_text);
  $("#receiver").html(receiver_text);
  console.log("Resultado "+ receiver_text);
}

$('#button_encrypt').click(function(){
  encrypt_fields();
  $("#button_decrypt").removeAttr("disabled");
  $("#button_encrypt").attr("disabled", true);
});

$("#button_send").click(function(){
  $("#forms").html(forms);
  $("#sender_text_form").html($("#sender").html().trim());
});
//$('#myLink').addClass('disabled');

//$('#button_test').click(function() {
//  $.get("http://mockbin.org/bin/cd8810c2-9274-442e-a5d4-4de191e13202/", function(data) {
//    console.log("Success")
//    console.log(data)
//    $("#test").html(data);
//  },"json");
//});

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
