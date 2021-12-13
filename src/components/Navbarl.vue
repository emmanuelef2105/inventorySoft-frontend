<template>
  <div >
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <img class="imagen" src="https://media.discordapp.net/attachments/781159673675776042/907388496782717008/Nlogo.png?width=771&height=434">
                
        </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
 
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
nav{
    width: 100%;
    height: 75px;
    padding: 0;
    
}
.container-fluid{
    padding: 0 15px 0 0;
    background-color: #1A382D;
    
}
.imagen{
    height: 75px;
}
</style>