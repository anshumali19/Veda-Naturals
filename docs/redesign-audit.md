# Redesign Audit — Veda Naturals (Phase 0)

Date: 2026-10-09. Read-only discovery. No code changed.

## 1. Framework & tooling
- Next.js 16.4.0 (App Router) + React 19 + TypeScript, npm. Turbopack dev/build.
- `cacheComponents: true`, `partialPrefetching: true` in `next.config.ts`.
- No test runner, no CI, **no git repo** (branching/committing per the brief is not possible until one is initialised).

## 2. Styling system & tokens
- Tailwind CSS v4. No `tailwind.config`; all tokens live in `app/globals.css` `@theme`.
- Actual navy values found:
  - `--color-primary: #17233D` · `--color-primary-light: #25365C` · `--color-primary-dark: #0D162A`
  - `--color-plum: #6D3F68` · `--color-plum-light: #9B6A95`
  - `--color-coral: #E99587` · `--color-coral-light: #F7C7BF`
  - `--color-mist: #9BBBD8` · `--color-mist-light: #DCEAF5`
  - `--color-bg: #FCFAF8` · `--color-bg-secondary: #F5F3F1`
  - `--color-text: #172033` · `--color-text-secondary: #667085` · `--color-text-muted: #98A2B3`
  - `--color-border: #E8E5E2` · `--color-success: #3D8B68` · `--color-success-bg: #E6F4EC` · `--color-danger: #D95C5C`
- No hardcoded hex in components except `#25D366` (WhatsApp brand) and tint literals in one data array.
- ⚠️ Conflict with brief §0: `success` green (#3D8B68) is used for check icons, trust ticks, "COD available" ticks, status pills (Delivered/Healthy), form success. Brief bans green icons/badges. Proposal: keep green ONLY for true success semantics in admin/data contexts, or remap to navy/mist — needs your call (see placeholders doc).

## 3. Fonts
- Playfair Display (headings, `--font-display`) + Inter (body, `--font-sans`) via `next/font/google` — self-hosted, `display: swap` with fallbacks. Serif requirement already satisfied; no new font needed.
- Material Symbols Outlined via Google Fonts `<link>` (icon ligatures).

## 4. Routes
- Store: `/`, `/shop` (`?concern=`, `?q=`), `/product/[slug]` (12 slugs), `/cart`, `/checkout`, `/about`, `/science`, `/journal`, `/journal/[slug]`, `/track`, `/account`
- Admin: `/admin`, `/admin/orders`, `/admin/products`, `/admin/customers`, `/admin/categories`, `/admin/blog`, `/admin/fulfillment`
- All static/mock; no auth-gated routes exist.

## 5. Data flow (no backend)
- No API calls anywhere. `lib/data/products.ts` (12 SKUs), `lib/data/admin.ts` (orders/stock/patrons/articles).
- Cart: React context + localStorage (`veda-cart-v1`), no server merge. No auth. Checkout conferment is local `useState`. Shop search syncs from URL params. Newsletter/support/WhatsApp submit nowhere (WhatsApp opens placeholder `wa.me/919876543210`).
- Consequence for brief §9: ratings, review counts, customer counts, testimonials, doctor bios are all mock/placeholder (listed in `docs/placeholders.md`).

## 6. Components to upgrade (not replace)
- `SiteHeader` (announcement strip, nav, search, cart count, mobile menu), `SiteFooter`, `ProductCard`, FAQ block + support form (home), `WhatsAppFloat`, `AdminShell`, `components/admin.tsx` (`Pill`, `PageHeader`).
- Primitives to build in Phase 1: `Section`/`Container`/`SectionHeader`, `Button`, `Card`, `Badge`/`Eyebrow`/`IconCircle`, `Reveal` (CSS), `Accordion`.

## 7. Animation/carousel libraries
- None installed (no Framer Motion, Swiper, Embla). Only CSS keyframes (`orbFloat`, 9s). Decorations are CSS/SVG (`components/decorations/`: `BackgroundOrb`, `PulseLine`, `MedicalPlus`, `SectionDecoration`) + global `SiteWatermark` rings.
- Plan: hand-rolled carousel + IntersectionObserver/CSS `Reveal`. No new dependencies.

## 8. Image assets
- Existing `public/images/`: `hero-apothecary.png`, `product-shared.png` (reused ×12), `bundle-ritual.png`, `article-synergy.png`, `article-ojas.png`, `doctor-portrait.png` — all ~2MB PNGs, need WebP/AVIF conversion (brief §8).
- Supplied for this task (`ClientWork/iamges1/`, 6× `.webp`, not yet inspected pixel-level):
  - `Ancient_Herbal_Wellness_Homepage.webp`, `Natural_Ayurvedic_Still_Life_Banner.webp`, `Sunlit_Ayurvedic_Still_Life.webp`, `Sunlit_Herbal_Still_Life_with_Botanical_Elegance.webp`, `Sunlit_Herbal_Wellness_Still_Life_1.webp`, `Sunlit_Herbal_Wellness_Still_Life.webp`
  - Brief §4.2 expects 4 slide images; 6 supplied — surplus 2 can cover philosophy section + bundle banner. Final mapping in Phase 3 after viewing.

## 9. Mobile behavior & known issues
- Previously fixed: page-level horizontal overflow (ring clipping, strip truncation, `overflow-x: clip` guard), styled scrollbar, Suspense boundaries for `usePathname`/`useSearchParams` prerender.
- Hero stacks on mobile but is single-slide (no carousel yet). Concern cards 2-col mobile. Tables scroll internally on admin.

## 10. Conflicts with the brief
1. No git repo → cannot branch/commit; all work is unversioned until you init one.
2. No API/auth/reviews → "use real data" instructions degrade to placeholder documentation.
3. Content lives in `lib/data/`, not `src/content/`; propose keeping `lib/data/` + adding `lib/content.ts` for homepage copy.
4. Green `success` usage vs brief color ban (see §2) — decision needed.
5. Brief asks for practitioners section + philosophy section + preview nav — new content sections; copy must be placeholder-safe.
6. FAQ JSON-LD (§4.12): answers are marketing-draft, recommend skipping until you approve copy.
