const formatStars = new Intl.NumberFormat(
  document.querySelector('html')?.lang || navigator.language,
).format;

export default formatStars;
