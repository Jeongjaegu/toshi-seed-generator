require("./app.scss")

import 'babel-polyfill';
import $ from 'jquery';

let bip39 = require('bip39')
let hdkey = require('ethereumjs-wallet/hdkey');
let utils = require('ethereumjs-util');

$(() => {
  $("#generate").click(function(e) {
    generate();
  });

  $("#code").on('input', function(e) {
    console.log($("#code").val());
    renderPhrase($("#code").val());
  });

  $("#username" ).on('input', function(e) {
    renderCode($(this).val());
  });
})

function generate() {
  let phrase = bip39.generateMnemonic();
  renderPhrase(phrase);
}

function renderPhrase(phrase) {
  let seed = bip39.mnemonicToSeed(phrase);
  let key = hdkey.fromMasterSeed(seed);

  let address = utils.bufferToHex(key.derivePath("m/0'/1/0").getWallet().getAddress());
  let oldPaymentAddress = utils.bufferToHex(key.derivePath("m/0'/0/0").getWallet().getAddress());
  let paymentAddress = utils.bufferToHex(key.derivePath("m/44'/60'/0'/0/0").getWallet().getAddress());

  $(() => {
    $("#code").val(phrase);
    $("#address").text(address);
    $("#payment_address").text(paymentAddress);

    $("#old_code").val(phrase);
    $("#old_address").val(address);
    $("#old_payment_address").val(oldPaymentAddress);
  })
}

function renderCode(username) {
  $("#qrcode").empty();
  new QRCode(document.getElementById("qrcode"), {
      text: 'https://app.toshi.org/add/@'+username,
      width: 300,
      height: 300,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
  });
}

generate();
