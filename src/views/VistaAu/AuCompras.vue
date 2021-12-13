<template>
  <div class="aucompras">
    <NavbarAu/>
    <div>
      <MenuA />
      <Compras />
    </div>
  </div>
</template>
 
<script>
import NavbarAu from '@/components/Navbar/NavbarAu.vue'
import MenuA from '@/components/Menu/MenuA.vue'
import Compras from '@/components/Auxiliar/Compras.vue'
 
export default {
  name: 'aucompras',
  components: {
   NavbarAu, MenuA, Compras
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>
