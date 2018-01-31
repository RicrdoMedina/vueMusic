const updateBoxMixin = {
  data () {
    return {
      isUpdated: false
    }
  },
  methods: {
    updateBox () {
      this.isUpdated = true
      setTimeout(() => {
        document.getElementById('loaderInfo').classList.add('is-active')
      }, 1000)
    },
    updatedBox () {
      setTimeout(() => {
        document.getElementById('loaderInfo').classList.remove('is-active')
        this.isUpdated = false
      }, 1500)
    }
  }
}

export default updateBoxMixin
