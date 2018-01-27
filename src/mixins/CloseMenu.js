const closeMenuMixin = {
  mounted () {
    this.$bus.$emit('open-menu', true)
  }
}

export default closeMenuMixin
