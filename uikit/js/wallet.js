var PUBLIC_KEY;
var PRIVATE_KEY;
var TODAY = new Date();

// alert sucess templating
var alert_success_template = '\
    <div class="alert alert-success alert-dismissible fade show" role="alert"> \
      <strong>Success Key Saved!</strong> You can go to the next page safety! \
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
        <span aria-hidden="true">&times;</span> \
      </button> \
    </div>'

var message_template = '\
    <div class="alert alert-success alert-dismissible fade show" role="alert"> \
      <strong>Success Key Saved!</strong> Please click on NEXT to continue. Also, we recommend saving your keys in .pem files \
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
        <span aria-hidden="true">&times;</span> \
      </button> \
    </div>'

var tx_success = '\
    <div class="alert alert-success alert-dismissible fade show" role="alert"> \
      <strong>Successful TX!</strong>\
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

var tx_error = '\
    <div class="alert alert-danger alert-dismissible fade show" role="alert"> \
      <strong>ERROR!</strong> An error ocurred when making the Tx. \
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> \
        <span aria-hidden="true">&times;</span> \
      </button> \
    </div>'

// buttons
var button_next = '\
  <a id="next_button" href="/pages/list_tx.html">\
    <button id="button_next" class="btn btn-primary btn-lg active"> NEXT </button>\
  <\a>'


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
      $('#next_button').html(button_next);
    }else{
      $('#result').html(alert_error_template);
    }
  }else{
    $('#result').html(alert_error_template);
  }
}

$("#button_load_copy").click(function(){
  validate_keys();
});

function create_keys(){
  console.log("Start genereting keys");
  var crypt = new JSEncrypt({default_key_size: 2048});
  crypt.getKey();
  $("#privkey").val(crypt.getPrivateKey());
  $("#pubkey").val(crypt.getPublicKey());
  console.log("Finish");
  save_key();
}

$('#button_load_new_keys').click(function() {
  $('#result').html(message_template);
  create_keys();
  $('#next_button').html(button_next);
});


$('#next_button').click(function (){

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

$("#button_make_tx").click(function(){
  //$("#forms").html(forms);
  $("#sender_text_form").html($("#sender").html().trim());
});

function encrypt_tx(){
// Encrypt function
  var encrypt_object = new JSEncrypt();
  encrypt_object.setPublicKey($('#public_key_receiver_form').val());

  var location_text = $("#location_text_form").html().trim();
  location_text = encrypt_object.encrypt(location_text);
  console.log("Resultado "+ location_text);

  var sender_text = $("#sender_text_form").html().trim();
  sender_text = encrypt_object.encrypt(sender_text);
  console.log("Resultado "+ sender_text);

  var receiver_text = $("#receiver_text_form").html().trim();
  receiver_text = encrypt_object.encrypt(receiver_text);
  console.log("Resultado "+ receiver_text);

  var public_key_receiver_form = $('#public_key_receiver_form').val();
  date_tx = TODAY.toISOString();

  var posting = $.post("https://genobank-dev-pr-1.herokuapp.com/api/v1/rx-endpoint/",
                  {
                    "public_key": public_key_receiver_form,
                    "patient_name": receiver_text,
                    "medic_hospital": location_text,
                    "timestamp": "2018-02-05T07:46:12.576196",
                    "medic_name": sender_text,
                    //"timestamp": date_tx,
                  }, "json");

  posting.done(function(data, text_status){
    console.log(data);
    console.log(text_status);
  });
  posting.fail(function(xhr, textStatus, errorThrown){
    //alert(xhr.responseText);
    $("#result").html(tx_error);
    console.log(xhr.responseText);
  });
  posting.always(function(){
    console.log("Finish POST!");
  });
}

$('#button_send_tx').click(function(){
  encrypt_tx();
});

// function mostrarContenido(contenido) {
//   var elemento = $('#privkey');
//   elemento.innerHTML = contenido;
// }

// function read_file(e) {
//   var archivo = e.target.files[0];
//   if (!archivo) {
//     return;
//   }
//   var lector = new FileReader();
//   lector.onload = function(e) {
//     var contenido = e.target.result;
//     mostrarContenido(contenido);
//   };
//   lector.readAsText(archivo);
// }

// $('#private_key_file').addEventListener('change', read_file, false);

// function leerArchivo(e) {
//   var archivo = e.target.files[0];
//   if (!archivo) {
//     return;
//   }
//   var lector = new FileReader();
//   lector.onload = function(e) {
//     var contenido = e.target.result;
//     mostrarContenido(contenido);
//   };
//   lector.readAsText(archivo);
// }

// function mostrarContenido(contenido) {
//   var elemento = document.getElementById('privkey');
//   elemento.innerHTML = contenido;
// }

// document.getElementById('file-input')
//   .addEventListener('change', leerArchivo, false);


// $(document).on('ready', function() {
//     $("#input-b6").fileinput({
//         showUpload: false,
//         dropZoneEnabled: false,
//         maxFileCount: 10,
//         mainClass: "input-group-lg"
//     });
// });

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
