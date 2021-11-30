<template>
  <div class="body">
     <div class="container w-75 bg-primary mt-5 my-5 rounded shadow">
        <div class="row align-items-stretch">
            <div class="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded">

            </div>

            <div class="col bg-white p-5 rounded-end">
                <div class="text-center">
                <!--    <img src="https://media.discordapp.net/attachments/781159673675776042/915014653376069703/logueo.png?width=364&height=515" width="100px" class="mt-5" alt="">-->
                </div>

                <!-- Encabezado -->
                <h2 class="fw-bold text-center pt-5 mb-5">Ingresar al Sistema de Gestión de Ventas</h2>

                <!-- Validación de credenciales / Formulario de acceso o Login -->
                <form action="#">
                    <div class="mb-4">
                        <label for="email" class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" name="email">
                    </div>
                    <div class="mb-4">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" name="password">
                    </div>
                    <div class="mb-4 form-check">
                        <input type="checkbox" name="connected" class="form-check-input" id="">
                        <label for="connected" class="form-check-label">Mantener sesión activa</label>
                    </div>

                    <!-- Botón -->
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary">Ingresar</button>
                    </div>

                    <div class="my-3 text-center">
                        <span>¿Aún no tienes una cuenta? <a href="#"> Registrarse</a></span>
                        <br>
                        <span>¿Olvidaste tu contraseña? <a href="#"> Recuperar contraseña</a></span>
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
</style>
