# Sikkim Tour and Travel: website

The static website for **Sikkim Tour and Travel** (https://sikkimtourandtravel.com): private Sikkim and Darjeeling tours, cabs and travel guides. It is built to turn search visitors into phone calls, WhatsApp chats and enquiries.

- Plain HTML5 + one CSS file + one ~7 KB JS file. No frameworks, no build step.
- **24 pages**, plus `sitemap.xml`, `robots.txt`, `.htaccess` (Apache/cPanel) and `_redirects` (Netlify).
- **Full strategy** (competitors, brand, keyword map, SEO, AI search, blog, social, 30/60/90-day roadmap, measurement): **[docs/strategy.md](docs/strategy.md)**

```
/index.html                 Home
/packages.html              All packages + comparison
/tour/*.html                6 tours (itinerary, prices, FAQ, form)
/destinations.html          Destination hub
/destinations/*.html        Gangtok, North Sikkim, Darjeeling, Pelling
/cab-service.html           Cab fares and booking  (delete if you don't sell standalone cabs)
/booking-policy.html        Booking, payment and cancellation terms
/blog.html, /blog/*.html    4 travel guides
/about.html  /contact.html  /thank-you.html  /404.html
/assets/css/style.css  /assets/js/main.js  /assets/img/
/sitemap.xml  /robots.txt  /.htaccess  /_redirects
/docs/strategy.md           Strategy (do NOT upload to the web host)
```

Links are root-relative (`/packages.html`), so the site must be served **from the domain root**. To preview locally, run `python3 -m http.server` in this folder and open http://localhost:8000.

---

## 1. Replace the placeholders

Anything I couldn't verify is written as `{{NAME}}`. Use Find & Replace across all files (VS Code: `Ctrl+Shift+H`), then search for `{{` to make sure none are left. **Never replace one with an invented value.** If you don't have something, delete that line instead.

### Business details
| Placeholder | What to put | Example format |
|---|---|---|
| `{{PHONE_DISPLAY}}` | Phone as shown | +91 98320 12345 |
| `{{PHONE_TEL}}` | Phone for `tel:` links, no spaces | `+919832012345` |
| `{{WHATSAPP_NUMBER}}` | wa.me number: country code, no `+`, no spaces | `919832012345` |
| `{{WHATSAPP_DISPLAY}}` | WhatsApp as shown | +91 98320 12345 |
| `{{EMAIL}}` | Enquiry email | info@sikkimtourandtravel.com |
| `{{ADDRESS_STREET}}`, `{{ADDRESS_CITY}}`, `{{ADDRESS_STATE}}`, `{{ADDRESS_PIN}}` | Office address, **exactly as on Google Business Profile** | |
| `{{GEO_LAT}}`, `{{GEO_LNG}}` | Office coordinates | 27.3314, 88.6138 |
| `{{GEO_REGION}}` | `IN-SK` (Sikkim) or `IN-WB` (Siliguri/Darjeeling) | |
| `{{OPENING_HOURS_TEXT}}` / `{{OPENING_HOURS_SCHEMA}}` | Hours as text / in schema format | Mon–Sun 8 am–9 pm / `Mo-Su 08:00-21:00` |
| `{{PRICE_RANGE}}` | Schema price indicator | `₹₹` |
| `{{YEARS_IN_BUSINESS}}`, `{{GUESTS_SERVED}}` | Real numbers only | 8 / 2,400+ |
| `{{REGISTRATION_DETAILS}}`, `{{REGISTRATION_SHORT}}`, `{{GSTIN}}`, `{{MEMBERSHIPS}}` | Registration line, short version, GST number, associations (or delete the line) | |
| `{{LANGUAGES_SPOKEN}}` | Languages your team actually speaks (contact page) | English, Hindi, Nepali and Bengali |
| `{{FOUNDER_STORY}}`, `{{TEAM_INTRO}}` | Short paragraphs for About | |
| `{{GBP_LINK}}` | Google Business Profile link | |
| `{{FACEBOOK_URL}}`, `{{INSTAGRAM_URL}}`, `{{YOUTUBE_URL}}` | Profile URLs. If you don't have one, **delete it from every `"sameAs"` list** | |
| `{{GOOGLE_MAP_EMBED_URL}}` | Google Maps → Share → Embed → `src` value; then un-comment the iframe in `contact.html` | |

### Tours, cabs and policy
- **Tour prices (60):** `{{PRICE_<CODE>_FROM}}` (**digits only**, e.g. `18500`; it also goes into schema) and `{{PRICE_<CODE>_<2|4|6>PAX_<3STAR|4STAR|DELUXE>}}`.
  Codes: `GD5` Gangtok & Darjeeling · `DPG6` Darjeeling–Pelling–Gangtok · `NS7` North Sikkim · `HM4` Honeymoon · `SR5` Silk Route · `GS9` Grand Sikkim.
- **Cab fares (21):** `{{FARE_<ROUTE>_<SEDAN|SUV|TEMPO>}}` for routes `IXB_GANGTOK`, `IXB_DARJEELING`, `IXB_KALIMPONG`, `IXB_PELLING`, `GANGTOK_DARJEELING`, `GANGTOK_LOCAL`, `TSOMGO_DAY`. Also `{{FARE_NOTES}}`, `{{FLEET_DETAILS}}` and `{{WAITING_POLICY}}`.
- **Booking policy:** `{{ADVANCE_PERCENT}}`, `{{BALANCE_DUE}}`, `{{PAYMENT_METHODS}}`, `{{CANCEL_SLAB_1..3_DAYS}}`, `{{CANCEL_SLAB_1..3_CHARGE}}`, `{{REFUND_DAYS}}`, `{{FORCE_MAJEURE_TERMS}}`, `{{CHILD_POLICY}}`, `{{POLICY_UPDATED_DATE}}`.
- **Reviews:** `{{REVIEW_1..3_NAME|CITY|TRIP|TEXT}}` on the home page. Use **real** Google reviews only, with the guest's permission. Delete unused cards. Never add `aggregateRating`.

### Technical
| Placeholder | What to put |
|---|---|
| `{{FORM_ENDPOINT}}` | Formspree (`https://formspree.io/f/xxxx`; honeypot `_gotcha` already set) or Web3Forms (`https://api.web3forms.com/submit` + add a hidden `access_key` input) or your own PHP script |
| `{{GA4_ID}}` / `{{GTM_ID}}` | Then remove the `<!-- -->` around the snippet in each page's `<head>` (use GA4 **or** GTM) |

### Check the copy matches your business
- **Cab service:** the home H1, menu, footer and `/cab-service.html` say you offer cabs. If you don't, delete the page and those links.
- **Free IXB/NJP pickup**, the **24x7 coordinator**, **honeymoon extras** (flower bed, cake, candlelight dinner) and the **inclusions** on each tour must match what you provide.
- **North Sikkim** notes describe closures since the 2023 Teesta floods. Update them as conditions change.

---

## 2. Photos
Every image slot already has a responsive `<picture>` (WebP + JPG, 600/1200 widths, width/height, lazy loading). The current files are labelled placeholders. Overwrite them with real photos **using the same file names**. The shot list, licence notes (Unsplash/Pexels) and compression steps are in [docs/strategy.md §4.6](docs/strategy.md).

For each base name you need: `name.jpg` + `name.webp` (1200×750) and `name-600.jpg` + `name-600.webp` (600×375). Also replace `og-default.jpg` (1200×630), `logo.png` (512²), `logo.svg`, `favicon.svg` and `apple-touch-icon.png` (180²).

---

## 3. Upload

**cPanel / Hostinger / GoDaddy**
1. Replace the placeholders first.
2. Upload everything **except** `README.md`, `docs/` and `_redirects` into `public_html`, keeping the folders. Make sure `.htaccess` is uploaded; it is a hidden file, so enable "show hidden files".
3. Turn on SSL (AutoSSL/Let's Encrypt). `.htaccess` then forces `https://sikkimtourandtravel.com` (no www), serves `404.html`, and 301-redirects the retired city URLs.

**Netlify**
Drag the folder into *Deploy manually* (or connect the repo, with no build command and publish directory `/`). `_redirects` handles the www→non-www and retired-URL redirects. Add the domain, then enable HTTPS.

**If the old site had other URLs:** list them (Search Console → Pages, or a `site:sikkimtourandtravel.com` search) and add a 301 for each to its closest new page in `.htaccess` / `_redirects` **before** switching over.

---

## 4. After launch
Follow the checklists and the 30/60/90-day plan in **[docs/strategy.md](docs/strategy.md)** (sections 7 and 11). The first five steps:
1. Google Business Profile: create and verify it, using the same name, address and phone as the site.
2. Google Search Console + Bing Webmaster Tools: verify the site and submit `https://sikkimtourandtravel.com/sitemap.xml`.
3. Rich Results Test on the home page, one tour, one destination and the cab page.
4. PageSpeed Insights (mobile) after adding real photos.
5. GA4: mark `generate_lead` and `lead_click` as key events.

---

## Technical notes
- **Critical CSS:** the block between `/* critical:start */` and `/* critical:end */` in `style.css` is also inlined in every page's `<head>`. Change both if you edit header, hero or bottom-bar styles.
- **Tracking:** every Call / WhatsApp / Enquire element has `data-track` + `data-track-location`. `main.js` pushes `lead_click` and `generate_lead` to GA4/GTM when enabled.
- **WhatsApp:** messages are pre-filled per page (e.g. "Hi, I'm interested in the North Sikkim – Lachung & Lachen 7N/8D package. Please share details.").
- **Structured data:** TravelAgency/LocalBusiness, Organization, WebSite, TouristTrip+Offer, TouristDestination, TaxiService, FAQPage, Article, Blog, ItemList, BreadcrumbList, ContactPage. No `aggregateRating`, on purpose.
- **Editing:** the header and footer are repeated in every file. Use Find & Replace across all pages to change a menu item.
