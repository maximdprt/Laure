/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Aura Massage
        sage: {
          DEFAULT: '#5E7D7E',  // Vert Sauge (Fond)
          light: '#7A9596',
          dark: '#4A6364',
        },
        gold: {
          DEFAULT: '#C5A367',  // Or Mat / Ocre
          light: '#D4B87D',
          dark: '#A88A4F',
        },
        sand: {
          DEFAULT: '#E5D3B3',  // Beige Sable
          light: '#EFE4CE',
          dark: '#D4C09A',
        },
        cream: {
          DEFAULT: '#F2E8D5',  // Crème Clair
          light: '#FAF6EC',
          dark: '#E8DBBF',
        },
        dark: {
          DEFAULT: '#1A1A1A',  // Noir Doux
          light: '#2D2D2D',
          muted: '#4A4A4A',
        },
        // Utilitaires
        white: '#FFFFFF',
        success: '#5E9F7E',
        error: '#C26E6E',
        warning: '#C5A367',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(30, 30, 30, 0.08)',
        'soft-lg': '0 8px 40px rgba(30, 30, 30, 0.12)',
        'gold': '0 4px 20px rgba(197, 163, 103, 0.25)',
        'card': '0 2px 12px rgba(30, 30, 30, 0.06)',
        'card-hover': '0 8px 30px rgba(30, 30, 30, 0.1)',
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
