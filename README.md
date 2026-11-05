# Premier Resurfacing Services

Marketing site for Premier Resurfacing Services — bathtub, sink and countertop
refinishing across Seattle, Bellevue, Kirkland, Everett and the Greater Seattle
Area.

The site is plain static HTML/CSS/JS with no build step and no dependencies:

```
index.html          page markup and content
assets/styles.css   all styling
assets/main.js      mobile menu, before/after sliders, scroll reveal
assets/*.webp       before/after project photography
assets/logo.png     logo and favicon
```

## Run it

Any static file server pointed at the repository root works:

```bash
python3 -m http.server 3000
```

Then open <http://localhost:3000>.

## Editing

- Copy and prices live directly in `index.html`.
- Design tokens (charcoal, gold, type scale, container width) are CSS custom
  properties at the top of `assets/styles.css`.
- Photos are in `assets/`; replace a file keeping the same name to swap it.
