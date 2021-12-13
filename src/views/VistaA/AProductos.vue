<template>
  <div class="aproductos">
    <Navbar/>
    <div>
      <MenuAd />
      <Productos />
    </div>
  </div>
</template>
 
<script>
import Navbar from '@/components/Navbar.vue'
import MenuAd from '@/components/Menu/MenuAd.vue'
import Productos from '@/components/Administrador/Productos.vue'
 
export default {
  name: 'aproductos',
  components: {
   Navbar, MenuAd, Productos
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>