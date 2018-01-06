<template lang="pug">
  header.header
      .columns
        .column.is-4
          nav.icon-bars
            icon(name="bars" scale="2")
        .column.is-4.has-text-centered
          router-link(to="/")
            figure.content-logo
              img.logo(src="src/assets/vue-logo.png")
        .column.is-4.has-text-centered 4
</template>

<style lang="scss">

.header{
  width: 100%;
  margin: 0 auto;
  padding: .5em;
  box-sizing: border-box;
  height: 70px;
  position: fixed;
  top:0;
  background: #ffffff36;
}
.header .column{
  padding: 25px 25px 0 25px;
}
.header .icon-bars{
  color: rgb(222,89,34);
  cursor:pointer;
}
.content-logo{
  width: 94px;
  display: inline-block;
  margin: 0 auto;
}

</style>