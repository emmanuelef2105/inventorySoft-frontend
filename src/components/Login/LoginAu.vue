<template>
  <div class="body">
     <div class="container w-75 bg-primary mt-5 my-5 rounded shadow">
        <div class="row align-items-stretch">
            <div class="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded">

            </div>

            <div class="col bg-white p-5 rounded-end">
                <div class="text-center">
               
                </div>

                <!-- Encabezado -->
                <h2 class="fw-bold text-center pt-5 mb-5">Ingresar al Sistema de Gestión de Inventario</h2>

                <!-- Validación de credenciales / Formulario de acceso o Login -->
                <form action="#/auproductos">
                    <div class="mb-4">
                        <label for="email" class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" name="email">
                    </div>
                    <br>
                    <br>
                    <div class="mb-4">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" name="password">
                    </div>
                    <br>
                    <br>
                    <br>
                    <br>
                    <!-- Botón -->
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary">
                           Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>


  </div>
</template>

<style>
.body{
    background: #112031;
    background: linear-gradient(to right, #152D35, #112031);
}

h2{
    font-family: Google-apple-system, 'Poppins';
    color: black;
}

label, span{
    color: black;
}

.bg{
    background-image: url(https://media.discordapp.net/attachments/781159673675776042/915016572530221126/logueo3.png?width=473&height=515);
    background-position: center center;
    background-size: cover;
}
a {
    color: White;
    text-decoration: none;
}

a:hover 
{
     color:white; 
     text-decoration:none; 
     cursor:pointer;  
}
</style>
