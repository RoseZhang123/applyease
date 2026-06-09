# ApplyEase checkout page

`checkout.html` is a minimal external checkout and policy page intended for Cloudflare Pages static hosting.

Current MVP URL:

```text
https://pages.rose-zhang-2022.workers.dev/checkout
```

Deployment:

- Cloudflare Pages is connected to `RoseZhang123/pages`.
- The deployed repo stores the checkout files at the repository root.
- Cloudflare Pages settings: framework preset `None`, build command empty, output directory `/`.
- Push updates to `RoseZhang123/pages/main`; Cloudflare deploys automatically.

Current MVP payment model:

- Personal plan: RMB 99/month or RMB 699/year.
- Enterprise plan: RMB 399/month or RMB 2999/year. Enterprise checkout is consultation-first while the B-side workflow is in internal testing.
- WeChat Pay and Alipay QR codes are placeholders until real receiving codes are added.
- The page generates a client-side order number for manual reconciliation after a plan is selected.
- Users must include the order number and email/WeChat in the payment note. Enterprise users should contact support before paying.
- Activation codes are issued manually after payment confirmation.

Compliance notes:

- Chrome Web Store does not process these payments.
- Store listing text must disclose that core functionality requires a paid ApplyEase activation code if that remains true at launch.
- The checkout page must keep pricing, renewal terms, refund policy, privacy policy, contact info, and non-Google payment disclosure visible before payment.
- Refunds are not generally supported after activation code delivery, except when a verified ApplyEase technical issue prevents use on declared supported school application pages and no reasonable fix or workaround is provided.
- Support diagnostics are manual and user-initiated. Diagnostic reports should avoid student profile content and include only operational details needed for troubleshooting.
