<template>
  <div class="loguin">
    <Navbarl/>
    <Login/>
  </div>
</template>

<script>
import Navbarl from '@/components/Navbarl.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'Loguin',
  components: {
   Navbarl, Login,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>