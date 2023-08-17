/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'havelock-blue': {
        '50': '#eff7fe',
        '100': '#e2effd',
        '200': '#cae1fb',
        '300': '#aacdf7',
        '400': '#89aef0',
        '500': '#6c91e8',
        '600': '#5a76dd',
        '700': '#415ac1',
        '800': '#374c9c',
        '900': '#33447c',
        '950': '#1e2648',
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