(function initCheckout() {
  const orderIdEl = document.getElementById("order-id");
  const paymentNoteEl = document.getElementById("payment-note");
  const copyOrderBtn = document.getElementById("copy-order-btn");
  const selectedPlanLabel = document.getElementById("selected-plan-label");
  const planButtons = Array.from(document.querySelectorAll(".plan-option"));
  const paymentButtons = Array.from(document.querySelectorAll("[data-payment-method]"));
  const paymentDialog = document.getElementById("payment-dialog");
  const dialogTitle = document.getElementById("payment-dialog-title");
  const dialogQrBox = document.getElementById("dialog-qr-box");
  const dialogQrLabel = document.getElementById("dialog-qr-label");
  const dialogPlanLabel = document.getElementById("dialog-plan-label");
  const dialogPaymentNote = document.getElementById("dialog-payment-note");

  const PLAN_BY_ID = {
    PERSONAL_MONTHLY: { label: "个人版 · ¥99/月", note: "PERSONAL_MONTHLY" },
    PERSONAL_YEARLY: { label: "个人版 · ¥699/年", note: "PERSONAL_YEARLY" },
    ENTERPRISE_MONTHLY: { label: "企业版 · ¥399/月", note: "ENTERPRISE_MONTHLY" },
    ENTERPRISE_YEARLY: { label: "企业版 · ¥2399/年", note: "ENTERPRISE_YEARLY" }
  };

  function buildOrderId() {
    const now = new Date();
    const date = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("");
    const random = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `AE-${date}-${random}`;
  }

  const orderId = buildOrderId();
  let selectedPlanId = "PERSONAL_YEARLY";
  let currentPaymentNote = "";
  let currentPlanLabel = "";

  function renderSelectedPlan() {
    const plan = PLAN_BY_ID[selectedPlanId] || PLAN_BY_ID.PERSONAL_YEARLY;
    currentPlanLabel = plan.label;
    currentPaymentNote = `${orderId} ${plan.note} user@example.com`;
    if (selectedPlanLabel) selectedPlanLabel.textContent = currentPlanLabel;
    if (paymentNoteEl) paymentNoteEl.textContent = currentPaymentNote;
    if (dialogPlanLabel) dialogPlanLabel.textContent = currentPlanLabel;
    if (dialogPaymentNote) dialogPaymentNote.textContent = currentPaymentNote;
    planButtons.forEach((btn) => {
      btn.setAttribute("aria-pressed", btn.dataset.planId === selectedPlanId ? "true" : "false");
    });
  }

  function openPaymentDialog(method) {
    const isAlipay = method === "alipay";
    if (dialogTitle) dialogTitle.textContent = isAlipay ? "支付宝支付" : "微信支付";
    if (dialogQrLabel) dialogQrLabel.textContent = isAlipay ? "支付宝收款码" : "微信收款码";
    dialogQrBox?.classList.toggle("alipay", isAlipay);
    if (dialogPlanLabel) dialogPlanLabel.textContent = currentPlanLabel;
    if (dialogPaymentNote) dialogPaymentNote.textContent = currentPaymentNote;

    if (paymentDialog?.showModal) {
      paymentDialog.showModal();
    } else {
      paymentDialog?.setAttribute("open", "");
    }
  }

  if (orderIdEl) orderIdEl.textContent = orderId;
  renderSelectedPlan();

  planButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (PLAN_BY_ID[btn.dataset.planId]) {
        selectedPlanId = btn.dataset.planId;
        renderSelectedPlan();
      }
    });
  });

  paymentButtons.forEach((btn) => {
    btn.addEventListener("click", () => openPaymentDialog(btn.dataset.paymentMethod));
  });
  document.addEventListener("click", (event) => {
    const btn = event.target?.closest?.("[data-payment-method]");
    if (!btn) return;
    openPaymentDialog(btn.dataset.paymentMethod);
  });

  copyOrderBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      copyOrderBtn.textContent = "已复制";
      setTimeout(() => { copyOrderBtn.textContent = "复制"; }, 1400);
    } catch (error) {
      copyOrderBtn.textContent = "请手动复制";
    }
  });
})();
