const modalMixin = {
  methods: {
    openModal () {
      setTimeout(() => {
        document.getElementById('containerInfo').classList.add('fixed')
      }, 1000)
    },
    closeModalInfo () {
      document.getElementById('containerInfo').classList.remove('fixed')
    }
  }
}

export default modalMixin
