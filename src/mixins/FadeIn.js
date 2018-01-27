const fadeInMixin = {
  methods: {
    fadeIn () {
      setTimeout(() => {
        document.getElementById('sectionMain').classList.add('fadeIn')
      }, 4000)
    }
  }
}

export default fadeInMixin
