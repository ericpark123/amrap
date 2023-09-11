/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'mirage': {
        '50': '#f4f6fb',
        '100': '#e9ecf5',
        '200': '#ced7e9',
        '300': '#a3b4d6',
        '400': '#718cbf',
        '500': '#4f6da8',
        '600': '#3d558c',
        '700': '#324572',
        '800': '#2d3d5f',
        '900': '#293451',
        '950': '#151a29',
    },    
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    container: {
      center: true,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
}