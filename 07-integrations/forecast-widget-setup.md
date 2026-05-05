# Live Surf Forecast Widget — Setup Instructions

> Goal: embed a live, auto-updating wave/wind forecast at the top of every weekly post,
> so the forecast section shows real-time data without you writing it manually each week.

---

## The Recommended Tool: Windy.com

After researching Israeli-friendly forecast options:

| Tool | Free? | RTL/Hebrew? | Embed? | Verdict |
|---|---|---|---|---|
| **Windy.com** | ✅ | English UI but visual data is universal | ✅ Free iframe | ✅ **Use this** |
| Windguru | ✅ | English | ✅ Embed widget | OK fallback, less visual |
| Surfline | 💰 Paid | English | Limited | Skip |
| Magicseaweed | ❌ Closed (acquired by Surfline) | — | — | Skip |
| Israeli surf-forecast.co.il | ✅ | Hebrew! | ❌ No embed | Use as your manual reference, but can't embed |

**Windy.com** wins because: free, beautiful visualization, supports any GPS coordinate (so you can pick exact spots like Hilton Beach, Ashdod, Tel Baruch), and the iframe code is plug-and-play.

---

## Step 1 — Pick a default surf spot

Most-used Israeli surf spots and their coordinates:

| Spot | Lat | Lng |
|---|---|---|
| **Hilton Beach, Tel Aviv** | 32.0917 | 34.7700 |
| Maravi, Tel Aviv | 32.0810 | 34.7680 |
| Bat Yam | 32.0125 | 34.7405 |
| Herzliya | 32.1700 | 34.7919 |
| Ashdod (Lighthouse) | 31.8000 | 34.6388 |
| Hadera | 32.4500 | 34.8800 |

Pick whichever is your "default" spot — the one you'd default to when nothing specific is happening. **Hilton Beach** is a safe pick because it's central, recognizable, and many readers in Tel Aviv area can relate.

---

## Step 2 — Generate the embed URL

The Windy.com embed URL pattern is:

```
https://embed.windy.com/embed2.html?lat={LAT}&lon={LNG}&zoom=11&level=surface&overlay=waves&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat={LAT}&detailLon={LNG}&metricWind=default&metricTemp=default&radarRange=-1
```

For **Hilton Beach (32.0917, 34.7700)** the URL becomes:

```
https://embed.windy.com/embed2.html?lat=32.0917&lon=34.7700&zoom=11&level=surface&overlay=waves&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=32.0917&detailLon=34.7700&metricWind=default&metricTemp=default&radarRange=-1
```

The key parameter is `overlay=waves` — this shows wave height. You can also use `wind` for wind speed/direction.

---

## Step 3 — Test it

Paste the URL above into your browser. You should see a live Windy.com map zoomed on Hilton Beach, with a waves overlay showing colored regions (blue = small, red = big).

---

## Step 4 — Tell me

Send me **either**:
- "Use Hilton Beach as default" → I'll wire the URL above into the template
- A different spot from the list → I'll generate the URL for it
- Custom coordinates → I'll generate the URL

I'll then update `01-templates/mobile-magazine-template.html` so the `{{windy_widget_html}}` placeholder gets replaced with:

```html
<iframe class="windy" src="https://embed.windy.com/embed2.html?...{LAT},{LNG}..." loading="lazy"></iframe>
```

That iframe sits inside the forecast card, **above** your manual forecast text. Readers see the live map AND your interpretation. Best of both.

---

## What This Gives You

- ✅ A live, always-current visual forecast at the top of every post
- ✅ Zero weekly maintenance (the widget self-updates)
- ✅ Your manual forecast text stays alongside as personal commentary
- ✅ Frees you from "what should I write for the forecast this week" decision fatigue

## What to Watch For

- The Windy iframe makes the page slightly heavier (~150KB extra). Acceptable for the value.
- If Windy ever changes their embed format, we'd need to update once. They've been stable since 2018.
- For super-detailed forecasts (swell direction, period), readers can click through to the full Windy site — the iframe has a "Full forecast" link.

---

## Bonus: Switch the spot per post

If a specific weekly post is themed around a specific beach (e.g., a trip to Ashdod), the agent can swap the spot just for that post — by passing a different `forecast_location` field in the weekly input file.

We'll add that as an optional field once the default works.
