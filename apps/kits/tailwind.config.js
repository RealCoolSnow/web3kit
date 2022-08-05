/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['-apple-system', 'Noto Sans', 'Helvetica Neue', 'Helvetica', 'Nimbus Sans L', 'Arial', 'Liberation Sans', 'PingFang SC', 'Hiragino Sans GB', 'Noto Sans CJK SC', 'Source Han Sans SC', 'Source Han Sans CN', 'Microsoft YaHei', 'Wenquanyi Micro Hei', 'WenQuanYi Zen Hei', 'ST Heiti', 'SimHei', 'WenQuanYi Zen Hei Sharp', 'sans-serif'],
    },
    extend: {
      colors: {
        current: 'currentColor',
        transparent: 'transparent',
        primary: '#7524F9',
        secondary: '#1d4ed8',
        gray_text: '#919899'
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.675rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        9.5: '2.375rem',
        10.5: '2.625rem',
        11.5: '2.875rem',
        12.5: '3.125rem',
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        18: '4.5rem',
        19: '4.75rem',
        21: '5.25rem',
        22: '5.5rem',
        23: '5.75rem',
        25: '6.125rem',
        26: '6.5rem',
        27: '7.75rem',
        29: '7.25rem',
        30: '7.5rem',
        31: '7.75rem',
        34: '8.5rem',
        38: '9.5rem',
        50: '12.5rem',
        112: '28rem',
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      zIndex: {
        '-2': -2,
        '-1': -1,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
      rotate: {
        135: '135deg',
        225: '225deg',
        270: '270deg',
        315: '315deg',
      },
      screens: {
        '2xl': '1440px',
        '3xl': '1536px',
        '4xl': '1792px',
      },
    }
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('tailwindcss-padding-safe'),
    require('./plugins/tailwindcss-spinner'),
    require('tailwind-scrollbar-hide'),
  ],
}
