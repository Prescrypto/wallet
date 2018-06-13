var PUBLIC_KEY;
var PRIVATE_KEY;
var TODAY = new Date();

var next_button = '\
  <a class="uk-button uk-button-default" href="genometrics.html"> Next </a>'

$('#create_entropy').on('click', function() {
  UIkit.modal($("#modal-example")).show();
  setInterval(function(){
    if(document.entropy >= 1500){
      $("#create_keys").removeAttr("disabled");
    }
  }, 1000);
});

function save_key(){
  localforage.setItem('privatekey', PRIVATE_KEY);
  localforage.setItem('publickey', PUBLIC_KEY);
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
    var test = 'This a test';
    encrypt.setPublicKey($("#pubkey").val());
    var encrypted = encrypt.encrypt(test);
    // Decrypt with the private key
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey($("#privkey").val());
    var uncrypted = decrypt.decrypt(encrypted);
    if(uncrypted === test){
      console.log("Valid Keys");
      save_key();
      console.log("Saved Keys");
      $('#next_button').html(next_button);
    }else{
      console.log("Error");
    }
  }else{
    console.log("Error");
  }
}

$('#verify_keys').on('click', function(e) {
  e.preventDefault();
  console.log("Click saved keys");
  validate_keys();
});

function create_keys(){
  console.log("Start genereting keys");
  var crypt = new JSEncrypt({default_key_size: 512});
  crypt.getKey();
  PRIVATE_KEY = crypt.getPrivateKey();
  PUBLIC_KEY = crypt.getPublicKey();
  save_key();
  console.log("Finish");
}

$('#create_keys').on('click', function(e) {
  document.location.href = 'createkeys.html';
  e.preventDefault();
  console.log("Click genereting keys");
  create_keys();
});

$('#next_button').click(function (){
});

// function decrypt_fields(){
//   // descrypt function
//   var decrypt = new JSEncrypt();
//   decrypt.setPrivateKey($('#priv_key').val());

//   var location_text = decrypt.decrypt($('#location').html());
//   $("#location").html(location_text);
//   console.log("Resultado "+ location_text);

//   var sender_text = decrypt.decrypt($('#sender').html());
//   $("#sender").html(sender_text);
//   console.log("Resultado "+ sender_text);

//   var receiver_text = decrypt.decrypt($('#receiver').html());
//   $("#receiver").html(receiver_text);
//   console.log("Resultado "+ receiver_text);
// }

// $('#button_decrypt').click(function () {
//   decrypt_fields();
//   $("#button_decrypt").attr("disabled", true);
//   $("#button_encrypt").removeAttr("disabled");
// });

// function encrypt_fields(){
// // Encrypt function
//   var encrypt_object = new JSEncrypt();
//   encrypt_object.setPublicKey($('#pub_key').val());

//   var location_text = $("#location").html().trim();
//   location_text = encrypt_object.encrypt(location_text);
//   $("#location").html(location_text);
//   console.log("Resultado "+ location_text);

//   var sender_text = $("#sender").html().trim();
//   sender_text = encrypt_object.encrypt(sender_text);
//   $("#sender").html(sender_text);
//   console.log("Resultado "+ sender_text);

//   var receiver_text = $("#receiver").html().trim();
//   receiver_text = encrypt_object.encrypt(receiver_text);
//   $("#receiver").html(receiver_text);
//   console.log("Resultado "+ receiver_text);
// }

// $('#button_encrypt').click(function(){
//   encrypt_fields();
//   $("#button_decrypt").removeAttr("disabled");
//   $("#button_encrypt").attr("disabled", true);
// });

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

function encrypt_data(data, public_key){

  var encrypt_object = new JSEncrypt();
  //We assign public key to the constructor
  encrypt_object.setPublicKey(public_key);
  //return data encrypt
  return encrypt_object.encrypt(data);
}

function sign_msg(msg){

  var rsa = new RSAKey();
  //Load private key to variable rsa
  rsa.readPrivateKeyFromPEMString($('#priv_key').val());
  //Define the hash algorithm
  var hashalg = 'sha1';
  var sign = rsa.sign(msg, hashalg);
  //the value of sign is given in hex
  return sign;
}

