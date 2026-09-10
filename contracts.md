# Floenzy — Backend Integration Contracts

## Goal
Turn the frontend-only Floenzy site into a full-stack app supporting:
1. Working Cart + Checkout (orders persisted, stock decremented)
2. UK Postcode Water-Hardness checker with Floenzy recommendation
3. Subscription Refills (auto-ship filter cartridges at a saving)
4. Real backend for products/stock, reviews, orders, subscriptions

All backend routes are prefixed with `/api`. Frontend uses `REACT_APP_BACKEND_URL`.

## Data currently mocked (mock.js) — what stays vs moves to API
- STAYS in mock.js: all imagery (IMAGES, FLOENZY_PHOTOS, PRODUCT.images), static marketing copy (STAGES, BENEFITS, FAQS, STATS), NAV, AMAZON_URL.
- MOVES to API: product price/colours/stock, reviews list (+ create), orders, subscriptions, water-hardness.
- Frontend keeps mock as graceful fallback if API fails.

## MongoDB Collections
- products: { sku, name, price, currency, colours[], type }
- stock: { sku, colour, quantity }
- reviews: { id, name, location, rating, title, body, created_at }
- orders: { id, items[], subscription, customer, subtotal, discount, total, status, created_at }
- subscriptions: { id, sku, interval_months, price, discount_pct, customer, next_ship, created_at }

Seeded on startup if empty.

## API Endpoints
- GET  /api/catalog                -> { product, refill, plans, stock }
- GET  /api/reviews                -> [review]
- POST /api/reviews {name,rating,title,body,location?} -> review
- POST /api/orders {items:[{sku,colour,qty}], customer, subscription?} -> order (validates+decrements stock, computes total)
- GET  /api/orders/{id}            -> order
- POST /api/subscriptions {sku,interval_months,customer} -> subscription
- GET  /api/water-hardness/{postcode} -> { postcode, area, level, ppm, band, recommendation }

## Pricing (backend authoritative)
- SH001 (shower head): £55.00, colours Beige / Grey-red
- FILTER-REFILL (cartridge): £19.00
- Subscription plans: every 2 / 3 / 4 months; discounts 20% / 15% / 10%

## Water hardness
- Static lookup keyed by UK postcode AREA (leading letters). Returns level
  (Soft / Moderately Hard / Hard / Very Hard), ppm estimate, and a tailored
  Floenzy recommendation. Unknown areas -> Moderately Hard default.

## Frontend integration
- New: src/lib/api.js (axios client), src/context/CartContext.jsx (localStorage + provider),
  src/components/CartDrawer.jsx (Sheet), src/components/WaterChecker.jsx,
  src/pages/Checkout.jsx.
- Header: cart button with count -> opens drawer.
- Shop: fetch catalog + reviews from API; Add to bag -> cart; subscription selector;
  review submit form.
- The Water page: embed WaterChecker.
- App.js: wrap in CartProvider; add /checkout route; mount CartDrawer.
