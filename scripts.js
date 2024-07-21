document.addEventListener("DOMContentLoaded", () => {
  const upiElement = document.getElementById("upi");
  const netBankingElement = document.getElementById("net-banking");
  const cardElement = document.getElementById("card");
  const paymentButton = document.getElementById("payment-button");
  const paymentAmount = document.getElementById("payment-amount");
  let selectedMethod = "upi";

  // Getitng url parameters
  // Function to get URL parameters
  function getQueryParams() {
    let params = {};
    let queryString = window.location.search.substring(1);
    let queryArray = queryString.split("&");
    for (let i = 0; i < queryArray.length; i++) {
      let pair = queryArray[i].split("=");
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return params;
  }

  // Get URL parameters
  let params = getQueryParams();

  // Get the UPI DATA
  let upiID = "7428655030@paytm"; // Replace with your actual UPI ID
  let amount = params.amount || "";
  let transactionNote = params.transactionNote || "";

  // UPI Link
  let upiLink = `upi://pay?pa=${upiID}&am=${amount}&tn=${transactionNote}`;

  // Payment Amount Set
  paymentAmount.innerText = `₹${amount}`;

  // Generate QR code for UPI link
  const qrCodeElement = document.getElementById("qr-code");
  qrCodeElement.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    upiLink
  )}&size=150x150`;

  paymentButton.href = upiLink;

  // Handle method selection
  const methods = [upiElement, netBankingElement, cardElement];
  methods.forEach((method) => {
    method.addEventListener("click", () => {
      methods.forEach((m) => m.classList.remove("selected"));
      method.classList.add("selected");
      selectedMethod = method.id;

      if (selectedMethod === "upi") {
        paymentButton.textContent = "Pay via UPI Apps";
        paymentButton.href = upiLink;
        paymentButton.onclick = null;
      } else {
        paymentButton.textContent = `Pay via ${selectedMethod.replace(
          "-",
          " "
        )}`;
        paymentButton.href = "#";
        paymentButton.onclick = () => alert("Payment method not available");
      }
    });
  });

  // Initial selection
  upiElement.classList.add("selected");
});
