# ApplyEase Pages

Static public pages for ApplyEase checkout, policy disclosure, privacy policy, terms, refund policy, and contact information.

## Cloudflare Pages

Use this repository as a Cloudflare Pages project:

- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`
- Root directory: repository root

After deploy, the checkout page is available at:

```text
https://<your-cloudflare-pages-domain>/checkout.html
```

The repo root redirects users to `checkout.html`.

## Current Pages

- `checkout.html`: pricing, order number, WeChat/Alipay placeholder QR panels, renewal terms, refund policy, privacy policy, service terms, contact info.
- `checkout.css`: responsive styling.
- `checkout.js`: client-side order number generation and plan selection.
- `_headers`: conservative static security headers for Cloudflare Pages.

## Notes Before Launch

- Replace the WeChat/Alipay QR placeholders with the real current receiving QR codes or merchant payment integration.
- Update `support@applyease.cn` and `applyease-support-placeholder` if the official contact channels change.
- Keep pricing, renewal terms, refund policy, privacy policy, service terms, and non-Google payment disclosure visible before payment.
- Chrome Web Store listing text should disclose that payment is handled by ApplyEase and not by Google or Chrome Web Store.
