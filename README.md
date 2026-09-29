# RUSH GRAFIKZ Storefront

Plain HTML/CSS/JS storefront. No build step, no framework, no Node needed to run it.
Products are listed in `products.json` — that's the only file you touch to add or
change a product.

## Run it locally

Just open `index.html` in a browser, or run a tiny local server:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`

## Push to GitHub (first time)

```
cd rushgrafikz-store
git add .
git commit -m "Initial storefront"
```

Then create an empty repo on github.com (no README, no .gitignore — you already have one),
copy the URL it gives you, and:

```
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Deploy (pick one — Cloudflare Pages, Vercel, or Netlify)

All three work the same way for this project since it's plain static files:

- Connect your GitHub account, pick this repo
- Framework preset: **None**
- Build command: **(leave empty)**
- Output directory: **/** (project root)
- Deploy

Every future `git push` auto-redeploys.

Cloudflare Pages is the pick if you want unlimited free bandwidth. Vercel/Netlify
work fine too and the setup steps are nearly identical.

## Swapping the mockup images for real ones

Right now every product image in `products.json` is a placeholder (a base64 SVG
with the product name on it) so the site works with zero setup. Before this goes
live for real customers:

1. Create a free ImageKit (or Cloudinary) account
2. Upload your real product photo, copy the URL it gives you
3. In `products.json`, replace that product's `"image"` value with the ImageKit URL
4. Commit and push — the live site updates automatically

Do **not** use Google Drive links for product photos on the storefront — Drive
isn't built for public hotlinking and will rate-limit or break. Keep Drive for
digital delivery links only (sending buyers their files after payment).

## Adding a new product

Open `products.json` and add an entry like this:

```json
{
  "id": "unique-id-01",
  "name": "Product Name",
  "category": "digital",
  "price": 199,
  "currency": "PHP",
  "description": "Short description buyers will see.",
  "delivery": "Google Drive link sent after payment confirmation",
  "image": "https://your-imagekit-url-here"
}
```

For physical products, use `"category": "physical"` and a `"shipping"` field
instead of `"delivery"`.

Save, commit, push. That's the whole workflow going forward — no code changes
needed to add products.

## Still to wire up

- The "Order this" button currently just shows an alert. Point it at your Tally
  order form link or a Facebook Messenger link inside `js/app.js` → `orderProduct()`.
- Facebook page reviews embed (mentioned in your notes) — add that as a widget
  in `index.html` when you're ready.
- Payment QR code image and instructions on the order form / checkout flow.
