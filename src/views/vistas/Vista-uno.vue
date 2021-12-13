<template>
  <div class="vista ">
    <Navbar/>
    <div class="contenido">
      <Menu />
      <Tabla2 />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Menu from '@/components/Menu.vue'
import Tabla2 from '@/components/Tablas/Tabla2'


export default {
  name: 'Vista-uno',
  components: {
   Navbar, Menu, Tabla2
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>