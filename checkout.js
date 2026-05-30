(function initCheckout() {
  const orderIdEl = document.getElementById("order-id");
  const paymentNoteEl = document.getElementById("payment-note");
  const copyOrderBtn = document.getElementById("copy-order-btn");
  const selectedPlanLabel = document.getElementById("selected-plan-label");
  const planButtons = Array.from(document.querySelectorAll(".plan-option"));

  const PLAN_BY_ID = {
    PERSONAL_MONTHLY: { label: "个人版 · ¥99/月", note: "PERSONAL_MONTHLY" },
    PERSONAL_YEARLY: { label: "个人版 · ¥699/年", note: "PERSONAL_YEARLY" },
    ENTERPRISE_MONTHLY: { label: "企业版 · ¥399/月", note: "ENTERPRISE_MONTHLY" },
    ENTERPRISE_YEARLY: { label: "企业版 · ¥2999/年", note: "ENTERPRISE_YEARLY" }
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

  function renderSelectedPlan() {
    const plan = PLAN_BY_ID[selectedPlanId] || PLAN_BY_ID.PERSONAL_YEARLY;
    if (selectedPlanLabel) selectedPlanLabel.textContent = plan.label;
    if (paymentNoteEl) paymentNoteEl.textContent = `${orderId} ${plan.note} user@example.com`;
    planButtons.forEach((btn) => {
      btn.setAttribute("aria-pressed", btn.dataset.planId === selectedPlanId ? "true" : "false");
    });
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
