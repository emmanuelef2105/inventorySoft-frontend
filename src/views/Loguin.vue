<template>
  <div class="loguin">
    <Navbar/>
    <Login/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'Loguin',
  components: {
   Navbar, Login,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>