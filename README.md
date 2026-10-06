# RUSH GRAFIKZ Storefront

Static site: `index.html` (catalog, cart drawer, quick view galleries, search, bundles)
plus `checkout.html` (same header, embeds the Tally checkout form). Product photos live
in `assets/images/`. Hosted free on Cloudflare Pages, live at rushgrafikz-store.pages.dev.

## Run it locally

```
python3 -m http.server 8000
```

then visit `http://localhost:8000` (opening `index.html` directly also works).

## Push updates

Double-click `fix-and-push.bat` (pulls first, then pushes), or:

```
git add .
git commit -m "Add <product name> (<ID>)"
git push
```

Cloudflare Pages redeploys on every push, usually within a minute.

## How an order flows

1. Buyer adds items to the cart (stored in the browser as `rg_cart`).
2. "Proceed to checkout" opens `checkout.html` with the order prefilled in the URL:
   Order Ref, Order Type, Items, Digital Item IDs, subtotals, Shipping, Pay Now,
   Delivery Method.
3. `checkout.html` passes those into the embedded Tally form (`VL2MYy`), where the buyer
   adds name, contact, address and payment proof.
4. Tally sends the submission to the **Orders** table in the Airtable base
   "RG Crafts Inventory". The Digital Item IDs match **Products → Product ID**, which
   holds each item's Drive link for delivery.

## Adding a digital product (do all of these or the cart breaks)

IDs follow `DIG-BDG-###` (badges), `DIG-STK-###` (stickers), `DIG-LRN-###` (learning),
`DIG-MOR-###` (More Templates). Use the next number.

1. **Image**: drop it into `assets/images/`. Keep it at most 1200px wide and under
   ~300KB (Squoosh.app, JPEG quality 75). Use a simple lowercase name like
   `img-product-name-1.jpg`. Never put raw mockups or source files in this folder:
   everything here is public, and Cloudflare rejects any single file over 25MB.
2. **Card** in `index.html`: copy an existing `.card` in the right grid. Set
   `data-name`, the image, name, price, inclusions preview,
   `onclick="openQuick(N)"` and `addToCart('YOUR-ID')`.
3. **`const PRODUCTS = [`**: add an entry with `id`, `name`, `price`, `inclusions`,
   `imgs`. **Append it at the end.** `N` in step 2 is its position in this array
   (first entry is 0). Inserting in the middle shifts every card after it.
4. **`const CATALOG = {`**: add `"YOUR-ID": {"name": ..., "price": 60, "type": "digital"}`.
   Price here is a plain number and must match the card.
5. **Airtable Products**: new row with the same Product ID, name, price, Kind, and Drive
   Link (folder shared as "Anyone with the link").
6. **Bundles**: if the product is part of a bundle, update the bundle's
   "Tap to see all N designs" text and add the files to that bundle's Drive folder.

Then push and test once on the live site: add to cart, proceed to checkout, confirm
the item shows up in the Tally form.

## Physical products

Physical cards use `.phy-card` and `type: "physical"` in CATALOG (quantity selector,
shipping applies). Shipping fees are in `const SHIPPING` in `index.html`.

## Images

Product photos are served straight from Cloudflare Pages. Do not hotlink from Google
Drive; Drive is for delivery links only.

## Still to do

- **Physical products**: the 3 sample items (tumbler, keychain, mug) are placeholders
  but still addable to the cart. Replace or hide before promoting the shop.
- **Shipping fees**: `SHIPPING` is pickup 0, Maxim 80, J&T 150 flat. The plan is Maxim
  paid by buyer to the rider, J&T by zone (Mindanao, Visayas, Luzon). Align before
  taking physical orders.
- **About**: placeholder, waiting on brand story copy.
- **Reviews**: placeholder, waiting on Facebook reviews.
