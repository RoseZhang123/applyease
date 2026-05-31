(function initCheckout() {
  const paymentButtons = Array.from(document.querySelectorAll("[data-payment-method]"));
  const paymentDialog = document.getElementById("payment-dialog");
  const dialogTitle = document.getElementById("payment-dialog-title");
  const dialogQrBox = document.getElementById("dialog-qr-box");
  const dialogQrLabel = document.getElementById("dialog-qr-label");

  function openPaymentDialog(method) {
    const isAlipay = method === "alipay";
    if (dialogTitle) dialogTitle.textContent = isAlipay ? "支付宝支付" : "微信支付";
    if (dialogQrLabel) dialogQrLabel.textContent = isAlipay ? "支付宝收款码" : "微信收款码";
    dialogQrBox?.classList.toggle("alipay", isAlipay);

    if (paymentDialog?.showModal) {
      paymentDialog.showModal();
    } else {
      paymentDialog?.setAttribute("open", "");
    }
  }

  paymentButtons.forEach((btn) => {
    btn.addEventListener("click", () => openPaymentDialog(btn.dataset.paymentMethod));
  });
  document.addEventListener("click", (event) => {
    const btn = event.target?.closest?.("[data-payment-method]");
    if (!btn) return;
    openPaymentDialog(btn.dataset.paymentMethod);
  });
})();
