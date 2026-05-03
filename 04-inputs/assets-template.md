# assets-template.md

> Where to keep recurring images, logos, and reference assets.
> The goal: don't make Dor re-upload the same logo every week.

---

## Always Available (no upload needed)

| Asset | URL |
|---|---|
| Chasing Fun logo (footer) | `https://chasingfun.co.il/wp-content/uploads/2026/03/Final-Logo-01-3.png` |

These are baked into the templates. Don't reference them in the weekly input.

---

## Per-Post Assets (Dor provides each week)

| Slot | When required | Format |
|---|---|---|
| Forecast image | Optional. If provided, sits inside the forecast card. | URL, ideally hosted (chasingfun.co.il, Cloudinary, Drive public link, etc.) |
| Wave-specific images | Optional. Up to one image per wave. | URL |
| Open Graph (`og:image`) | Auto: forecast image if present, else logo. Override allowed. | URL |
| Video for Wave #5 | Required if Wave #5 is video-led. | YouTube or Instagram URL |

---

## Where to Host Images

In order of preference:

1. **WordPress media library** (`chasingfun.co.il/wp-content/uploads/...`) — if Dor still uses it
2. **Google Drive** with public sharing — works but URL is ugly
3. **Direct upload to GitHub** — possible but a hassle every week
4. **Cloudinary / imgur** — if Dor sets up a free account

**Recommended:** keep WordPress media library for image hosting only, even though we left WordPress for publishing. Image URLs are stable and forever.

---

## Recurring Stock Images (Future)

If/when Dor wants to maintain a stock library:

- Folder on Google Drive: *(to be defined)*
- Naming convention: `cf_{topic}_{aspect}_{n}.jpg` — e.g., `cf_lineup_landscape_03.jpg`
- The agent reads this folder if a wave has no specific image and a stock fallback is appropriate

For now: not implemented. Each weekly post uses only what Dor sends in.

---

## What the Agent NEVER Does With Assets

- Doesn't upload images itself (no permission, and we want Dor to control hosting)
- Doesn't hotlink to Instagram CDN (URLs expire)
- Doesn't reduce image quality or resize without asking
- Doesn't insert stock images Dor didn't mention
