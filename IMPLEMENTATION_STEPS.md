# 3D Retro Portfolio Implementation Steps

## Step 1: Foundation and Interaction Architecture
1. Set up `App` state with `activeSection` and connect Canvas + overlay.
2. Split scene into reusable components:
   - `Scene.jsx`
   - `Mac.jsx`
   - `CameraController.jsx`
   - `UIOverlay.jsx`
3. Load GLB once with `useGLTF`.
4. Render the model through `<primitive object={scene} />`.
5. Handle click routing with `e.object.name` and `.includes()` rules.
6. Add hover cursor feedback using `useCursor`.
7. Add click-outside reset with `onPointerMissed`.
8. Add cozy base lighting and disable zoom in `OrbitControls`.
9. Add smooth camera interpolation per active section.

## Step 2: Render Real HTML in the Monitor (Completed)
1. Add a `MonitorContent.jsx` component that renders resume HTML with Drei `Html`.
2. Detect monitor mesh from scene graph by mesh name (`screen`, `monitor`, `display`).
3. Compute monitor anchor position and rotation from mesh bounds/quaternion.
4. Render monitor HTML only when `activeSection === "resume"`.
5. Style in-screen HTML in CSS so it reads like retro desktop UI.
6. Keep overlay as external panel for non-screen sections.

## Step 3: CRT and Screen Effects (Completed)
1. Add CRT shader/material pass on monitor area.
2. Add scanlines, slight chromatic shift, vignette, and subtle noise.
3. Animate gentle flicker with time uniform.
4. Keep effect intensity low for readability of embedded resume content.

## Step 4: Hover Highlight and Focus Cues (Completed)
1. Track hovered mesh name.
2. Add per-mesh highlight (emissive boost or outline pass).
3. Add monitor glow when hovering screen area.
4. Add section-specific cursor/title hints.

## Step 5: Full Cozy 90s Room Environment (Completed)
1. Build room shell (floor, wall, props, painting, desk details).
2. Add practical warm lamp source and cool fill source.
3. Add atmospheric elements (dust particles, slight fog, decals).
4. Tune composition for desktop and mobile framing.

## Step 6: Performance and Deployment Hardening (Current Step)
1. Profile draw calls/material usage and reduce where possible.
2. Use texture compression and mesh optimization pipeline.
3. Lazy-load heavy non-critical sections/content.
4. Add fallback for low-end devices (`dpr`, quality toggles).
5. Run final Lighthouse + runtime performance checks before hosting.
