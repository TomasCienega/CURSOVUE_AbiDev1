<template>
    <div class="container">
        <button v-on:click="irAlFormulario" class="btn btn-outline-success my-4"><i class="fa-solid fa-plus"></i>
            Agregar</button>
        <Tabla></Tabla>
    </div>
</template>
<script setup lang="ts">
import Tabla from '@/components/Tabla.vue';
import { useRouter } from "vue-router";


const router = useRouter();
const irAlFormulario = () => {
    router.push('/tareas-formulario')
}
</script>
<style scoped></style>