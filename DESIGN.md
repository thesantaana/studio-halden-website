# Studio Halden design system

## Direction

The chosen world is a user-pinned adaptation of Kintarowwwards: a kinetic editorial portfolio with oversized typography and vertically moving imagery. It is a replacement for the earlier folio-object direction, not a refinement of it.

## Visual grammar

- Monochrome light and dark themes with one foreground/background contrast system.
- Syne supplies the large Latin display voice; Inter and the system CJK fallback carry navigation and body copy.
- Monumental, left-aligned display type; narrow body measures; generous black negative space.
- Fine rules, circular controls, grayscale imagery, and restrained blur establish depth.
- Project surfaces are large image planes rather than equal cards. Titles and metadata remain legible before hover.

## Motion

- The first viewport uses two opposing vertical image rails as its signature motion.
- Desktop work browsing becomes a scroll-driven horizontal sequence.
- Reveals enhance already-visible content and never hide the static document.
- `prefers-reduced-motion` removes the preloader delay, particles, smooth scrolling, image-rail loops, and horizontal traversal.

## Responsive and language behavior

- `/zh/` and `/en/` share structure, imagery, anchors, and interaction.
- The mobile header always exposes the brand, language control, and menu.
- Chinese copy uses shorter measures and avoids forced Latin-style tracking.
- The root route redirects to `/zh/`; both locale routes are statically generated with trailing-slash directories.

## Content integrity

- Do not invent clients, awards, metrics, or outcomes.
- Temporary projects must remain labelled `Concept Study` / `概念研究`.
- Replace the current third-party imagery, example email, and provisional Studio Halden name before public launch.
