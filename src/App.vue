<template>
  <div class="contenedor-principal">
    <router-view/>
  </div>
  
</template>

<script setup>
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.contenedor-principal {
  max-height: 100vh; /* Limita la altura al tamaño de la ventana */
  overflow: auto; /* Permite el scroll si el contenido es más alto */
}
</style>
