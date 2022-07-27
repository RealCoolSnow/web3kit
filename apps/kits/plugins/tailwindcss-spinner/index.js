const plugin = require('tailwindcss/plugin')
const toColorValue = require('tailwindcss/lib/util/toColorValue').default
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

module.exports = plugin(function addSpinnerUtility({ matchUtilities, theme, addBase, addComponents }) {
  addBase({
    ':root': { '--spinner-bg-color': 'transparent' },
  })

  addComponents({
    '.spinner': {
      '& circle': {
        fill: 'none',
        strokeLinecap: 'round',
        stroke: 'currentColor',
        animation: 'spinner-animate 1s ease-in-out infinite',
      },
      '& path': {
        fill: 'none',
        stroke: 'var(--spinner-bg-color)',
      },
    },
    '@keyframes spinner-animate': {
      '0%': {
        strokeDasharray: '1, 150',
        strokeDashoffset: '0',
      },
      '50%': {
        strokeDasharray: '90, 150',
        strokeDashoffset: '-35',
      },
      '100%': {
        strokeDasharray: '90, 150',
        strokeDashoffset: '-124',
      },
    },
  })

  matchUtilities(
    {
      spinner: value => {
        return {
          '--spinner-bg-color': toColorValue(value),
        }
      },
    },
    { values: flattenColorPalette(theme('colors')), type: ['color', 'any'] },
  )
})
