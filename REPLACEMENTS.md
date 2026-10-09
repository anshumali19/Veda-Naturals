# Veda Naturals — Everything Mocked / To Replace

> Nothing in code was replaced to write this file. All items below are **mock data or placeholders** currently shipped in `webapp/`. Work through this list when connecting real content, imagery, and backend.

## 1. Product imagery (highest visibility)
No real photography is bundled. Every visual is a cream arch panel with a Material Symbol icon. The original `aida-public` Google image URLs from the design exports were intentionally **not** copied.
- `app/page.tsx` — hero arch (“Amber apothecary” text + `spa` icon), bundle arch (`science` icon), founder photo arch (`person` icon).
- `components/ProductCard.tsx:16` — product tile arch (`spa` icon + form label). Affects all 12 products on `/` and `/shop`.
- `app/product/[slug]/ProductClient.tsx` — gallery hero arch (`spa` icon + `Batch …` caption).
- Needed: product shots, hero still-life, founder portrait, bundle flat-lay. Recommended: `/public/images/products/<slug>.webp`, `/public/images/hero.webp`, `/public/images/founder.webp`, plus OG image.

## 2. Product catalog data
- `lib/data/products.ts` — all 12 products (names, sizes, prices, MRPs, ratings, review counts, badges, concerns, batches, highlights, descriptions) are transcribed mock data from the design screens, not a PIM.
- `lib/data/products.ts` (`concerns`, `inr`, `discount`) — concern taxonomy and INR formatting are hardcoded.
- `app/shop/page.tsx` — “Showing 1–N of 36” claims 36 SKUs; only 12 exist. Category counts (Powders 18, Resins 4…), sort, and price slider filter the mock array client-side.
- Needed: real catalog source (CMS/PIM or API), full SKU list, per-variant pricing, ratings feed, batch/lot data.

## 3. Pricing, coupons, offers
- `app/cart/page.tsx:10` — coupon defaults to `"VEDA10"`; `applied` defaults to `true`. Discount = flat 10% of subtotal, computed client-side.
- `app/checkout/page.tsx` — same 10% `VEDA10` math duplicated; no server validation, no stacking rules, no expiry.
- `app/product/[slug]/ProductClient.tsx:56` — “UPI: Pay ₹809” is a hardcoded string (only correct for ₹899 items).
- Bundle prices (`₹1,499 vs ₹2,499`, `₹1,425` combo) in `app/page.tsx` are static copy.
- Needed: pricing service, coupon validation API, tax/shipping rules, UPI price computation per SKU.

## 4. Cart persistence
- `lib/store/cart.tsx:27,35` — cart lives only in `localStorage` key `veda-cart-v1`. No merge with server cart, no cross-device sync, no inventory reservation.
- Needed: server cart + reconciliation on login.

## 5. User / account (all fictional)
- `app/checkout/page.tsx:51` — `Aarav Sharma · +91 98765 43210`, address `Flat 402, Vrindavan Heights, Indiranagar, Bengaluru — 560038`.
- `app/account/page.tsx:8,17` — same persona plus `Pitta-Vata Predominant`, `Gold Tier · 1,240 Ojas ≈ ₹124`, metrics `04 / 02 / 01`.
- No auth: `/account` renders for everyone; “Retake Prakriti” / tier / redeem flows don’t exist.
- Needed: auth (OTP), profile API, Prakriti assessment service, loyalty ledger.

## 6. Orders & shipment tracking (all fictional)
- Order `#VN-88492`, BlueDart AWB `#BLUEDART-8829401`, dates `21 Oct / 22 Oct / Fri 24 Oct 7 PM` appear in `app/checkout/page.tsx:21`, `app/track/page.tsx:8`, `app/account/page.tsx:17`.
- Timeline events (Packed → Dispatched → Hub → Out for delivery → COD collection) in `app/track/page.tsx` are static JSX.
- Needed: OMS integration, carrier webhooks, real AWB + status events.

## 7. Checkout & delivery checks (non-functional controls)
- `app/product/[slug]/ProductClient.tsx:81` — pincode defaults to `560001`; **Verify** button does nothing; “Free delivery · COD · Friday” line is static.
- `app/checkout/page.tsx` — **Change** (address), **View Breakdown**, delivery-date copy are static; Prepaid mode is a disabled placeholder (“enabling soon”); **Place Order** only flips local `placed` state, writes no order.
- Needed: address book API, pincode serviceability API, shipping-rate API, payment gateway (UPI/cards/COD confirmation), order-create API + OTP verify.

