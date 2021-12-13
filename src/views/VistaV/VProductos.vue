<template>
  <div class="vproductos">
    <NavbarV/>
    <div>
      <MenuV />
      <Productos />
    </div>
  </div>
</template>
 
<script>
import NavbarV from '@/components/Navbar/NavbarV.vue'
import MenuV from '@/components/Menu/MenuV.vue'
import Productos from '@/components/Vendedor/Productos.vue'
 
export default {
  name: 'vproductos',
  components: {
   NavbarV, MenuV, Productos
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>
