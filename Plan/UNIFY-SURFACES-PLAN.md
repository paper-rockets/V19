# Unify every menu / sheet / pop-up to the floating "glass" look

**For:** Antigravity + Gemini (or any coding agent) working in
`E:\X\AiStudio Workflow\V17-Minimal-V1-Backup`.

**Read this whole file before editing. Do the steps in order. Do not improvise.**

---

## 0. Plain-language goal

Right now the four Pro-mode panels (Select, Draw, Create, Deform) look "floating":
transparent, no card box, no border, no shadow — the controls just sit over the 3D
drawing. **Every other menu, sheet and pop-up** (Shape sheet, Reference Images,
Colour Studio, Armatures, Export, Skybox, Numpad, Layers, etc.) still looks like a
solid dark card. We want **all of them** to match the floating look — in both
**Simple (Play)** mode and **Pro** mode.

## 1. The one key idea (why past attempts failed)

The floating look is **not** written on each panel. It comes from **one CSS rule**
in `src/index.css` (`.paperrocket-pro-panel`). Trying to hand-edit the Tailwind
classes of ~25 components one by one **never stays consistent** — that is the trap.

**The correct method is exactly two steps:**

1. Add **one new CSS class** — `pr-surface` — to `src/index.css`. It does *all* the
   visual work (transparent card, strip nested boxes, quiet buttons, keep text
   readable). **The full CSS is written for you in Step 2 — paste it verbatim.**
2. In each surface component, add the single class name `pr-surface` to the
   **outermost card element**. Nothing else. No color edits, no restyling.

If something needs tweaking later, you change the **one** CSS rule and every surface
updates at once. Do **not** fix things by editing individual components.

---

## 2. STEP 1 — Add the shared style

Open `src/index.css`. **Append this entire block to the very end of the file.**
Do not modify anything else in the file. Paste exactly:

```css
/* =============================================================
   UNIFIED FLOATING SURFACE — one look for every menu, sheet,
   panel and pop-up (Play + Pro). A surface opts in by adding the
   class `pr-surface` to its outermost card element. ALL visual
   work happens here; components only add that one class.
   ============================================================= */

/* 1 · The card itself stops being a card and floats. */
.pr-surface{
  background:transparent !important;
  border-color:transparent !important;
  box-shadow:none !important;
  backdrop-filter:none !important;
  -webkit-backdrop-filter:none !important;
}

/* 2 · Nested wrappers inside it lose their fills and boxes too.
       Container elements only — never buttons, inputs or swatches. */
.pr-surface :is(div,section,aside,header,footer,nav,ul,ol,li,dl):is(
  [class*="bg-white"],[class*="bg-black"],[class*="bg-neutral"],
  [class*="bg-zinc"],[class*="bg-slate"],[class*="bg-gray"],
  [class*="bg-stone"],[class*="bg-[#"]
){
  background:transparent !important;
  box-shadow:none !important;
}

/* soften inner divider borders into hairlines instead of hard edges */
.pr-surface :is(div,section,aside,header,footer,nav)[class*="border"]{
  border-color:rgb(255 255 255 / .12) !important;
}
html.light .pr-surface :is(div,section,aside,header,footer,nav)[class*="border"],
.pr-surface[data-theme="light"] :is(div,section,aside,header,footer,nav)[class*="border"]{
  border-color:rgb(17 24 39 / .14) !important;
}

/* 3 · Keep text readable over the live 3D canvas (dark is the default). */
.pr-surface :is(h1,h2,h3,h4,h5,p,span,label,a,li,dt,dd,button){
  text-shadow:0 1px 2px rgb(0 0 0 / .60);
}
html.light .pr-surface :is(h1,h2,h3,h4,h5,p,span,label,a,li,dt,dd,button),
.pr-surface[data-theme="light"] :is(h1,h2,h3,h4,h5,p,span,label,a,li,dt,dd,button){
  text-shadow:0 1px 1px rgb(255 255 255 / .85);
}

/* 4 · Buttons: quiet ghost by default, accent tint when active.
       This mirrors the exact convention the whole app already uses. */
.pr-surface button{ border-radius:9px !important; box-shadow:none !important; }

/* dark theme — inactive buttons */
html:not(.light) .pr-surface button[class~="bg-black/30"],
html:not(.light) .pr-surface button[class~="bg-neutral-900"],
html:not(.light) .pr-surface button[class~="bg-neutral-800"]{
  background:transparent !important;
  border-color:rgb(255 255 255 / .14) !important;
}
/* dark theme — active button */
html:not(.light) .pr-surface button[class~="bg-white"]{
  color:rgb(224 247 255) !important;
  background:rgb(56 189 248 / .14) !important;
  border-color:rgb(56 189 248 / .72) !important;
}
/* light theme — inactive buttons */
html.light .pr-surface button[class~="bg-white"],
html.light .pr-surface button[class~="bg-neutral-100"]{
  color:rgb(55 65 81) !important;
  background:transparent !important;
  border-color:rgb(17 24 39 / .15) !important;
}
/* light theme — active button */
html.light .pr-surface button[class~="bg-neutral-900"]{
  color:rgb(12 74 96) !important;
  background:rgb(14 165 233 / .14) !important;
  border-color:rgb(2 132 199 / .80) !important;
  font-weight:700 !important;
}

/* 5 · Sliders keep the studio accent. */
.pr-surface input[type="range"]{ accent-color:rgb(56 189 248); }
```

