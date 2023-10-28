const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        1: '4px',
        2: '8px',
        3: '16px',
        4: '24px',
        5: '32px',
        6: '64px',
        100: '400px',
      },
      borderRadius: {
        1: '4px',
        2: '8px',
      },
      fontSize: {
        xxs: '8px',
        xs: '10px',
        sm: '12px',
        base: '14px',
        md: '16px',
        lg: '18px',
        xl: '24px',
        '2xl': '28px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '48px',
        '6xl': '56px',
      },
    },
    colors: {
      ...colors,
      black: '#000000',
      white: '#F6FBFD',
      surface: '#FFFFFF',
      background: '#F2F4F7',
      typography: { DEFAULT: '#4C5668', 500: '#212121', secundary: '#757575' },
      blue: {
        100: '#9ABECC',
        200: '#5B6B7A',
      },
      gray: {
        DEFAULT: '#101828',
        100: '#EAECF0',
        150: '#D4DCE6',
        200: '#D0D5DD',
        300: '#98A2B3',
        400: '#657085',
        500: '#475467',
        600: '#344054',
        700: '#1D2939',
      },
      primary: {
        DEFAULT: '#444CE7',
        100: '#E0EAFF',
        200: '#F9FAFB',
        400: '#666eea',
      },
      darkPrimary: {
        DEFAULT: '#4992fe',
      },
      darkBackground: {
        DEFAULT: '#05183e'
      },
      darkSurface: {
        DEFAULT: '#100c2a',
      },
      textDark: {
        DEFAULT: '#aaa9bf'
      },
      secundary: { DEFAULT: '#191970', 500: '#013A36' },
      positive: '#039855',
      negative: '#D92D20',
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}