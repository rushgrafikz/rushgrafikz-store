# RUSH GRAFIKZ Storefront

This is a single self-contained `index.html` (your original build: cart drawer, quick-view
modals with image galleries, search, bundles, terms checkbox) with real product photos
living in `assets/images/` instead of base64 embedded in the file.

## Run it locally

Open `index.html` in a browser, or:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`

## Push updates to GitHub

```
git add .
git commit -m "Update storefront"
git push
```

Cloudflare Pages auto-redeploys on every push, live at rushgrafikz-store.pages.dev.

## Adding or changing a product

Since this file doesn't use a separate data file, a product lives in **two places**
in `index.html` — keep them in sync:

1. **The card in the page** — find the `.card` (individual designs) or `.phy-card`
   (physical products) block with the product's name, and edit the name, price, and
   image path (`src="assets/images/your-file.jpg"`).
2. **The `PRODUCTS` array** — search for `const PRODUCTS = [` near the bottom of the
   file. Each entry needs `name`, `price`, `inclusions` (the bullet list shown in the
   quick-view popup), and `imgs` (array of image paths — this is what the gallery/zoom
   view shows when someone taps a product).

To add a new product photo: drop the image file into `assets/images/`, reference it
by that filename in both spots above, commit, push.

## Images

77 real product photos live in `assets/images/` (about 13MB total). These are served
directly by Cloudflare Pages, no separate image host needed for now. If load times
start feeling slow on mobile data as the catalog grows, that's the point to move to
ImageKit or similar for automatic compression, not before.

Do not hotlink product images from Google Drive. Keep Drive for digital delivery
links only (sending buyers their files after payment).

## Still not wired up

- **Checkout**: the cart currently just lists item names client-side, nothing submits
  anywhere yet. Needs a real checkout flow (your notes mention a Tally form + manual
  QR payment + proof upload).
- **Physical products page**: still has 3 placeholder sample items (tumbler, keychain,
  mug), marked "Sample layout — real products go here next" in the code. Swap these
  for your actual physical product lineup the same way as the digital products above.
- **About page**: placeholder, waiting on your brand story/copy.
- **Reviews page**: placeholder, waiting on your Facebook reviews to embed.
