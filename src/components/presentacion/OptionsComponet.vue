<template>
  <div class="button-container">
    <router-link to="/auth">    <button class="button-63" role="button" >Acceso</button> </router-link>
    <router-link to="/contact"><button class="button-63" role="button">Contacto</button></router-link>
    <router-link to="/privacy">  <button class="button-63" role="button">Privacy</button></router-link>
  </div>
  <transition name="fade">
    <!-- Validacion si la ruta tiene una longitud mayor a la tuta principal "/" (desaparecemos el logo)-->
    <div v-show="activeRoute.length  < 2" style="text-align: center;">
      <LogoComponent/>
    </div>
  </transition>
  <br>
</template>

<script lang="ts" setup>
  import LogoComponent from '@/components/presentacion/LogoComponent.vue';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';


    const route = useRoute ()
    const activeRoute = ref(route.path);
    //obtenemos el valor de la ruta y la asiganamos a uan variables

    watch(route, () => {
      activeRoute.value = route.path;  // Actualiza la ruta activa cuando cambie
    });



</script>

<style scoped>
.button-container {
    display: flex;
    justify-content: center; /* Centra horizontalmente */
    align-items: center;     /* Centra verticalmente si es necesario */
    gap: 10px;               /* Espacio entre los botones */
    /*height: 50vh;            Altura completa de la ventana para centrar verticalmente */
}

/* CSS */
.button-63 {
  align-items: center;
  background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #FFFFFF;
  display: flex;
  font-family: Phantomsans, sans-serif;
  font-size: 20px;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 100px;
  padding: 18px 10px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
}

.button-63:active,
.button-63:hover {
  outline: 0;
}

@media (min-width: 800px) {
  .button-63 {
    font-size: 24px;
    min-width: 196px;
  }
}
</style>


