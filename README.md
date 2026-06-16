# ApplyEase support page

`checkout.html` is currently a minimal invite-only support and access page intended for Cloudflare Pages static hosting.

Current MVP URL:

```text
https://pages.rose-zhang-2022.workers.dev/checkout
```

Deployment:

- Cloudflare Pages is connected to `RoseZhang123/pages`.
- The deployed repo stores the website files at the repository root.
- Cloudflare Pages settings: framework preset `None`, build command empty, output directory `/`.
- Push updates to `RoseZhang123/pages/main`; Cloudflare deploys automatically.

Current MVP access model:

- The public page does not show plan prices, online payment controls, QR codes, or order note instructions.
- Trial access, activation codes, renewal, and team beta evaluation are handled by contacting support through WeChat or email.
- Activation codes are issued manually after support confirms the user's intended school/application scenario.

Compliance notes:

- Chrome Web Store does not process ApplyEase activation or support arrangements.
- Store listing text must disclose that core functionality requires an ApplyEase activation code if that remains true at launch.
- The public page must keep supported scope, refund policy, privacy policy, terms, contact info, and non-Google disclosure visible.
- Refund/cancellation terms for any support-confirmed paid opening should be handled through support records; the public page should not present a public online checkout flow.
- Support diagnostics are manual and user-initiated. Diagnostic reports should avoid student profile content and include only operational details needed for troubleshooting.
