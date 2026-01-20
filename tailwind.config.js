/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette demandée : corail / poudré / vieux rose / beige sable / taupe / vert sauge
        coral: {
          DEFAULT: '#E56E73',   // Rose corail plus soutenu pour que les boutons soient bien visibles
          light: '#F99B95',     // Rose Corail Doux – survol / variantes claires
          pale: '#F4E9E2',      // Beige Sable rosé – blocs doux
        },
        'blue-grey': {
          DEFAULT: '#5A5A5A',   // Gris Taupe – texte principal si besoin
          light: '#F4E9E2',     // Beige Sable – fonds de cartes
        },
        soft: {
          pink: '#E6A8A8',
          'pink-light': '#F4E9E2',
          cream: '#F4E9E2',     // Beige Sable – fond de page
          'green-muted': '#8DA089', // Vert Sauge / Olive – dessins floraux
          'green-light': '#B7C7B2',
        },
        // Dégradés subtils évoquant la lumière et l'énergie
        light: {
          blue: '#E8F4F8',
          'blue-soft': '#D6EBF5',
          green: '#E8F5E9',
          'green-mint': '#D4F1E8',
          violet: '#F3E5F5',
          'violet-soft': '#E8DAF0',
          gold: '#FFF8E1',
          'gold-soft': '#FFE8D6',
        },
        energy: {
          blue: '#4A90E2',
          'blue-dark': '#357ABD',
          green: '#52B788',
          'green-dark': '#40916C',
          violet: '#9D4EDD',
          'violet-dark': '#7B2CBF',
          gold: '#F4A261',
          'gold-dark': '#E76F51',
        },
        // Pastels zen et couleurs arc-en-ciel
        pastel: {
          pink: '#FFE5E5',
          orange: '#FFE8D6',
          yellow: '#FFF8E1',
          green: '#E8F5E9',
          blue: '#E3F2FD',
          indigo: '#E8EAF6',
          purple: '#F3E5F5',
          rose: '#FCE4EC',
        },
        accent: {
          pink: '#F8BBD0',
          orange: '#FFCCBC',
          yellow: '#FFF9C4',
          green: '#C5E1A5',
          blue: '#90CAF9',
          indigo: '#9FA8DA',
          purple: '#CE93D8',
        },
        'off-white': '#F9F9F9',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(74, 144, 226, 0.3)',
        'glow-green': '0 0 20px rgba(82, 183, 136, 0.3)',
        'glow-violet': '0 0 20px rgba(157, 78, 221, 0.3)',
        'glow-gold': '0 0 20px rgba(244, 162, 97, 0.3)',
        'glow-soft': '0 0 30px rgba(255, 255, 255, 0.5)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
