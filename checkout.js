(function initCheckout() {
  const PLAN_BY_ID = {
    PERSONAL_MONTHLY: { label: "个人版月付", amount: "¥99 / 月", requiresContact: false },
    PERSONAL_YEARLY: { label: "个人版年付", amount: "¥699 / 年", requiresContact: false },
    ENTERPRISE_MONTHLY: { label: "企业版月付", amount: "¥399 / 月", requiresContact: false },
    ENTERPRISE_YEARLY: { label: "企业版年付", amount: "¥2999 / 年", requiresContact: false }
  };

  const planButtons = Array.from(document.querySelectorAll("[data-plan-id]"));
  const paymentButtons = Array.from(document.querySelectorAll("[data-payment-method]"));
  const paymentDialog = document.getElementById("payment-dialog");
  const dialogTitle = document.getElementById("payment-dialog-title");
  const dialogQrBox = document.getElementById("dialog-qr-box");
  const dialogQrLabel = document.getElementById("dialog-qr-label");
  const selectedPlanLabel = document.getElementById("selected-plan-label");
  const paymentRemarkLabel = document.getElementById("payment-remark-label");
  const dialogPlanLabel = document.getElementById("dialog-plan-label");
  const dialogRemarkLabel = document.getElementById("dialog-remark-label");

  let selectedPlanId = "";

  function setPaymentButtonsEnabled(enabled) {
    paymentButtons.forEach((btn) => {
      btn.disabled = !enabled;
    });
  }

  function selectPlan(planId) {
    const plan = PLAN_BY_ID[planId];
    if (!plan) return;
    selectedPlanId = planId;

    planButtons.forEach((btn) => {
      const active = btn.dataset.planId === planId;
      btn.classList.toggle("is-selected", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (selectedPlanLabel) {
      selectedPlanLabel.textContent = `${plan.label}，${plan.amount}${plan.requiresContact ? "。请先联系客服确认后付款。" : ""}`;
    }
    if (paymentRemarkLabel) {
      paymentRemarkLabel.textContent = plan.requiresContact
        ? `企业版仍在内测，请先联系客服确认；确认后付款备注填写您的购买邮箱即可。`
        : `付款备注填写您的购买邮箱即可`;
    }
    if (dialogPlanLabel) dialogPlanLabel.textContent = `${plan.label}，${plan.amount}`;
    if (dialogRemarkLabel) dialogRemarkLabel.textContent = `请填写您的购买邮箱`;
    setPaymentButtonsEnabled(!plan.requiresContact);
  }

  function openPaymentDialog(method) {
    if (!selectedPlanId) return;
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

  planButtons.forEach((btn) => {
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", () => selectPlan(btn.dataset.planId));
  });

  document.addEventListener("click", (event) => {
    const btn = event.target?.closest?.("[data-payment-method]");
    if (!btn) return;
    if (btn.disabled) return;
    openPaymentDialog(btn.dataset.paymentMethod);
  });
})();