> Why this works: it reproduces the values already proven on `.paperrocket-pro-panel`,
> but keys off one opt-in class instead of a fixed DOM depth, so it works on any
> surface regardless of its internal structure. Theme is detected from `html.light`
> / `html.dark` (set on `<html>` by `App.tsx`), which every surface lives under.

---

## 3. STEP 2 — Add `pr-surface` to each surface's root

### How to find the right element (the rule)

In each file below, find the **outermost card element** and prepend `pr-surface ` to
its `className`. The card is the element whose class list contains **all of**:

- a solid background — one of `bg-white`, `bg-[#18191d]`, `bg-neutral-900`, `bg-zinc-900`, or a custom `bg-[#…]`, **and**
- rounded corners — a `rounded-…` class, **and**
- usually a `shadow…` and/or `border…`.

**Do NOT tag a full-screen dimmer / backdrop** — that is the element with
`fixed inset-0` plus a translucent fill like `bg-black/40`, `bg-black/60`. Leave the
backdrop exactly as it is; only the inner card gets `pr-surface`.

If a component has an `inline` prop and renders two root variants (a floating panel
**and** an embedded one), add `pr-surface` to **both** root variants.

These files use template-literal classNames. Insert the class into the **static
leading part**, e.g.:

```tsx
// before
className={`fixed left-0 right-0 bottom-0 … ${isLight ? 'bg-white …' : 'bg-[#18191d] …'}`}
// after
className={`pr-surface fixed left-0 right-0 bottom-0 … ${isLight ? 'bg-white …' : 'bg-[#18191d] …'}`}
```

A quick way to locate the root line in a file:

```bash
rg -n "rounded-(2xl|3xl|t-3xl|xl)" src/components/<File>.tsx
```

### 3a. Two worked examples (do these exactly)

**`src/components/play/PlaySheet.tsx`** — this ONE file is the shell for every Play
bottom sheet (Shape, Magic, Colours, Sizes, Brushes, Preferences), so tagging it
converts all six at once. Find the root `<div role="dialog" …>`:

```tsx
className={`paperrocket-play-sheet fixed left-0 right-0 bottom-0 …`}
```
→ prepend `pr-surface `:
```tsx
className={`pr-surface paperrocket-play-sheet fixed left-0 right-0 bottom-0 …`}
```

**`src/components/LayerPanel.tsx`** — the root `<div>` uses an `inline ? … : …`
background. Prepend `pr-surface ` to that root `<div>`'s className template so **both**
the inline and the modal forms float. (Bonus: this also makes the **Layers** Pro
panel match the other four, fixing the one panel that is still solid today.)

### 3b. Full file list to tag (one `pr-surface` per surface root)

**Simple (Play) mode**
- [ ] `src/components/play/PlaySheet.tsx`  ← example above (covers 6 sheets)
- [ ] `src/components/play/Toybox.tsx`
- [ ] `src/components/play/PlayImporter.tsx`
- [ ] `src/components/play/FirstRunOverlay.tsx`