$('#create_rx').click(function(){
  //Get Public key
  var public_key = $('#pub_key').val();
  //console.log(public_key);
  ///// Encrytp data /////
  var medic_name = $('#medic_name').val();
  var medic_name_encrypt = encrypt_data(medic_name, public_key);
  //console.log(medic_name);
  var medic_hospital = "IMSS";
  var medic_hospital_encrypt = encrypt_data(medic_hospital, public_key);
  //console.log(medic_hospital);
  var medic_cedula = "1234567890"
  var medic_cedula_encrypt = encrypt_data(medic_cedula, public_key);
  //console.log(medic_cedula);
  var patient_name = $('#patient_name').val();
  var patient_name_encrypt = encrypt_data(patient_name, public_key);
  //console.log(patient_name);
  var patiente_age = 26;
  var patiente_age_encrypt = encrypt_data(patiente_age, public_key);
  //console.log(patiente_age);
  var diagnosis = "N/A";
  var diagnosis_encrypt = encrypt_data(diagnosis, public_key);
  //console.log(diagnosis);
  var location = $('#location').val();
  var location_encrypt = encrypt_data(location, public_key);
  //console.log(location);

  ///// Data not encrytp /////
  var medications = [];
  var time = "2018-06-06T07:46:12.576196";

  ///// Create msg /////
  var msg = public_key + medic_name + medic_hospital + medic_cedula + patient_name + patiente_age + diagnosis + location + medications + time;
  //console.log(msg)

  var sign = sign_msg(msg);
  //console.log(sign);

  var posting = $.post("http://127.0.0.1:8000/api/v1/rx-endpoint/",
                  {
                    patiente_age: patiente_age_encrypt,
                    timestamp : time,
                    public_key : "63636f70795f7265670a5f7265636f6e7374727563746f720a70310a28637273612e6b65790a5075626c69634b65790a70320a635f5f6275696c74696e5f5f0a6f626a6563740a70330a4e745270340a284c383935383035343431303037353737343836353330343639393734383236383039333138383038333336373233333639323835393330363133313033343932343630313734353633393334313838363433373634363134343231313039363331303030353234363338313630343032383131333236363031393430303533353831363035343533333636333737313132353536323534303937314c0a4936353533370a74622e",
                    //"medications": [
                    //                {"presentation": " Etacortilen ( Dexametasona 20 monodosis)", "instructions": "Med Lunes test"},
                    //                {"presentation": "Med 2", "instructions": "Med Lunes test 2"}],
                    patient_name: patient_name_encrypt,
                    medic_hospital: medic_hospital_encrypt,
                    location: location_encrypt,
                    diagnosis: diagnosis_encrypt,
                    signature: sign,
                    medic_cedula: medic_cedula_encrypt,
                    medic_name: medic_name_encrypt
                  }, "json");

  /*var posting = $.post("http://127.0.0.1:8000/api/v1/rx-endpoint/",
                {
                patient_age: 34,
                timestamp: "2018-06-05T07:46:12.576196",
                public_key: "63636f70795f7265670a5f7265636f6e7374727563746f720a70310a28637273612e6b65790a5075626c69634b65790a70320a635f5f6275696c74696e5f5f0a6f626a6563740a70330a4e745270340a284c383935383035343431303037353737343836353330343639393734383236383039333138383038333336373233333639323835393330363133313033343932343630313734353633393334313838363433373634363134343231313039363331303030353234363338313630343032383131333236363031393430303533353831363035343533333636333737313132353536323534303937314c0a4936353533370a74622e",
                medications: [
                    {presentation1: " Etacortilen ( Dexametasona 20 monodosis)", instructions1: "Med Lunes test"},
                    {presentation2: "Med 2", instructions2: "Med Lunes test 2"}],
                patient_name: "Xtornasol512",
                medic_hospital: "N/A",
                location: "N/A",
                diagnosis: "Hola",
                signature: "FiQBQIimp0YgnxYuI4kFrME9CTxu9T7eTGOmlG+Bs5alN+7MXtQRr4KgD0rANNf/hIbLZWt5A/FPLOWtv/UriA==",
                medic_cedula: "5555521",
                medic_name: "Everardo J. Barojas M."
                }, "json");
*/
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


