HEAD
├── theme init script (localStorage → data-theme)
├── theme.css
├── Tailwind CDN + config (accent, dark)
└── <style> — cursor, nav, reveals, bento-img

BODY
│
├── #cursor — point noir lerp
│
├── <nav> — fixe, Dynamic Island
│   ├── Logo BT (SVG)
│   ├── Nav links (Portfolio + dropdown, Mon Profil + dropdown)
│   ├── Theme toggle
│   └── Bouton Contact + dropdown
│
└── <main>
    │
    ├── HERO — pt-32 md:pt-40
    │   ├── grid 12 col
    │   │   ├── col-3 : section-label "Étude de cas"
    │   │   └── col-9 : h1 (clamp 40→110px) + tagline text-white/45
    │   └── Image couverture — 16/9, max-height 75vh, rounded-2xl
    │
    ├── META — grid 4 colonnes
    │   ├── Rôle
    │   ├── Secteur
    │   ├── Année
    │   └── Livrables
    │
    ├── 01 — CONTEXTE — grid 12 col
    │   ├── col-3 : section-label
    │   └── col-9 : h2 + paragraphes text-white/50
    │
    ├── 02 — PROBLÉMATIQUE — grid 12 col
    │   ├── col-3 : section-label
    │   └── col-9 : h2 + blockquote (border-l accent) + texte
    │
    ├── 03 — ENJEUX — grid 12 col
    │   ├── col-3 : section-label
    │   └── col-9 : h2 + grid 2×2
    │       └── Enjeu (numéro accent + titre + desc)  ×4
    │
    ├── 04 — MÉTHODOLOGIE — grid 12 col
    │   ├── col-3 : section-label
    │   └── col-9 : h2 + liste étapes numérotées
    │       └── Étape (numéro text-white/15 + titre + desc)  ×4
    │
    ├── 05 — SOLUTION — grid 12 col
    │   ├── col-3 : section-label
    │   └── col-9 : h2 + texte
    │
    ├── GALERIE BENTO — grid 3 col
    │   ├── col-2 : image large
    │   ├── col-1 : image petite
    │   ├── col-1 : image petite
    │   └── col-2 : image large
    │
    ├── APPRENTISSAGES — grid 12 col
    │   ├── col-3 : section-label
    │   └── col-9 : h3 + liste (— accent + texte)  ×3
    │
    ├── PROJET SUIVANT — pleine largeur, hover → accent
    │   ├── "Projet suivant" (section-label)
    │   ├── Nom du projet (clamp 28→72px)
    │   └── Catégorie · Secteur + flèche →
    │
    └── FOOTER — grid 4 col
        ├── Contact (email)
        ├── Social (LinkedIn)
        ├── Navigation (liens)
        ├── Studio (texte)
        └── Copyright + localisation