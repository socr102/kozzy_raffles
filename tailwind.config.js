/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js","./src/**/**/*.js", "./public/index.html"],
  darkMode: true,
  theme: {
    fontFamily: {
      knockout: ['Poppins', 'cursive'],
    },
    fontSize: {
      'tiny' : '15px',
      '0sm' : '18px',
      '1sm' : '20px',
      '2sm' : '40px',
      '3sm' : '50px',
      '4sm' : '55px',
      '5sm' : '30px',
    },
    extend: {
      colors:{
        'green' : '#15D4A4',
        'bitblue': '#08BCF0',
        'red' : '#E90F0F'
      },
      spacing: {
        'countT': '8px',
        'countB': '-10px',
        'imgW': '350px',
        'imgSW': '200px',
        'imgPad': '55px',
        'imgSPad': '60px',
        'NFTW' : '300px',
        'ModalW': '650px',
        'inputW': '250px',
        'timeW': '80px',
      }
    },
  },
  plugins: [],
}
