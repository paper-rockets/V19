# V19 UI Redesign and Repair — Implementation Plan

## Instructions for Gemini or another implementation agent

Implement this plan only in:

`E:\X\AiStudio Workflow\V19`

Read `E:\X\AiStudio Workflow\V19\AI_RULES.md` before changing anything and follow it exactly.

- Work directly in V19. Do not create a branch, worktree, duplicate, or experimental copy.
- Do not edit any other version or folder.
- Preserve existing 3D editing functionality while simplifying and repairing the interface.
- Implement the work in the phases below. Do not attempt a single global CSS-only rewrite.
- Run `npm run lint` and `npm run build` after every major phase.
- Use the existing Selenium audit scripts and add the functional checks listed under Validation.
- Do not follow `E:\X\AiStudio Workflow\V19\Plan\UNIFY-SURFACES-PLAN.md`. It is outdated, refers to a different V17 folder, and cannot address the functional defects in this plan.

---

## 1. Goal

Keep the first viewport extremely minimal and canvas-focused. Use the slim left rail and compact contextual panels from the supplied moodboard as the primary direction for the regular/Pro interface. Retain Play mode as the simpler interface, but make Play and Pro feel like two levels of the same product rather than two unrelated designs.

This work includes visual cleanup, information-architecture changes, interaction repairs, and engine-level lighting fixes.

## 2. Target interface

### Desktop

- A 48px left tool rail.
- A 280–300px contextual panel beside the rail.
- The canvas remains the dominant surface.
- Only one contextual menu or transient popover should be open at a time.

### Tablet

- Preserve the left rail when space allows.
- Cap contextual panels below half the viewport width.
- Collapse the bottom color/brush dock when horizontal space is limited.

### Phone

- Present contextual controls as bottom sheets rather than narrow panels covering the canvas.
- Respect safe-area insets.
- Keep every essential control reachable without horizontal scrolling.

### Visual system

- Dark surface: near-opaque neutral charcoal.
- Light surface: warm, quiet off-white that maintains strong text contrast.
- 16px panel corners and subtle hairline borders.
- Avoid backdrop blur over the live 3D canvas.
- Use 16px outer panel padding, 12px between sections, and 8px between related controls.
- Use cyan only for selection and active states.
- Reserve amber for illumination controls.
- Avoid nested cards. Use section headings, spacing, and separators for hierarchy.
- Maintain a minimum 44px interactive target.

## 3. Confirmed causes in the current code

1. Pro import is broken because `PlayImporter` is mounted only inside the Play-mode render branch in `E:\X\AiStudio Workflow\V19\src\App.tsx`, although the Pro Create panel tries to open it.
2. The Studio Light icon is independently rendered in both `PlayTopStrip` and `ProRail`, which produces the duplicated sun in Pro mode.
3. `E:\X\AiStudio Workflow\V19\src\index.css` explicitly removes the left padding from `.paperrocket-pro-content` and leaves only 5px on the right.
4. The Layers blend menu is absolutely positioned inside a clipped, scrollable panel.
5. The landscape Play dock and its popovers contain hard-coded dark colors instead of using the shared light/dark theme.
6. The default drawing canvas in `studioEngine.ts` uses `THREE.MeshBasicMaterial`, which does not respond to scene lights.
7. The model converter uses `82vw`, `max-w-5xl`, and `86vh`, making it much larger than the task requires.
8. V19 has overlapping generations of `.paperrocket-pro-panel` and `.pr-surface` CSS. Broad descendant selectors are overriding component-level decisions and contributing to inconsistent results.

## 4. Phase 1 — Shared surface foundation

### Files

- `E:\X\AiStudio Workflow\V19\src\index.css`
- `E:\X\AiStudio Workflow\V19\src\utils\themeStyles.ts`
- Add a reusable dismissible-surface hook under `E:\X\AiStudio Workflow\V19\src`
- Add shared surface, close-button, and icon-button components under `E:\X\AiStudio Workflow\V19\src\components`

### Work

1. Consolidate menu colors, borders, radii, shadow, spacing, and scrollbar values into explicit shared tokens.
2. Remove the brittle DOM-depth rules that style elements using selectors such as `.paperrocket-pro-content > div > div`.
3. Stop using one broad `.pr-surface` descendant rule to erase fills from arbitrary nested elements.
4. Introduce explicit surface variants:
   - contextual panel;
   - compact popover;
   - task dialog;
   - bottom sheet;
   - persistent toolbar.
5. Add a standard 40×40 close button using one Lucide icon, stroke width, hover state, and accessible label.
6. Add a `studio-scroll` treatment with a transparent track, narrow rounded thumb, stable gutter, and adequate content padding.
7. Establish a documented layer order for canvas, toolbar, panels, popovers, dialogs, and critical overlays.

### Dismissal behavior

Create one reusable hook or surface behavior that provides:

- outside-pointer dismissal;
- Escape dismissal;
- focus restoration to the opener;
- protection against dismissing when the pointer is inside the surface;
- suppression of the first canvas pointer event used to dismiss a menu, so closing a menu does not paint a dot;
- cleanup of global listeners on unmount.

