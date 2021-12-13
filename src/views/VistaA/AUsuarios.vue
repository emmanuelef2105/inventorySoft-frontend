<template>
  <div class="ausuarios">
    <Navbar/>
    <div>
      <MenuAd />
      <Usuarios />
    </div>
  </div>
</template>
 
<script>
import Navbar from '@/components/Navbar.vue'
import MenuAd from '@/components/Menu/MenuAd.vue'
import Usuarios from '@/components/Administrador/Usuarios.vue'
 
export default {
  name: 'ausuarios',
  components: {
   Navbar, MenuAd, Usuarios
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>
