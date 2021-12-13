<template>
  <div class="aventas">
    <Navbar/>
    <div>
      <MenuAd />
      <Ventas />
    </div>
  </div>
</template>
 
<script>
import Navbar from '@/components/Navbar.vue'
import MenuAd from '@/components/Menu/MenuAd.vue'
import Ventas from '@/components/Administrador/Ventas.vue'
 
export default {
  name: 'aventas',
  components: {
   Navbar, MenuAd, Ventas
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>
