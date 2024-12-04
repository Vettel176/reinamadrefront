

<template>
    <div>
      <HelloComponent/>
      <MainTextComponent/>
      <OptionsComponet/>  
    </div>

<div class="container" v-if="logeo === 0">
    <form>
      <div class="form__group row">
        <div class="col-md-6">
          <input type="text" class="form__input" v-model="user" id="user" placeholder="Usuario" required= true />
          <label for="user" class="form__label">Usuario</label>
        </div>
        <div class="col-md-6">
          <input type="password"  class="form__input" v-model="password" id="pass" placeholder="Contraseña" required= true />
          <label for="pass" class="form__label">Contraseña</label>
        </div>
      </div>    

      <div class="row">
        <div class="col-md-12" style="text-align: center;">
          <input type="checkbox" class="checkbox-wrapper" id="minimal-checkbox" v-model="checked" />
          <label for="minimal-checkbox" class="custom-checkbox"></label>&nbsp;&nbsp; 
          <span class="textWhite">{{ checked ? "Recuerdame" : "Recuerdame" }}</span>
        </div>
            <br>
            <br>
            <div class="col-md-12" style="text-align: center;" v-if= "logeo === 0">
                <button type="submit" v-on:click.prevent ="login" class="btn btn-success btn-lg">ENTRAR</button>
            </div>
      </div>
    </form>
</div>
<div v-else-if="logeo === 1">
                <p class="textWhite centered">¡Bienvenido! &nbsp;&nbsp;&nbsp;&nbsp;
                  <button v-on:click.prevent ="tableAgendar" class="agendarBtn">Agendar cita</button></p>
                  <TableView :showAgendar = "showAgendar"  @offTableAdd = "tableAgendarOff"/>                 
</div>
<div v-else>
        <p class="textWhite centered">Uy! Al parecer no tienes acceso a reina madre. Verifica los datos de ingreso.</p>
                <p class="centered">
                  <img src="../assets/khe.png" class="sizeImg centered"  />
                </p>
          <p class="textWhite centered">¿Lo quieres intentar de nuevo?
            <button class="btn btn-secondary centered" v-on:click.prevent ="changeLogeo">Sí</button>

          </p>
</div>

</template>

<script lang="ts" setup>
    import HelloComponent from '@/components/presentacion/HelloComponent.vue';
    import MainTextComponent from '@/components/presentacion/MainTextComponent.vue';
    import OptionsComponet from '@/components/presentacion/OptionsComponet.vue';


import {onBeforeMount, ref} from 'vue';
import axios from 'axios';
import TableView from './TableView.vue';
let user = ref("");
let password =  ref("");
let logeo = ref(0);
let checked = false;
let showAgendar = ref(0);

onBeforeMount (( ) =>{
  //Ejecucion antes de que se renderise el front
  //Obtenemos el token que esta sessionStorage
  let tokenCheck = sessionStorage.getItem('token');
  if(tokenCheck){
    logeo.value = 1;
    console.log("sesion valida");
  }else{
    logeo.value = 0;
      console.log("no se encontró el token");
    }
  }
);

const changeLogeo = ()=>{
  console.log("Cambio de logeo");
  logeo.value = 0;
}

const login = async () => {
  try {
      const response = await axios.post("http://localhost:8080/clinica/user", {
      name:user.value, 
      password:password.value
    });
    if(response.data == 'token'){
      logeo.value = 1;
      sessionStorage.setItem('token', 'token');
    }else{
      logeo.value = 3;
    }
  }catch(error){
    console.error("Error al enviar datos:", error);
    }
  };

  const tableAgendar = () =>{
    console.log("Boo");
    showAgendar.value = 1;
  }

  const tableAgendarOff = () =>{
    console.log("Table add off");
    showAgendar.value = 0;
  }

</script>

<style scoped>
.sizeImg {
    width: 100%;
    max-width: 350px;
 }

 .agendarBtn{
  background-color: #c2fbd7;
  border-radius: 100px;
  box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
  color: green;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-33:hover {
  box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
}
 
</style>