**Shared modals & panels (used by Pro, some by Simple)**
- [ ] `src/components/ColorStudioModal.tsx`
- [ ] `src/components/ModelConverterModal.tsx`
- [ ] `src/components/ModelLibraryModal.tsx`
- [ ] `src/components/ExportModal.tsx`
- [ ] `src/components/IlluminationStudioModal.tsx`
- [ ] `src/components/SkyEnvironmentPanel.tsx`
- [ ] `src/components/RenderSettingsPanel.tsx`
- [ ] `src/components/BrushSettingsPanel.tsx`
- [ ] `src/components/RaycastSettingsModal.tsx`
- [ ] `src/components/CurveDecimateModal.tsx`
- [ ] `src/components/BentGuideModal.tsx`
- [ ] `src/components/CustomMirrorModal.tsx`
- [ ] `src/components/ARViewerModal.tsx`
- [ ] `src/components/NumpadModal.tsx`
- [ ] `src/components/HolisticDNAInspector.tsx`
- [ ] `src/components/FloatingReferenceClipboard.tsx`
- [ ] `src/components/ScaffoldingModal.tsx`
- [ ] `src/components/ModelDisplayPanel.tsx`
- [ ] `src/components/LiquifyPanel.tsx`
- [ ] `src/components/LayerPanel.tsx`  ← example above (both variants)

**Already correct — do NOT touch:** `src/components/pro/ProPanel.tsx` and the four
panels it hosts (Select / Draw / Create / Deform) already float via
`.paperrocket-pro-panel`.

**Intentionally skipped** (they are not cards, or are momentary): `PlayTopStrip`,
`PlayDock`, the navigator wheel / Transform Navigator / camera pod (they already
float and have no card), and the transient toasts (`AutoSaveToast`,
`CameraRecoveryPill`, gesture HUD) — making those see-through would hurt legibility.
Convert them later only if explicitly wanted.

---

## 4. Guardrails — the mistakes to avoid

1. **Do not** change colors, backgrounds, borders, or any other class on the
   components. The **only** edit per file is inserting the word `pr-surface`.
2. **Do not** edit `src/index.css` beyond appending the Step-1 block once.
3. **Do not** tag a backdrop/dimmer (`fixed inset-0 … bg-black/NN`). Only the card.
4. **Do not** remove or reorder existing class names.
5. Leave color swatches, previews, and semantic buttons (e.g. red delete) alone —
   the CSS already avoids them (swatches use inline `style`, not `bg-` classes).
6. One class, one place, per file. If unsure which element is the root, it is the
   element directly **inside** the backdrop, or the single top-level returned element
   when there is no backdrop.

## 5. Backdrops (design decision — keep as-is)

Modals that dim the screen behind them (Colour Studio, Converter, etc.) **keep** their
dim backdrop; only their **card** becomes transparent, so the content floats over the
dim. This is intended. (If a fully see-through-over-the-drawing look is wanted later,
that is a separate change to the backdrop elements — not part of this task.)

## 6. Verify

```bash
npm install   # if needed
npm run dev    # Vite on http://localhost:3000
```

Then, in **both** dark and light theme (Settings → Studio Theme), open and eyeball:

- Simple mode: **Shape** sheet, **Reference Images**, **Import**, **Toybox**.
- Pro mode: **Colour Studio** (all tabs), **Converter**, **Skybox**, **Armatures**
  (Scaffolding), **Export**, **Numpad**, **Layers**.

Each should now be **transparent / floating** with readable text, quiet buttons, and
the active button showing the sky-blue accent — matching the Select/Draw/Create/Deform
panels. Check that:

- text stays readable over a busy drawing (that's the `text-shadow`);
- active vs inactive buttons are still distinguishable;
- colour swatches still show their real colours;
- the **Numpad** keys are still comfortably tappable (if it feels too faint, that is
  the only surface that may deserve a per-surface exception — see Step 7).

## 7. If one surface needs an exception

Because everything keys off `pr-surface`, exceptions stay centralized. To make (say)
the Numpad slightly more opaque, add ONE rule to the same CSS block, e.g.:

```css
/* keep the numpad keypad a touch more solid for tap accuracy */
.pr-surface.pr-surface--solid{ background:rgb(10 12 16 / .55) !important; }
```
…and add `pr-surface pr-surface--solid` on just that root. Do not scatter fixes into
components.

## 8. Rollback

This is a backup folder. To undo everything: delete the appended CSS block in
`src/index.css` and remove the `pr-surface` tokens (they are inert without the CSS).
No logic was changed, so nothing else is affected.
