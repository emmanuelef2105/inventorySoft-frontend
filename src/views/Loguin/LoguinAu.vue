<template>
  <div class="loguina">
    <Navbarl/>
    <LoginAu/>
  </div>
</template>

<script>
import Navbarl from '@/components/Navbarl.vue'
import LoginAu from '@/components/Login/LoginAu.vue'

export default {
  name: 'Loguina',
  components: {
   Navbarl, LoginAu,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>