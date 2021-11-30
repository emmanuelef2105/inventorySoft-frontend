<template>
  <div class="vista col-md-12">
    <Navbar/>
    <Tabla3/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Tabla3 from '@/components/Tablas/Tabla3'

export default {
  name: 'Vista-dos',
  components: {
   Navbar,Tabla3
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>