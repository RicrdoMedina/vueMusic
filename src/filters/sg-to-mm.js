const sgToMm = {}

function convertSgToMm (time) {
  // Hours, minutes and seconds
  let hrs = ~~(time / 3600)
  let mins = ~~((time % 3600) / 60)
  let secs = time % 60

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = ''

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '')
  ret += '' + secs
  return ret
}

sgToMm.install = function (Vue) {
  Vue.filter('sg-to-mm', (val) => {
    return convertSgToMm(val)
  })
}

export default sgToMm
