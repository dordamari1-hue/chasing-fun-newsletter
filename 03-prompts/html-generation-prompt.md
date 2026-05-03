# html-generation-prompt.md

> The internal prompt the agent uses when assembling the weekly HTML page.

---

## Input
- Cleaned text per `text-cleanup-prompt.md`
- Dor's answers to: forecast image, video URL, dynamic CTA choice, special images
- Computed: `campaign_name`, `post_date`, `N`

## Goal
Produce a self-contained HTML file ready to drop into `site/posts/weekend-insights-{N}.html`.

---

## Steps

1. Load `01-templates/mobile-magazine-template.html`
2. Substitute every `{{placeholder}}`:
   - `{{post_title}}` → "תובנות לסופ״ש #{N}"
   - `{{post_meta_description}}` → first 1-2 sentences of Wave #1 (no quotes)
   - `{{og_image_url}}` → forecast image if present, else logo URL
   - `{{forecast_title}}`, `{{forecast_text}}`, `{{forecast_image_url}}` → from input
   - `{{wave_1_title}}` → can be auto-generated from first line of Wave #1 if Dor didn't supply one (subject to his approval)
   - `{{wave_1_body}}` through `{{wave_5_body}}` → wrapped in `<p>` tags, paragraph by paragraph
   - `{{wave_2_quote}}` → wrapped in the `<blockquote>` (already in template)
   - `{{video_embed_html}}` → an `<iframe>` if video URL provided, else empty string
   - `{{dynamic_cta_block}}` → the appropriate block from `01-templates/cta-blocks.html` with all sub-placeholders filled
   - `{{campaign_name}}` → `weekend_insights_{N}`, replaced GLOBALLY (every UTM uses it)
3. If forecast image isn't supplied, the Mustache-style `{{#forecast_image_url}}...{{/forecast_image_url}}` block must be removed cleanly (no broken `<img>` tag).
4. Validate:
   - All `{{...}}` markers are gone
   - Every `<a href>` has `utm_source`, `utm_medium`, `utm_campaign`
   - HTML parses (no unclosed tags)
5. Save to `05-outputs/drafts/weekend-insights-{N}.html`

---

## Wrapping Body Text in `<p>` Tags

When the cleaned text comes back as multi-paragraph, wrap each paragraph individually:

Input:
```
זה משפט ראשון.

זה משפט שני, פסקה חדשה.
```

Output:
```html
<p>זה משפט ראשון.</p>
<p>זה משפט שני, פסקה חדשה.</p>
```

---

## Video Embed Pattern

For YouTube:
```html
<iframe src="https://www.youtube.com/embed/{VIDEO_ID}" allowfullscreen></iframe>
```

For Instagram (no native embed via iframe — use a link card instead):
```html
<a class="btn dark" href="{INSTAGRAM_URL}" target="_blank" rel="noopener">צפו באינסטגרם</a>
```

If video URL is missing → leave `{{video_embed_html}}` empty.

---

## Common Pitfalls

- Forgetting to URL-encode Hebrew text in WhatsApp links → links break on Android
- Hard-coding `weekend_insights_5` instead of `{{campaign_name}}` → reuse breaks across posts
- Leaving `&` raw inside `href` (must be `&amp;` in HTML attributes)
