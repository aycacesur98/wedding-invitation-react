export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#87CEEB", // Azul Cielo Clásico
        secondary: "#F9F9F6", // Blanco Marfil
        tertiary: "#A7C7E7", // Azul Pastel
        text: "#2E4053", // Dark Blue Gray for contrast
        accent: "#D4AF37", // Dorado Suave
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ["Montserrat", "sans-serif"],
        script: ['"Great Vibes"', "cursive"],
      },
      backgroundImage: {
        'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')", // Fallback or use a nice texture
      }
    },
  },
  plugins: [],
}
