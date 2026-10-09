# Retheme TODO — Telehealth (navy/plum/coral) + Admin Panel

Progress: storefront retheme **done** (build + lint clean, 10/10 routes 200).
Remaining: **admin panel** (not yet built in `webapp/`) + final polish.

## Done — design system
- [x] Token swap in `app/globals.css` (navy `#17233D` primary, plum/coral accents, mist blue, `#FCFAF8` bg)
- [x] Section spacing (`.section/.section-sm/.section-lg`, `.container-x` + mobile rules)
- [x] Button system (`.btn-primary/.btn-secondary/.btn-accent`)
- [x] Card system (`.card`, `.condition-card`, `.product-card`, `.testimonial-card`, `.article-card`, `.faq-item`, `.support-card`)
- [x] Body font Inter + Playfair headings (`app/layout.tsx`); fonts via CSS import (lint clean)
- [x] Reduced-motion guard; animations 7–12s only
- [x] No new dependencies; CSS/SVG decorations only

## Done — decorations (`components/decorations/`)
- [x] `BackgroundOrb` (plum/coral/blue × sm/md/lg + float)
- [x] `PulseLine` (inline SVG)
- [x] `MedicalPlus` (1–3 per section)
- [x] `SectionDecoration` (hero/default/minimal)
- [x] Rings (`ring-1/2/3`), doctor halo, steps connector, dark footer rings
- [ ] `MedicalPattern` (from spec §3 — not built; only needed if sections look empty)

## Done — storefront pages
- [x] Header/nav + footer (dark `footer-dark`)
- [x] `/` hero, trust row, concerns, products, dark banner, steps, doctor, testimonials, articles, FAQ + support card
- [x] `/shop`, `/product/[slug]`, `/cart`, `/checkout` (style only; logic untouched)
- [x] `/about`, `/science`, `/journal`, `/journal/[slug]`, `/track`, `/account`
- [x] `AgeGate` rethemed
- [x] Zero old-theme classes left (grep verified)

## Done — admin panel (new routes, new theme, mock data)
Designs from `designs/Desktop/veda_naturals_admin_*` + `designs/Mobile/ops_dashboard_*`, `order_fulfillment_dispatch_*`. Mock dataset in `lib/data/admin.ts`.
- [x] `/admin` layout: dark navy sidebar, topbar, admin route group (`app/admin/layout.tsx` + `components/AdminShell.tsx`; storefront moved to `app/(store)/`)
- [x] `/admin` dashboard (KPIs, revenue SVG, donut, live orders, top formulations, alerts)
- [x] `/admin/orders` (tabs, search, table + inspection drawer)
- [x] `/admin/products` (KPI banner, tabs, search, stock table, hubs, adjust drawer)
- [x] `/admin/customers` (KPIs, ledger + 360° inspector)
- [x] `/admin/categories` (tree + inspector form)
- [x] `/admin/blog` (KPIs, directory + SEO inspector)
- [x] `/admin/fulfillment` (dispatch queue + carrier slot + batch actions; ops KPIs folded in)
- [x] Admin tables/cards use `.card` + new tokens; no botanical/arch styling
- [x] Verify: build + lint + all admin routes 200

## Done — FAQ color + global watermark
- [x] FAQ items: numbered icon badges (plum/coral/success/mist), open-state border + shadow, rotating chevron chip
- [x] Support form: email + phone (+91, 10-digit) with success state (still mock — no backend)
- [x] `components/SiteWatermark.tsx`: fixed concentric ring watermark on every page (store + admin), pointer-events-none, z-0

## TODO — final polish
- [ ] Real imagery replaces arch/icon placeholders (see `REPLACEMENTS.md` §1)
- [ ] Trust-badge / stat / timeline extras extracted to shared components if reused in admin
- [ ] Full-site visual pass (spacing rhythm, mobile 390px check per section)
