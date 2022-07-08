const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-light': '#b8dfff',
        blue: '#80e5ff',
        'green-light': '#cdfff0',
        green: '#a1ffe4',
        'pink-light': '#ffb8d9',
        pink: '#ff7dbd',
        'purple-light': '#f4dffe',
        purple: '#8946ab',
        'orange-light': '#fef0e5',
        'yellow-light': '#fffeca',
        discord: '#5865F2',
        grass: '#acfad3',
        twitter: '#1d9bf0',
        opensea: '#2081E2',
        sky: '#aaf1ff',
      },
      screens: {
        screen: '2000px',
        // disables hover on mobile devices
        betterhover: { raw: '(hover: hover)' },
      },
      backgroundImage: {
        'banner-repeat': "url('../public/bg_repeat.png')",
        'speech-bubble': "url('../public/speech_bubble.png')",
        'speech-bubble-mobile': "url('../public/speech_bubble_mobile.png')",
      },
      borderWidth: {
        6: '6px',
      },
      spacing: {
        22: '5.5rem',
        26: '6.5rem',
        88: '22rem',
      },
      keyframes: {
        section: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        section: 'section 1s',
      },
      fontSize: {
        '10xl': '11.5rem',
      },
    },
    fontFamily: {
      sans: ['Hepta Slab', ...defaultTheme.fontFamily.sans],
      gmcafe: ['GMCafe', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
