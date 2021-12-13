<template>
  <div class="acompras">
    <Navbar/>
    <div>
      <MenuAd />
      <Compras />
    </div>
  </div>
</template>
 
<script>
import Navbar from '@/components/Navbar.vue'
import MenuAd from '@/components/Menu/MenuAd.vue'
import Compras from '@/components/Administrador/Compras.vue'
 
export default {
  name: 'acompras',
  components: {
   Navbar, MenuAd, Compras
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>



</style>