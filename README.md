# 🌟 LashLux Studio - Application Web de Luxe

Une application web React moderne et élégante pour un studio d'extension de cils de luxe.

## ✨ Fonctionnalités

### 🎨 Design Unique
- **Palette de couleurs luxueuse** : Rose poudré, noir mat, or chaud et rose fushia
- **Typographie élégante** : Playfair Display (titres) et Lora (corps de texte)
- **Glassmorphism** : Navigation avec effet de verre flouté
- **Coins arrondis** : Design moderne et doux

### 🎭 Animations Avancées
- **Hero Section** : 
  - Image avec forme morphing (changement fluide de forme)
  - Taches de lumière animées en arrière-plan
  - Effet de parallaxe subtil
  - Titre avec dégradé animé

- **Slider de Comparaison Avant/Après** :
  - Interaction fluide avec physique réaliste (useSpring)
  - Effet d'inertie et de rebond
  - Responsive tactile

- **Cartes de Services** :
  - Animation whileInView (apparition au scroll)
  - Effet de cascade (staggering)
  - Carte "Best Seller" mise en valeur
  - Survol avec élévation

- **Boutons Magnétiques** :
  - Effet d'attraction au mouvement de la souris
  - Animation fluide avec ressorts

### 📱 100% Responsive
- Design mobile-first
- Adaptation parfaite sur tous les écrans
- Navigation optimisée pour mobile

## 🚀 Technologies Utilisées

- **React 18** - Framework JavaScript moderne
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Bibliothèque d'animation avancée
- **Lucide React** - Icônes modernes

## 📦 Installation

1. Les dépendances sont déjà installées. Si besoin, réinstallez avec :
```bash
npm install
```

2. Lancez le serveur de développement :
```bash
npm run dev
```

3. Ouvrez votre navigateur à l'adresse affichée (généralement http://localhost:5173)

## 🏗️ Structure du Projet

```
Lash/
├── src/
│   ├── App.jsx          # Composant principal avec tous les composants
│   ├── main.jsx         # Point d'entrée React
│   └── index.css        # Styles globaux Tailwind
├── index.html           # Template HTML
├── vite.config.js       # Configuration Vite
├── tailwind.config.js   # Configuration Tailwind
├── postcss.config.js    # Configuration PostCSS
└── package.json         # Dépendances npm
```

## 🎨 Composants Principaux

### `MagneticButton`
Bouton avec effet magnétique qui suit le mouvement de la souris avec une animation de ressort.

### `ComparisonSlider`
Slider interactif avant/après avec physique réaliste (rebond et inertie).

### `FloatingLights`
Taches de lumière flottantes animées en arrière-plan pour créer une ambiance luxueuse.

### `MorphingImage`
Image avec forme qui change progressivement en boucle pour un effet unique.

## 🎯 Sections du Site

1. **Navigation** - Barre fixe avec effet glassmorphism
2. **Hero** - Section d'accueil avec image morphing et animations
3. **Transformation** - Slider avant/après interactif
4. **Services** - 3 cartes de services (Naturel, Volume Russe, Mega Volume)
5. **Galerie** - Grille 2x2 d'images avec animations
6. **Footer** - Informations de contact et réseaux sociaux

## 🎨 Palette de Couleurs

- **Rose Poudré** : `#fdf2f8` - Fond principal
- **Noir Mat** : `#1a1a1a` - Texte et bases
- **Or Chaud** : `#d4af37` - Accent luxe
- **Rose Fushia** : `#ff69b4` - Accent dynamique

## 📝 Scripts Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée une version de production
- `npm run preview` - Prévisualise la version de production

## 🌟 Points Forts

- ✅ Code React moderne avec Hooks
- ✅ Animations fluides et performantes
- ✅ Design unique et professionnel
- ✅ Entièrement responsive
- ✅ Optimisé pour les performances
- ✅ Prêt pour la production

## 📄 Licence

Ce projet est créé pour LashLux Studio. Tous droits réservés.

---

**Créé avec ❤️ et React**

