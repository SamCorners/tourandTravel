# Sikkim & Darjeeling Tour Website

A static lead-generation website for a Himalayan tour operator. It is aimed at travellers from South India and built to get phone calls and WhatsApp enquiries from Google search.

- Plain HTML5 + one CSS file + one small JS file (about 7 KB). No frameworks, no build step.
- 21 pages, plus `sitemap.xml`, `robots.txt` and placeholder images.
- Root-relative links (`/packages.html`). The site must run **from the domain root**, not from a sub-folder. Preview it with a local server (for example `python3 -m http.server`), not by double-clicking the files.

```
/index.html                          Home
/packages.html                       All packages + comparison table
/tour/*.html                         6 tour pages (itinerary, prices, FAQ, form)
/sikkim-tour-package-from-*.html     City landing pages (Chennai, Bangalore, Hyderabad)
/darjeeling-tour-package-from-south-india.html
/blog.html, /blog/*.html             Travel guide (4 articles)
/about.html, /contact.html, /thank-you.html, /404.html
/assets/css/style.css                All styles (light + dark mode)
/assets/js/main.js                   Mobile nav, smooth scroll, form validation, click tracking
/assets/img/                         Placeholder photos, logo, favicon
/sitemap.xml, /robots.txt
```

---

## 1. Before you upload: replace the placeholders

Every value I didn't have is written as `{{NAME}}`. Use your editor's **Find & Replace in all files** (VS Code: `Ctrl+Shift+H`) across the whole folder. To check that nothing is left afterwards, search for `{{`.

### Business details

| Placeholder | What to put | Example format |
|---|---|---|
| `{{COMPANY_NAME}}` | Your company name | Himalayan Trails Pvt Ltd |
| `{{TAGLINE}}` | Short line under the logo | Sikkim & Darjeeling specialists since 2016 |
| `{{DOMAIN}}` | Full domain, **no trailing slash** | `https://www.yourdomain.com` |
| `{{PHONE_DISPLAY}}` | Phone number as shown to visitors | +91 98320 12345 |
| `{{PHONE_TEL}}` | Same number for `tel:` links, no spaces | `+919832012345` |
| `{{WHATSAPP_NUMBER}}` | WhatsApp number for wa.me links: country code, no `+`, no spaces | `919832012345` |
| `{{WHATSAPP_DISPLAY}}` | WhatsApp number as shown | +91 98320 12345 |
| `{{EMAIL}}` | Enquiry email | info@yourdomain.com |
| `{{ADDRESS_STREET}}` | Street / building | 2nd Floor, ABC Building, NH-10 |
| `{{ADDRESS_CITY}}` | City | Gangtok |
| `{{ADDRESS_STATE}}` | State | Sikkim |
| `{{ADDRESS_PIN}}` | PIN code | 737101 |
| `{{GEO_LAT}}` / `{{GEO_LNG}}` | Office coordinates (right-click the pin in Google Maps) | 27.3314 / 88.6138 |
| `{{GEO_REGION}}` | ISO region code for the contact page geo tag | `IN-SK` (Sikkim) or `IN-WB` (Siliguri / Darjeeling) |
| `{{OPENING_HOURS_TEXT}}` | Hours as shown on the site | Mon–Sun, 8 am – 9 pm |
| `{{OPENING_HOURS_SCHEMA}}` | Same hours in schema format | `Mo-Su 08:00-21:00` |
| `{{PRICE_RANGE}}` | Schema price indicator | `₹₹` |
| `{{YEARS_IN_BUSINESS}}` | Number only | 8 |
| `{{GUESTS_SERVED}}` | Number shown in the trust strip | 2,400+ |
| `{{REGISTRATION_DETAILS}}` | Full registration line | Registered with Sikkim Tourism & Civil Aviation Dept., Reg. No. XXXX |
| `{{REGISTRATION_SHORT}}` | Short version for the trust strip | Sikkim Tourism registered |
| `{{GSTIN}}` | GST number | 11ABCDE1234F1Z5 |
| `{{MEMBERSHIPS}}` | IATO / TAAI / TAAS etc., or delete the line on `about.html` | Member, TAAS |
| `{{FOUNDER_STORY}}` | 2–4 sentences on who started the company and why (about.html) | |
| `{{TEAM_INTRO}}` | A short paragraph about the team (about.html) | |
| `{{GBP_LINK}}` | Google Business Profile / Maps link | `https://maps.app.goo.gl/...` |
| `{{FACEBOOK_URL}}`, `{{INSTAGRAM_URL}}`, `{{YOUTUBE_URL}}` | Social profiles | If you don't have one, **delete that line from every `"sameAs"` list** in the JSON-LD; don't leave a placeholder |
| `{{GOOGLE_MAP_EMBED_URL}}` | Google Maps → Share → Embed a map → copy only the `src` value. Then un-comment the `<iframe>` in `contact.html` | |

