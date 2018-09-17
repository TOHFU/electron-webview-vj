module.exports = {
  sass: {
    src: [
      './src/scss/!(_)*'
    ],
    dest: './assets/css/',
    output: 'style.css',
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    minify: false
  }
};
