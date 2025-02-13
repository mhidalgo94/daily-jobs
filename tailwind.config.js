/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
      },
      colors:{
        primary: {
          DEFAULT: "#00A5CF",
          200: '#4EC8E0', 
          300: '#1D98B6', 
          400: '#008A99',
        },
        accent: {
          DEFAULT: '#25A18E', 
          200: '#4DB7A4', 
          300: '#1F8E7A', 
          400: '#1B7A69',
        },
        regular: {
          DEFAULT: '#7AE582', 
          // 200: '#4DB7A4', 
          // 300: '#1F8E7A', 
          // 400: '#1B7A69',
        },
        // Danger (Rojo)
        danger: {
          DEFAULT: '#D9534F', // Color rojo fuerte para alertas y errores
          200: '#F5B7B1', // Tono más claro de danger
          300: '#C45C53', // Tono intermedio de danger
          400: '#A94442', // Tono más oscuro de danger
        },
        // Warning (Amarillo)
        warning: {
          DEFAULT:'#FFBF00', // Color amarillo para advertencias
          200: '#FFCD58', // Tono más claro de warning
          300: '#FFC107', // Tono intermedio de warning
          400: '#E0A900', // Tono más oscuro de warning
        },
        // Info (Azul)
        info: {
          100: '#17A2B8', // Color azul para información
          200: '#5BC0DE', // Tono más claro de info
          300: '#31B0D5', // Tono intermedio de info
          400: '#138496', // Tono más oscuro de info
        },
        black: {
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          250: "#4b5563",
          300: "#191D31",
        },
      }
    },
  },
  plugins: [],
}