### Technical

| Placeholder | What to put |
|---|---|
| `{{FORM_ENDPOINT}}` | The URL your form posts to. See section 3. |
| `{{GA4_ID}}` | GA4 Measurement ID `G-XXXXXXXXXX`. Then remove the `<!--` `-->` around the snippet in every page's `<head>`. |
| `{{GTM_ID}}` | Only if you use Google Tag Manager instead of plain GA4 (use one or the other). |

### Prices (61 placeholders)

- `{{PRICE_<CODE>_FROM}}`: the "starting from" price shown on cards, tour heroes and in the `Offer` schema. Use **digits only** (`18500`, not `18,500`) because the same value goes into the schema.
- `{{PRICE_<CODE>_<2|4|6>PAX_<3STAR|4STAR|DELUXE>}}`: the 9 cells of each tour's price table (commas are fine here).

| Code | Tour |
|---|---|
| `GD5` | Gangtok & Darjeeling 5N/6D |
| `DPG6` | Darjeeling, Pelling & Gangtok 6N/7D |
| `NS7` | North Sikkim – Lachung & Lachen 7N/8D |
| `HM4` | Sikkim Honeymoon 4N/5D |
| `SR5` | Silk Route – Zuluk 5N/6D |
| `GS9` | Grand Sikkim & Kalimpong 9N/10D |

Example: `{{PRICE_NS7_4PAX_DELUXE}}` is North Sikkim, 4 adults, Deluxe hotels.

### Reviews

`{{REVIEW_1_NAME}}`, `{{REVIEW_1_CITY}}`, `{{REVIEW_1_TRIP}}`, `{{REVIEW_1_TEXT}}` (and `_2_`, `_3_`) are on the home page. Copy **real** reviews from your Google Business Profile (ask the guest first). If you have fewer than 3, delete the extra `<figure class="quote">` blocks. **Never** add invented reviews or `aggregateRating` schema.

### Things to check while replacing

- **Language support.** The site says Tamil, Telugu, Kannada and Malayalam coordinators are on call. If you can't offer all four, edit that text (search for `Malayalam`) and the `knowsLanguage` / `availableLanguage` schema lists.
- **Honeymoon extras** (flower bed, cake, candlelight dinner) and **inclusions** in general: make sure they match what you actually provide.
- **North Sikkim status.** The text says honestly that Lachen / Gurudongmar access has been disrupted since the 2023 Teesta floods. Update it when the situation changes.
- **Flight information** is written in hedged terms ("direct on some days"). Review it each season.

---

## 2. Replace the photos

Every photo slot already has a real `<picture>` tag (WebP + JPG, two sizes, `width`/`height`, lazy loading). For now each one shows a labelled placeholder image. To add a real photo, **overwrite the files with the same names**:

| File (in `/assets/img/`) | Photo to use |
|---|---|
| `tsomgo-lake-gangtok` | Tsomgo Lake with snow |
| `pelling-kanchenjunga-view` | Kanchenjunga from Pelling |
| `gurudongmar-lake-north-sikkim` | Gurudongmar Lake |
| `yumthang-valley-lachung` | Yumthang Valley |
| `yumthang-valley-rhododendron` | Yumthang in flower |
| `zuluk-silk-route-loops` | Zuluk zig-zag road |
| `ravangla-buddha-park` | Buddha Park, Ravangla |
| `gangtok-mg-marg-evening` | MG Marg at evening |
| `namchi-char-dham` | Char Dham, Namchi |
| `darjeeling-toy-train-batasia` | Toy train at Batasia Loop |
| `kanchenjunga-tiger-hill-sunrise` | Tiger Hill sunrise |
| `bagdogra-to-gangtok-teesta-road` | Teesta road |
| `nathula-pass-sikkim` | Nathula Pass |
| `south-indian-breakfast-gangtok-hotel` | South Indian breakfast at a hotel |
| `tsomgo-lake-winter-family` | Your guests at Tsomgo (with permission) |
| `team-office` | Your team / office |

