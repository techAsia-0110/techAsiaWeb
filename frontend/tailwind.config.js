// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...require('tailwindcss/defaultTheme').fontFamily.sans],
        albert: ['Albert Sans', ...require('tailwindcss/defaultTheme').fontFamily.sans],
      },
      clipPath: {
        'ellipse-lg': 'ellipse(85% 100% at 50% 0%)',
        'ellipse-md': 'ellipse(160% 100% at 50% 0%)'
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.clip-ellipse-lg': {
          'clip-path': 'ellipse(85% 100% at 50% 0%)',
        },
        '.clip-ellipse-md': {
          'clip-path': 'ellipse(160% 100% at 50% 0%)',
        },
      };
      addUtilities(newUtilities, ['responsive']);
    },
    // Using the original, most compatible require statement
    require('@tailwindcss/typography'),
  ],
};