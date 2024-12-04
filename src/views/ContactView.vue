<template>
      <div>
      <HelloComponent/>
      <MainTextComponent/>
      <OptionsComponet/>  
    </div>
    <div class="container mt-5">
    <h2 class="text-center mb-4 textWhite">Comunícate con nosotros!. La salud es primero.</h2>
    <form>
      <div class="mb-3">
        
        <input type="text" class="form-control" id="name" placeholder="Tu nombre" required>
      </div>

      <div class="mb-3">
        
        <input type="email" class="form-control" id="email" placeholder="tuemail@ejemplo.com" required>
      </div>

      <div class="mb-3">
        
        <input type="text" class="form-control" id="subject" placeholder="Motivo del contacto" required>
      </div>

      <div class="mb-3">
       
        <textarea class="form-control" id="message" rows="4" placeholder="Escribe tu mensaje" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary w-100">Enviar</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
    import HelloComponent from '@/components/presentacion/HelloComponent.vue';
    import MainTextComponent from '@/components/presentacion/MainTextComponent.vue';
    import OptionsComponet from '@/components/presentacion/OptionsComponet.vue';
</script>

<style>
</style>