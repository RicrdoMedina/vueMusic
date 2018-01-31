const mediaQueryMixin = {
  methods: {
    mediaQuery (maxWidth) {
      let queryMedia = window.matchMedia('(' + maxWidth + ')')
      if (queryMedia.matches) return true
      return false
    }
  }
}

export default mediaQueryMixin