## 8. Editorial / trust content (static copy from designs)
- `app/page.tsx` — social proof `4.9/5 · 48,000+ patrons`, concern counts (`Nirogi Gut 14`…), bundle stock `42 left`, founder credentials/quotes, testimonials, doctor endorsements, journal teasers, 4 FAQs, newsletter `40,000+` claim.
- `app/about/page.tsx` — metrics (`16,000+ ft`, `0.0% heavy metals`…), founder quote, four pillars.
- `app/science/page.tsx` — 3 fellows, benchmarks (`40+ Yrs`, `12 trials`).
- `app/journal/page.tsx`, `app/journal/[slug]/page.tsx` — article list + synergy article body are hand-written stubs.
- Needed: CMS for articles/doctors/testimonials/FAQs, reviewed-date workflow, Prakriti quiz route (currently only a dead CTA chip).

## 9. Forms that go nowhere
- Home support form collects email + phone (+91, 10-digit) with a local success state only — no ESP/API call, no persistence.
- WhatsApp float links to placeholder `wa.me/919876543210` — replace with the real care number.
- Needed: support-ticket / newsletter provider (e.g. double opt-in), validation + toast.

## 10. Contact / legal / meta placeholders
- `components/SiteFooter.tsx:39-42,48` — `care@vedanaturals.in`, `© 2024`, shipping/returns one-liners, `Schedule E(1)` footer.
- `app/layout.tsx` — title/description are generic; no OG tags, no JSON-LD, no sitemap/robots, no analytics/consent.
- Favicon is still the Next.js default (`app/favicon.ico`).
- Needed: real support channels, legal pages, SEO bundle, brand favicon + OG art.

## 11. Brand assets & fonts delivery
- Logo is text (`SiteHeader.tsx:28` — “Veda Naturals” in Playfair); no SVG/wordmark file.
- Icons are Material Symbols loaded via Google Fonts `<link>` in `app/layout.tsx:35` (this is the one `next lint` warning: `no-page-custom-font`). No offline fallback.
- Needed: logo kit, self-hosted fonts (or `next/font` + icon subset), icon audit.

## 12. What was deliberately left out
- Original design-export image URLs (`lh3.googleusercontent.com/aida-public/…`) — never copied; replace with licensed/compressed assets.
- Admin suite (`Desktop/veda_naturals_admin_*`, `Mobile/ops_dashboard_*`) — not built in this storefront-first pass.
- `flash_sale` countdown/stock bar, `order_fulfillment_dispatch` console — designs exist, no route yet.

## Done — real imagery wired (`public/images/`, from `ClientWork/images/`)
- [x] Hero → `hero-apothecary.png` · banner → `bundle-ritual.png` · doctor → `doctor-portrait.png`
- [x] Articles → apothecary / `article-synergy.png` / `article-ojas.png`
- [x] All 12 product slots + detail gallery + cart thumbs → shared `product-shared.png` (per request, no per-SKU shots)
- [ ] Still open: ~2MB PNGs — compress to WebP when convenient; favicon + OG art still default

## Suggested replacement order (remaining)
2. Catalog + pricing/coupon APIs (§2, §3).
3. Auth + cart sync + account (§4, §5).
4. Checkout + orders + tracking (§6, §7).
5. CMS content + newsletter + SEO (§8, §9, §10).

## Addendum — admin panel (mock data, replace with OMS/PIM/CRM/CMS)
- `lib/data/admin.ts` — all admin figures are transcribed mocks: dashboard KPIs (₹28,45,290 revenue, 2,842 orders…), 8 orders (#VN-8950…#VN-8943), 9 stock rows (SKUs, batches, hubs), 8 patrons, 6 categories, 6 articles, dispatch queue (#VN-88492…).
- Drawers/buttons (Approve Dispatch, Confirm stock adjust, Save Changes, Publish…) only flip local state; nothing persists server-side.
- Storefront lives in `app/(store)/`; admin in `app/admin/` with its own navy shell — no storefront header/footer bleed.
- Dispatch console (`order_fulfillment_dispatch` design) is now `/admin/fulfillment`; ops KPIs folded into its header cards.

## Addendum — telehealth retheme (visual only, no logic changed)
- Theme swapped from Ayurvedic botanical (forest `#1b5e20`, cream `#fdf9f1`, gold `#d4af37`, arches) to premium telehealth tokens in `app/globals.css`: navy `#17233D` primary, plum `#6D3F68` + coral `#E99587` accents, mist blue `#9BBBD8`, bg `#FCFAF8`/`#F5F3F1`.
- Body font is now Inter (`app/layout.tsx`); headings stay Playfair Display. Material Symbols now load via CSS `@import` (lint warning resolved).
- New reusable decorations in `components/decorations/`: `BackgroundOrb`, `PulseLine`, `MedicalPlus`, `SectionDecoration` — CSS/SVG only, no new dependencies.
- Botanical arch panels replaced with 18–22px clinical cards + halo/ring treatments. All cart/checkout/account/order mock data unchanged.
