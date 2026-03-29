# CLAUDE.md — Portfolio Bruno Tanguy 2026

## Qui est Bruno

Product Designer, étudiant en 3e année à l'École de design Nantes Atlantique. Ce portfolio présente ses études de cas UX/UI et vise à décrocher une alternance pour septembre 2026.

---

## Stack technique

| Outil | Rôle |
|---|---|
| HTML statique multi-pages | Pas de framework, pas de SPA |
| Tailwind CSS via CDN | Styling utilitaire — **à migrer vers Vite build** (voir ci-dessous) |
| Vite | Build tool déjà configuré dans `vite.config.js` |
| PostCSS + `@tailwindcss/postcss` | Pipeline CSS déjà configuré dans `postcss.config.js` |
| Lenis 1.1.13 | Smooth scroll (chargé via CDN unpkg sur chaque page) |
| Vanilla JS | Toutes les interactions (IntersectionObserver, curseur custom, hover projets) |

### Commandes
```bash
npm run dev      # serveur de développement Vite
npm run build    # génère dist/
npm run preview  # prévisualise dist/
```

---

## Problème majeur à régler : migration CDN → Vite build

Actuellement chaque page charge Tailwind via CDN + inline `tailwind.config = {...}`. C'est **redondant** avec le pipeline Vite déjà configuré.

**`src/shared.css` existe déjà** avec la bonne config (`@import "tailwindcss"` + `@source "../*.html"`) mais n'est lié à aucune page HTML.

**Ce qu'il faut faire pour migrer :**
1. Dans chaque page HTML, supprimer :
   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   <script>tailwind.config = { ... }</script>
   ```
2. Ajouter à la place :
   ```html
   <link rel="stylesheet" href="/src/shared.css">
   ```
3. Déplacer tout le CSS dupliqué des blocs `<style>` inline vers `src/shared.css`
4. Supprimer `src/main.js`, `src/counter.js`, `src/style.css`, `src/javascript.svg` (code mort issu du template Vite par défaut)

**Note :** `tailwind.config.js` à la racine pointe sur `./src/**/*.{js,ts,jsx,tsx}` — il faudra le supprimer ou le vider car `src/shared.css` utilise `@source "../*.html"` qui couvre déjà tout.

---

## Architecture des fichiers

```
/
├── index.html              # Page d'accueil — hero + liste projets hover
├── resume.html             # Page CV / Mon Profil
├── projectDecathlon.html   # Étude de cas Decathlon (Recherche UX · Retail)
├── projectWePlan.html      # Étude de cas WePlan (Architecture UI · SaaS)
├── projectCegedim.html     # Étude de cas Cegedim (Product Design · Santé/IA)
├── projectCitadelles.html  # Étude de cas Citad'elles (Design de Service · Social)
├── project.html            # TEMPLATE pour nouveaux projets (lorem ipsum)
├── src/
│   └── shared.css          # CSS partagé (Tailwind + composants) → à compléter et lier
├── img/                    # Images par dossier projet (decathlon/, cegedim/, etc.)
├── dist/                   # Sortie du build Vite — NE PAS ÉDITER manuellement
└── vite.config.js          # Multi-page input (toutes les pages HTML déclarées)
```

### Ajouter un nouveau projet
1. Copier `project.html` → `projectNomDuProjet.html`
2. Déclarer la nouvelle page dans `vite.config.js` sous `rollupOptions.input`
3. Ajouter le projet dans la liste `projData[]` du JS de `index.html`
4. Ajouter une nouvelle image preview dans `index.html` (balise `<img class="proj-preview">`)
5. Ajouter un `<a class="proj-item">` dans la colonne liste de `index.html`
6. Créer le dossier `img/nomduprojet/` avec les visuels
7. Mettre à jour le lien "Projet suivant" dans la page précédente

**2–3 nouveaux projets prévus.**

---

## Système de design

### Tokens couleurs
| Token Tailwind | Valeur | Usage |
|---|---|---|
| `brand-orange` | `#FF8400` | Accent, numéros, hover actifs |
| `brand-gray` | `#E2E1E6` | Séparateurs, bordures |
| `text-muted` | `#6B6A75` | Textes secondaires, labels |
| `black` | `#000000` | Titres, texte principal |
| `white` | `#FFFFFF` | Fond, texte sur fond sombre |

### Typographie
- Font : **Host Grotesk** (Google Fonts, 300–800)
- Titres : `font-extrabold tracking-[-0.05em] leading-[0.9]` avec `clamp()`
- Body : `text-[17px]` / `text-[15px]` en `text-muted`
- Labels section : `.section-label` — 12px, bold, uppercase, letter-spacing 0.1em

