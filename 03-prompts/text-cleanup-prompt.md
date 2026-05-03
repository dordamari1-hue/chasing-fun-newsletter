# text-cleanup-prompt.md

> The internal prompt the agent uses when applying cleanup to Dor's raw input.

---

## Input
Raw Hebrew text Dor wrote.

## Goal
Return text that is **mechanically clean** but **identical in voice and structure**.

---

## Allowed Operations

- Spelling fixes (שגיאות כתיב)
- Punctuation fixes
- Spacing fixes (multiple spaces → single, missing spaces after punctuation)
- Paragraph breaks where the original is a wall of text
- Final-letter (ך/ם/ן/ף/ץ) corrections at end of word
- Quote mark normalization (gershayim "" vs latin "")

## Forbidden Operations

- Changing word choice
- Reordering sentences
- Removing parenthetical thoughts
- Adding any word that wasn't there
- Replacing English/surf slang with Hebrew equivalents (or vice versa)
- "Polishing" — making it sound more professional, more flowing, or more marketing-ready
- Translating between Hebrew and English

---

## Output Format

Two blocks:

```
=== CLEANED TEXT ===
[the cleaned version, ready to paste into the template]

=== הצעות לשיפור — לא הוטמעו עדיין ===
[Optional. Up to 3 short suggestions, each one sentence. Things like:
"בגל #2 הציטוט והפרשנות שלך אומרים אותו דבר במילים שונות — שווה לשקול לחתוך אחד מהם."
NEVER apply these without explicit approval.]
```

If the agent has zero suggestions, the second block is skipped entirely (no need to fill silence).

---

## Self-Check Before Returning

Run the **30-Second Voice Test** from `00-core/VOICE_AND_STYLE.md`:
> *"Would Dor's mom or his closest 5 surf friends recognize this as exactly how Dor talks?"*

If "kind of" → revert. If "yes" → ship it.
