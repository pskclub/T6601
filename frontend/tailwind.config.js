/** @type {import("tailwindcss").Config} */

module.exports = {
  important: true,
  content: [
    'app.vue',
    'error.vue',
    './components/**/*.{js,vue,ts}',
    './features/**/*.{js,vue,ts}',
    './containers/**/*.{js,vue,ts}',
    './layouts/**/*.{js,vue,ts}',
    './pages/**/*.{js,vue,ts}',
    './error.{js,vue,ts}',
    './utils/**/*.{js,vue,ts}',
  ],
  theme: {
    extend: {
      borderWidth: {
        1: '1px',
      },
      fontFamily: {
        display: ['Poppins', 'Prompt', 'sans-serif'],
        poppins: ['Poppins', 'Prompt', 'sans-serif'],
        prompt: ['Prompt', 'sans-serif'],
      },
      borderRadius: {
        10: '10px',
        20: '20px',
        30: '30px',
        40: '40px',
      },
      colors: {
        black: '#20243E',
        white: '#FFFFFF',
        dark: {
          DEFAULT: '#20243E',
          50: '#6D7280',
          100: '#505050',
        },
        light: {
          DEFAULT: '#FAFAFA',
        },
        gray: {
          DEFAULT: '#9095A6',
          disabled: '#C1C4D0',
          border: '#E2E4EA',
          fill: '#F4F5FA',
        },
        primary: {
          DEFAULT: '#41A667',
          50: '#BAE4CA',
          100: '#ACDEBF',
          200: '#8ED3A8',
          300: '#71C792',
          400: '#54BC7B',
          500: '#41A667',
          600: '#317E4E',
          700: '#215535',
          800: '#122D1C',
          900: '#020503',
          950: '#000000',
        },
        secondary: {
          DEFAULT: '#101724',
          50: '#4868A3',
          100: '#425F95',
          200: '#364D79',
          300: '#293B5C',
          400: '#1D2940',
          500: '#101724',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        info: {
          DEFAULT: '#F64976',
          50: '#FFEBF0',
          100: '#F87395',
        },
        danger: {
          DEFAULT: '#D0021B',
          50: '#ffe5e5',
          100: '#FF4C4C',
        },
        success: {
          DEFAULT: '#01B460',
          50: '#E2FFF0',
          100: '#52CB8C',
        },
        warning: {
          DEFAULT: '#EE7336',
          50: '#FFEBE2',
          100: '#FF864B',
        },
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/forms'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'),
  ],
}
