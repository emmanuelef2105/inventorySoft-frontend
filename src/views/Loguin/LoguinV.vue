<template>
  <div class="loguinv">
    <Navbarl/>
    <LoginV/>
  </div>
</template>

<script>
import Navbarl from '@/components/Navbarl.vue'
import LoginV from '@/components/Login/LoginV.vue'

export default {
  name: 'Loguinv',
  components: {
   Navbarl, LoginV,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>