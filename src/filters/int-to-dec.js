const intToDec = {}

function convertIntToDec (Number) {
  Number = Number + '' // Convert Number to string if not
  Number = Number.split('').reverse().join('') // Reverse string
  let Result = ''
  for (let i = 0; i <= Number.length; i += 3) {
    Result = Result + Number.substring(i, i + 3) + '.'
  }
  Result = Result.split('').reverse().join('') // Reverse again
  if (!isFinite(Result.substring(0, 1))) Result = Result.substring(1, Result.length) // Remove first dot, if have.
  if (!isFinite(Result.substring(0, 1))) Result = Result.substring(1, Result.length) // Remove first dot, if have.
  return Result
}

intToDec.install = function (Vue) {
  Vue.filter('int-to-dec', (int) => {
    return convertIntToDec(int)
  })
}

export default intToDec
