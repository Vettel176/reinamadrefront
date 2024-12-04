<template>
    <div>
    <HelloComponent/>
    <MainTextComponent/>
    <OptionsComponet/>  
  </div>
  <div class="container mt-5">
  <h2 class="text-center mb-4 textWhite">Politica de Privacidad</h2>
    <div class="mb-3 textWhite">
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus consequatur facere nisi numquam recusandae iste ullam, eius praesentium quod voluptates eligendi dolorem esse provident sapiente perferendis iure doloribus ratione corrupti!
    </div>
</div>
</template>

<script lang="ts" setup>
  import HelloComponent from '@/components/presentacion/HelloComponent.vue';
  import MainTextComponent from '@/components/presentacion/MainTextComponent.vue';
  import OptionsComponet from '@/components/presentacion/OptionsComponet.vue';
</script>

<style>
</style>