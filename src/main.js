import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

// On sélectionne les éléments
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Fonction pour basculer le menu (Ouvrir/Fermer)
menuBtn.addEventListener('click', () => {
  // On inverse la classe 'hidden' pour afficher/cacher
  mobileMenu.classList.toggle('hidden');
  // On change le display en flex quand c'est visible
  mobileMenu.classList.toggle('flex');
});

// Fermer le menu quand on clique sur un lien
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('flex');
  });
});