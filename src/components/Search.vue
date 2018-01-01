<template lang="pug">
  .columns
    .column
      nav.nav-search
        form
          input.search(
            type="text",
            placeholder="Buscar canciones",
          )
          a.button
            icon(name="search" scale="1")
</template>

<style lang="scss">

.search{
  height: 35px;
  border-left: solid rgb(222,89,34) 1px;
  border-bottom: solid rgb(222,89,34) 1px;
  border-top: solid rgb(222,89,34) 1px;
  outline: 0;
  width: 400px;
  padding: 0 .5rem;
  font-size: 1.2rem;
  background: #ffffff36;
  color: rgb(222,89,34);
}
.button{
  border-radius: unset;
  background: rgb(222,89,34);
  border: unset;
  position: relative;
  left: -2px;
  height: 35px;
}
.button:hover,.button.focus{
  border: unset; 
}
</style>