### Acceptance

- A panel has equal left and right padding.
- Scrollbars do not touch content.
- All standard close icons are centered and render identically.
- The first canvas click closes a transient surface without drawing.

## 5. Phase 2 — Navigation and surface ownership

### Files

- `E:\X\AiStudio Workflow\V19\src\App.tsx`
- `E:\X\AiStudio Workflow\V19\src\components\play\sheetStore.ts`
- `E:\X\AiStudio Workflow\V19\src\components\play\PlayTopStrip.tsx`
- `E:\X\AiStudio Workflow\V19\src\components\play\PlayDock.tsx`
- `E:\X\AiStudio Workflow\V19\src\components\pro\ProPanel.tsx`
- `E:\X\AiStudio Workflow\V19\src\components\pro\ProRail.tsx`

### Work

1. Make the Pro rail the sole owner of the Studio Light icon in Pro mode.
2. Show Studio Light in the top strip only in Play mode.
3. Make opening a new panel or popover close the previous transient surface.
4. Keep modal task flows separate from contextual panel state, but close their originating popover when the modal opens.
5. Apply outside-click behavior to Pro panels and the local popovers inside `PlayDock`.
6. Rebuild the bottom color/size/brush dock from the shared surface and theme tokens. Remove hard-coded dark colors.
7. Keep the bottom dock visually subordinate to the canvas and consistent with the left rail.

### Acceptance

- Exactly one sun icon is shown after switching between Play and Pro repeatedly.
- Color, size, brush, settings, and Pro panels close when the canvas is clicked.
- Light-mode bottom controls no longer remain dark unless that contrast is an intentional, documented design decision.

## 6. Phase 3 — Simplify Select, Draw, Create, and Deform

### Select

File: `E:\X\AiStudio Workflow\V19\src\components\pro\SelectPanel.tsx`

Default view:

- Pointer and Lasso selection.
- Target selector.
- Common transform actions.
- Clone, ground, and delete actions.

Move into collapsed sections:

- numeric position, rotation, and scale editing;
- sampling density;
- surface offset;
- seam bridging;
- double-sided surfaces;
- manual normal recalculation;
- less frequently used lock and falloff options.

Use plain names such as “Transform details” and “Advanced snapping.” Preserve every existing function.

### Draw and Brushes

Files:

- `E:\X\AiStudio Workflow\V19\src\components\pro\DrawPanel.tsx`
- `E:\X\AiStudio Workflow\V19\src\presets\curatedBrushes.ts`

Work:

1. Use the existing brush image assets consistently instead of mixing them with abstract line icons.
2. Normalize tool-card height, icon size, label placement, and gaps.
3. Rename visible labels for clarity while keeping internal IDs stable. Suggested labels:
   - Clay → Soft Clay
   - Build → Add Volume
   - Move → Drag Surface
   - Inflate → Expand
   - Pinch → Sharpen
   - Crease → Carve Crease
4. Rename “Clay Size” to “Brush size.” Show the selected brush name as secondary information.
5. Use thumbnails, concise labels, and optional tooltips instead of long text descriptions.
6. Keep essential size and strength controls visible. Place advanced stroke profile, surface finish, smoothing, and pattern controls behind progressive disclosure.

### Create

Files:

- `E:\X\AiStudio Workflow\V19\src\components\pro\CreatePanel.tsx`
- `E:\X\AiStudio Workflow\V19\src\components\play\PlayImporter.tsx`
- `E:\X\AiStudio Workflow\V19\src\App.tsx`

Work:

1. Mount the importer outside the Play-only branch so it can be opened from either interface.
2. Consider renaming `PlayImporter` to a neutral shared name only if that can be done without a risky broad refactor.
3. Close the Create contextual panel after opening the importer.
4. Preserve imported-file validation, model preview, fine-tuning, and converter handoff.

Acceptance: “Import 3D Model File” opens the real file workflow in both Play and Pro.

### Deform

File: `E:\X\AiStudio Workflow\V19\src\components\pro\DeformPanel.tsx`

Default view should present four clear actions:

- Push/Pull
- Guides
- Mirror
- Simplify

Remove repeated explanatory paragraphs from the initial view. Reveal detailed settings only after the related action is selected.

## 7. Phase 4 — Layers, dialogs, and session hierarchy

### Layers

File: `E:\X\AiStudio Workflow\V19\src\components\LayerPanel.tsx`

1. Render blend and tag menus through `createPortal` with viewport-aware positioning, or use a well-styled accessible native select where appropriate.
2. Do not render expanding menus inside an `overflow-y-auto` clipping boundary.
3. Close menus on outside click, Escape, layer selection, or panel close.
4. Give menu content a solid readable surface even when the parent panel is translucent.

Acceptance: no blending or tag menu clips into another layer or outside the panel.

### Preferences

File: `E:\X\AiStudio Workflow\V19\src\components\play\PlaySettingsSheet.tsx`

