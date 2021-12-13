<template>
  <div class="vventas">
    <NavbarV/>
    <div>
      <MenuV />
      <Ventas />
    </div>
  </div>
</template>
 
<script>
import NavbarV from '@/components/Navbar/NavbarV.vue'
import MenuV from '@/components/Menu/MenuV.vue'
import Ventas from '@/components/Vendedor/Ventas.vue'
 
export default {
  name: 'vventas',
  components: {
   NavbarV, MenuV, Ventas
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>
