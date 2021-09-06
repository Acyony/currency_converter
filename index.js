import "../src/style.scss";

// --------- =^.^= --------- Approach with explicit promise

document.querySelector("#convert-btn").addEventListener("click", function () {
  let fromCrypto = document.querySelector("#crypto-currency").value;
  let toCurrency = document.querySelector("#real-currency").value;

  fetch(
    `https://api.cryptonator.com/api/ticker/${fromCrypto}-${toCurrency}`
  ).then(function (response) {
    response.json().then(function (json) {
      let price = parseFloat(json.ticker.price);
      let cryptoAmount = parseFloat(
        document.querySelector("#crypto-amount").value
      );
      let realAmountInput = document.querySelector("#real-amount");

      realAmountInput.value = (price * cryptoAmount).toFixed(2);
    });
  });
});



// --------- =^.^= --------- Async version with implicit promise

async function currencyConverter() {
  let fromCrypto = document.querySelector("#crypto-currency").value;
  let toCrypto = document.querySelector("#real-currency").value;
  let url = `https://api.cryptonator.com/api/ticker/${fromCrypto}-${toCrypto}`;

  try {
    let response = await fetch(url);
    let jsonResponseCurrency = await response.json();

    let price = parseFloat(jsonResponseCurrency.ticker.price);
    let cryptoAmount = parseFloat(document.querySelector("#crypto-amount").value
    );

    let realAmountInput = document.querySelector("#real-amount");
    realAmountInput.value = (price * cryptoAmount).toFixed(2);

  } catch (error) {
    console.dir((`Failed: ${error}`))
  }
}


document.querySelector("#convert-btn").addEventListener("click", async function () {
  await currencyConverter();
});



// to clear the input text when refresh the page

function init() {
  document.getElementById("crypto-amount").value = " ";
  document.getElementById("real-amount").value = " "; 
}
window.onload = init;