- Desktop target width: approximately 360px.
- Keep essential Studio and Scene controls visible.
- Keep storage, diagnostics, export, and advanced navigation inside “More settings.”
- Maintain the same structure and width in light and dark themes.

### Model importer and converter

Files:

- `E:\X\AiStudio Workflow\V19\src\components\play\PlayImporter.tsx`
- `E:\X\AiStudio Workflow\V19\src\components\ModelConverterModal.tsx`

Targets:

- Importer: approximately 560px maximum desktop width.
- Converter: approximately 720–760px maximum desktop width.
- Phone: near-full-width sheet with safe margins.
- Keep converter functions divided into tabs rather than displaying multiple dense columns simultaneously.
- Use the standard close-button component.

### Project/session hierarchy

Files:

- `E:\X\AiStudio Workflow\V19\src\components\play\PlayTopStrip.tsx`
- `E:\X\AiStudio Workflow\V19\src\components\ProjectSessionModal.tsx`

1. Consolidate Quick Save, Open Project, Manage Sessions, and Export under one Project/File menu in the top strip.
2. Keep Load contextual to each saved session.
3. Make the entire saved-session row selectable or place Load in a consistent row action area.
4. Keep delete secondary and visually quiet.
5. Preserve `.remix3d` import/export functionality.

## 8. Phase 5 — Shader browser

### File

`E:\X\AiStudio Workflow\V19\src\components\CompactColorStudioModal.tsx`

### Work

1. Replace the “More shaders” text-only select with a scrollable thumbnail grid.
2. Reuse `preset.url` when a material preview asset already exists.
3. For shader-only entries without an image, provide a deterministic preview sphere or swatch rendered from the preset.
4. Lazy-load previews so opening the shader tab does not stall the main viewport.
5. Each card should include:
   - preview;
   - short visible name;
   - selected state;
   - full name in tooltip or accessible description.
6. Preserve the existing Brush/Model target selector.

### Acceptance

- Every shader can be visually distinguished before selection.
- Selecting a thumbnail applies the same preset that the old text list applied.

## 9. Phase 6 — Lighting behavior

### Files

- `E:\X\AiStudio Workflow\V19\src\components\SimpleSceneIlluminationModal.tsx`
- `E:\X\AiStudio Workflow\V19\src\core\studioEngine.ts`
- Review model-material setup in `E:\X\AiStudio Workflow\V19\src\core\modelLoader.ts`

### Work

1. Audit the material used by the active target before assuming scene lights can affect it.
2. `MeshBasicMaterial`, MatCap materials, and many custom shader materials ignore scene lights. Do not report a lighting change as successful merely because light-object values changed.
3. Make the default scene provide a visibly lit target. Evaluate converting the default drawing plane to an appropriate lit paper material or providing another non-distracting lighting reference without damaging drawing behavior.
4. Ensure clay and standard model modes use light-responsive materials.
5. For custom shaders, either route the light direction/color into supported uniforms or clearly indicate that the material is unlit.
6. Store current lighting state in the engine. The modal should edit engine state rather than resetting a complete preset on unrelated re-renders.
7. Confirm `markDirty()` produces a rendered frame after every lighting change.
8. Verify these independently:
   - preset;
   - direction;
   - intensity;
   - softness;
   - light color;
   - floor shadow;
   - grid visibility.

### Acceptance

- Changing intensity produces a clearly measurable brightness change on a lit model.
- Moving the light produces a visible highlight/shadow-direction change.
- Presets are visually distinct.
- The UI does not imply that unsupported unlit materials should react.

## 10. Validation

### Required commands

Run after each major phase and again at the end:

```powershell
npm run lint
npm run build
```

### Automated browser checks

Extend the Selenium audits under `E:\X\AiStudio Workflow\V19\scripts` to verify:

1. Outside canvas click closes each transient panel.
2. The dismissal click does not create a stroke.
3. Pro mode opens the importer.
4. Mode switching never creates two visible sun icons.
5. Layers menus remain within the viewport and do not clip.
6. Preferences and the converter respect their maximum sizes.
7. Shader selections show thumbnails and apply successfully.
8. Lighting adjustments cause a measurable screenshot-pixel difference on a known lit test model.
9. Escape closes the topmost surface and restores focus.

### Visual captures

Capture both light and dark themes at:

- 1600×1000
- 1024×768
- 500×900

For every size, inspect:

- canvas visibility;
- equal panel padding;
- scrollbar styling;
- menu clipping;
- icon alignment;
- selected, hover, disabled, and focus states;
- bottom dock and left-panel consistency;
- 200% browser text zoom;
- keyboard-only navigation.

## 11. Recommended delivery order

1. Shared surfaces and outside-click behavior.
2. Pro import and duplicate-sun fixes.
3. Select, Draw, Create, and Deform simplification.
4. Layers menu repair and dialog sizing.
5. Bottom dock and session hierarchy.
6. Shader thumbnails.
7. Lighting engine repair.
8. Responsive and accessibility pass.
9. Full automated and visual verification.

Do not mark the redesign complete until every acceptance condition above has been checked on the running V19 server.
