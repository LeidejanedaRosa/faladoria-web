/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F7F0F7',
          100: '#EDE8F9',
          200: '#D8D3F5',
          300: '#B3ABF2',
          400: '#8A82F6',
          500: '#5F58F3',
          600: '#453FEE',
          700: '#3A35D6',
          800: '#302CB8',
          900: '#262396',
          950: '#1A1870',
        },
        brand: {
          purple: {
            dark: '#453FEE',
            DEFAULT: '#5F58F3',
            light: '#B3ABF2',
          },
          gray: {
            light: '#F7F0F7',
          },
          white: '#FFFFFF',
          black: '#000000',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'Arial',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [],
}
