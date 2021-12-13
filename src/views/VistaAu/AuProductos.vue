<template>
  <div class="auproductos">
    <NavbarAu/>
    <div>
      <MenuA />
      <Productos />
    </div>
  </div>
</template>
 
<script>
import NavbarAu from '@/components/Navbar/NavbarAu.vue'
import MenuA from '@/components/Menu/MenuA.vue'
import Productos from '@/components/Auxiliar/Productos.vue'
 
export default {
  name: 'auproductos',
  components: {
   NavbarAu, MenuA, Productos
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>
