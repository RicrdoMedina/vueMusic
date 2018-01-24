const capitalizeFirstLetter = {}

function convertCapitalizeFirstLetter (str) {
  return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() })
}

capitalizeFirstLetter.install = function (Vue) {
  Vue.filter('capitalize-first-letter', (val) => {
    return convertCapitalizeFirstLetter(val)
  })
}

export default capitalizeFirstLetter