### Grille
- Padding horizontal : `px-[8px]` sur toutes les sections
- Gap : `gap-[16px]` systématique
- Grilles 3 colonnes (`grid-cols-3`) : label col-1 / contenu col-2
- Grilles 4 colonnes (`grid-cols-4`) : pour les meta infos projets

### Responsive — À FAIRE
Les pages n'ont pas de breakpoints mobiles complets. Il faut ajouter des variantes `sm:` et `md:` sur :
- Les grilles principales (passer en `grid-cols-1` sur mobile)
- Les tailles de titres (déjà partiellement fait avec `clamp()`)
- Le header Dynamic Island (tester sur petits écrans)

---

## Composants récurrents

### Header — Dynamic Island
Pill noire centrée, fixe en `top-5`. Présent identique sur toutes les pages.
- Logo SVG (forme custom "BT")
- Lien actif → classe `.dyn-link.active` (texte blanc plein)
- Lien inactif → `.dyn-link` (blanc 60%)
- **Le lien actif change selon la page courante**

### Curseur custom
Dot noir 10px, s'agrandit en cercle 32px vide au hover sur liens/boutons.
- Le curseur utilise une boucle RAF pour un suivi smooth (lerp 0.18)
- **Ce comportement doit être identique sur TOUTES les pages** — utiliser le même bloc JS
- `#c-cursor.hover` → cercle 32px transparent avec bordure noire
- `#c-cursor.hidden` → opacity 0 (quand la souris quitte la fenêtre)

```js
// Bloc JS curseur standard (RAF-based, à utiliser partout)
const cur = document.getElementById('c-cursor');
let cx = -50, cy = -50, tx = -50, ty = -50;
document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
document.addEventListener('mouseleave', () => cur.classList.add('hidden'));
document.addEventListener('mouseenter', () => cur.classList.remove('hidden'));
(function curLoop() {
    cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
    cur.style.left = cx + 'px'; cur.style.top = cy + 'px';
    requestAnimationFrame(curLoop);
})();
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hover'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hover'));
});
```

### Scroll reveals
- `.reveal` → translateY(28px) → translateY(0) au scroll
- `.reveal-img` → scale(1.04) → scale(1)
- `.reveal-d1` à `.reveal-d4` → delays 0.1s à 0.4s
- Activé via IntersectionObserver, classe `.visible` ajoutée une seule fois

### Btn-dash
Bouton avec tiret qui s'allonge au hover. Variantes : `.btn-header`, `.btn-nav`, `.btn-sub`, `.btn-card`, `.btn-foot`.
```html
<a class="btn-dash btn-foot"><div class="dash"></div>Texte</a>
```

### Lenis smooth scroll
```html
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
<script>
    const lenis = new Lenis({ lerp: 0.08 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
</script>
```

---

## Structure type d'une page projet

```
1. Header Dynamic Island
2. Hero — image pleine hauteur + titre + meta (rôle, secteur, année, livrables)
3. Sections numérotées : 01 Contexte → 02 Problématique → 03 Enjeux → 04 Méthodologie → 05 Solutions → Apprentissages
4. Key Insight — blockquote italic centré
5. Projet suivant — lien grande taille vers le projet suivant
6. Footer
```

Chaque section : `border-t border-brand-gray`, `py-20 md:py-28`, grille 3 col (label + contenu).

---

## Section motion (index.html)

La section `#motion-zone` dans `index.html` est **vide** — c'est un espace réservé pour une animation **Lottie**. Intégration prévue avec `@lottiefiles/lottie-player` ou `lottie-web`.

---

## Bugs / TODO connus

- [ ] Lien LinkedIn dans le footer de `index.html` est `href="#"` — le mettre à jour
- [ ] Migrer le CDN Tailwind vers le pipeline Vite (`src/shared.css`)
- [ ] Unifier le curseur RAF sur toutes les pages (actuellement différent sur les pages projet)
- [ ] Ajouter les breakpoints responsive sur toutes les pages
- [ ] Intégrer l'animation Lottie dans `#motion-zone`
- [ ] Supprimer le code mort Vite dans `src/` (main.js, counter.js, style.css, javascript.svg)
- [ ] Ajouter 2–3 nouveaux projets

---

## Ce qu'il ne faut pas toucher

- `dist/` — généré automatiquement par `npm run build`, ne jamais éditer
- Le SVG du logo (path complexe, identitaire)
- La valeur `lerp: 0.08` de Lenis (calibrée pour le ressenti actuel)