For each one, save **4 files**: `name.jpg` and `name.webp` at **1200×750**, plus `name-600.jpg` and `name-600.webp` at **600×375**. Keep each file under about 150 KB; [Squoosh](https://squoosh.app) does both formats for free. Use your own photos or properly licensed ones. Real photos of your guests and vehicles build far more trust than stock images.

Also replace `og-default.jpg` (1200×630, the image used when a page is shared on WhatsApp or Facebook), and `logo.png` (512×512), `logo.svg`, `favicon.svg` and `apple-touch-icon.png` (180×180) with your real logo.

If you change a photo's **subject**, also update its `alt` text in the HTML.

---

## 3. Connect the enquiry form

Every form posts to `{{FORM_ENDPOINT}}`. Until you replace it, the form shows "Form endpoint not set up yet" and nothing is sent. Pick one service:

**Formspree** (simplest)
1. Create a form at formspree.io and copy the endpoint (`https://formspree.io/f/xxxxxxx`).
2. Replace `{{FORM_ENDPOINT}}` with it.
3. The honeypot field is already named `_gotcha`, which is Formspree's own spam trap.

**Web3Forms** (free, no account limits on submissions)
1. Get an access key at web3forms.com.
2. Replace `{{FORM_ENDPOINT}}` with `https://api.web3forms.com/submit`.
3. Inside each `<form>`, add `<input type="hidden" name="access_key" value="YOUR_KEY">`. The `redirect` field is already there.

**Your own PHP mail script** (cPanel / Hostinger)
Point the endpoint to e.g. `/send.php`. The script should email the fields and return HTTP 200 (with JSON `Accept`) or redirect to `/thank-you.html`. Reject any request where `_gotcha` is not empty.

How submission works: `main.js` validates the form (10-digit Indian mobile starting 6–9; optional email; future travel date), sends it with `fetch`, then goes to `/thank-you.html`. Without JavaScript it falls back to a normal POST, using the `redirect` / `_next` hidden fields.

Fields sent: `name, phone, email, city, travel_date, package, adults, children, message, form_source` (the page the enquiry came from).

---

## 4. Upload the site

### Shared hosting (cPanel, Hostinger, GoDaddy)
1. Replace the placeholders first (section 1).
2. Open **File Manager** and go to `public_html` (the domain's root folder).
3. Upload **everything in this folder except `README.md`**, keeping the folder structure (`assets/`, `tour/`, `blog/`). Uploading a zip and using "Extract" is fastest.
4. Make the 404 page work: in cPanel → *Error Pages*, or add this line to `.htaccess` in `public_html`:
   ```
   ErrorDocument 404 /404.html
   ```
5. Turn on free SSL (AutoSSL / Let's Encrypt) and force HTTPS. Make sure `www` and non-`www` both redirect to the same version as `{{DOMAIN}}`.

### Netlify
1. Log in at app.netlify.com → *Add new site* → *Deploy manually*, then drag this folder in. Or connect the Git repository (no build command, publish directory `/`).
2. *Domain settings*: add your domain and enable HTTPS.
3. Netlify serves `404.html` automatically.

---

## 5. Post-launch SEO checklist

**Week 1**
- [ ] Search the whole site for `{{`. Nothing should be left.
- [ ] **Google Search Console**: add a *Domain* property, verify through DNS, then go to *Sitemaps* and submit `https://www.yourdomain.com/sitemap.xml`.
- [ ] Use *URL Inspection* → *Request indexing* on the home page, the 4 city pages and the 6 tour pages.
- [ ] **Bing Webmaster Tools**: import directly from Search Console (one click) and submit the sitemap. This also covers Yahoo and DuckDuckGo.
- [ ] **Rich Results Test** (search.google.com/test/rich-results): test the home, a tour, a blog post and the contact page. Fix any errors. Also run validator.schema.org. Note: Google now shows FAQ rich results mainly for government and health sites, so your FAQ markup is still valid but may not show as dropdowns in search.
- [ ] **PageSpeed Insights** (pagespeed.web.dev): test the home page and one tour page on *Mobile* after adding real photos. Target 90+. If performance drops, compress the photos further.
- [ ] Enable GA4 (or GTM). Mark `generate_lead` and `lead_click` as **key events (conversions)**.

**Google Business Profile (most important for calls)**
- [ ] Create or claim the profile at business.google.com. Category: **Tour operator**; secondary: *Travel agency*.
- [ ] Use exactly the same name, address and phone as on the website (NAP consistency).
- [ ] Add the website URL, WhatsApp, opening hours, service areas (Sikkim, Darjeeling) and a description that mentions South Indian travellers.
- [ ] Upload 20+ real photos: office, team, vehicles, guests on tours, hotels.
- [ ] Add each package under *Products / Services* with a link to its tour page.
- [ ] After every trip, send guests a review link. Reply to every review.
- [ ] Post a Google update every week (offers, snow updates, road status).
- [ ] Put the GBP link into `{{GBP_LINK}}`.

**Local citations (same name, address and phone on each)**
- [ ] Justdial, Sulekha, IndiaMART, TradeIndia
- [ ] TripAdvisor (as a tour operator), Holidify / Thrillophilia / TravelTriangle supplier listings
- [ ] Bing Places, Apple Business Connect
- [ ] Facebook page, Instagram business profile, YouTube channel (short trip videos)
- [ ] Sikkim Tourism / Darjeeling tourism association listings, TAAS (Travel Agents Association of Sikkim) member directory if you are a member

**Ongoing**
- [ ] Each month in Search Console → *Performance*, look at queries with impressions but few clicks, and improve those pages' titles and descriptions.
- [ ] Update prices and the North Sikkim road-status note every season.
- [ ] Publish 3–4 blog posts a month (calendar below). Link each one to 1–2 tour pages and one city page.

---

## 6. Blog content calendar: next 3 months

| # | Month | Title (target keyword) | Link to |
|---|---|---|---|
| 1 | Month 1 | Sikkim in December & January: Snow Guide for South Indian Families | Gangtok Darjeeling 5N/6D, Honeymoon |
| 2 | Month 1 | Gangtok Sightseeing: 15 Places and How to Plan Them in 2 Days | Gangtok Darjeeling 5N/6D |
| 3 | Month 1 | Packing List for Sikkim from Chennai / Bengaluru (Kids & Seniors) | City pages |
| 4 | Month 1 | Nathula Pass Tour from Gangtok: Permit, Timings, Cost | Permit guide, all Gangtok tours |
| 5 | Month 2 | Sikkim Honeymoon Itinerary: 5, 6 and 7-Day Plans | Sikkim Honeymoon 4N/5D |
| 6 | Month 2 | Altitude Sickness in Sikkim: Tsomgo, Nathula, Gurudongmar – Who Should Avoid | North Sikkim 7N/8D |
| 7 | Month 2 | Darjeeling Toy Train Joy Ride: Booking, Timings, Steam vs Diesel | Darjeeling page |
| 8 | Month 3 | Sikkim Tour with Senior Citizens: A Comfortable 7-Day Plan | Grand Sikkim, DPG 6N/7D |
| 9 | Month 3 | Silk Route (Zuluk) Travel Guide: Permits, Homestays, Best Season | Silk Route 5N/6D |
| 10 | Month 3 | Sikkim in April–May: Summer Vacation Guide from Hyderabad & Bengaluru | Hyderabad + Bengaluru pages |

---

## 7. The first 5 pages to build backlinks to

1. **`/sikkim-tour-package-from-chennai.html`**: the largest South Indian source market, with lower competition than the generic "sikkim tour package" terms. Get links from Chennai travel groups and blogs, Tamil travel YouTubers' descriptions, and Quora answers.
2. **`/sikkim-tour-package-from-bangalore.html`**: Bengaluru has the best flight links, so the most people are searching. Target Bengaluru travel and IT-community blogs, Reddit r/bangalore travel threads (helpful answers, not spam) and corporate offsite directories.
3. **`/` (home page)**: brand links from citations, GBP, association listings, newspaper or local news mentions and supplier listings all build overall domain authority.
4. **`/tour/north-sikkim-lachung-lachen-7n8d.html`**: "north sikkim tour package" has strong commercial intent. Earn links by sharing honest road-status updates that bloggers and forums will cite.
5. **`/blog/sikkim-permit-guide-indian-tourists.html`**: the most "linkable" page. Travel bloggers and forums link to clear permit explainers, and its authority then passes to the tour pages through internal links.

Good backlink sources: guest posts on Indian travel blogs, local South Indian news and lifestyle sites, college alumni and IV tour coordinators (for the Darjeeling page), hotel partners' websites ("our travel partner"), and helpful answers in Facebook groups for Chennai, Bengaluru and Hyderabad travellers. Avoid paid link packages and PBNs.

---

## Technical notes

- **Critical CSS**: the block between `/* critical:start */` and `/* critical:end */` in `style.css` is also inlined in each page's `<head>`. The full stylesheet then loads without blocking rendering. If you change header, hero or bottom-bar styles, update both places.
- **Fonts**: Fraunces (headings) and Source Sans 3 (body) from Google Fonts, loaded non-blocking with `display=swap`. System fallbacks are Georgia and system-ui.
- **Dark mode**: automatic via `prefers-color-scheme`. All colours are CSS custom properties in `:root`.
- **Click tracking**: every Call / WhatsApp / Enquire link has `data-track` and `data-track-location`. `main.js` sends a `lead_click` event to GA4 / GTM when enabled.
- **WhatsApp messages**: prefilled per page, e.g. "Hi, I'm interested in the North Sikkim – Lachung & Lachen 7N/8D package. Please share details."
- **Structured data**: TravelAgency + LocalBusiness (home, contact), Organization with logo (home), TouristTrip with Offer (tours), FAQPage (pages with FAQs), Article (blog posts), BreadcrumbList (all inner pages). There is no `aggregateRating`, on purpose.
- **Editing pages**: each page is a standalone HTML file. The header, footer and bottom bar are repeated in every file, so if you change one (e.g. add a menu item), make the same change in all 21 pages with Find & Replace.
