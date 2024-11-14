/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily:{
        geist: ['"Geist Mono"', 'monospace']
      },
      colors:{
        Primary:"black",
        Secondary:"#EEEEEE",
        Tertiary:"black",
        Grey:"#282828",
        Quaternary:"#00ADB5"

      }
    },
  },
  plugins: [],
}

