<template>
    <div class="container">
        <Formulario 
        :tarea="tarea"
        />
    </div>
</template>
<script setup lang="ts">
import Formulario from '@/components/Formulario.vue';
import { API, type ITareas } from '@/shared/constantes';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from "vue-router";

const {params} = useRoute()
const tarea = ref<null | ITareas>(null)

onBeforeMount(async () => {
    if(params.id){
        const data = await fetch(`${API}/api/task/${params. id}`)
        tarea.value = await data.json()
    }
})

</script>
<style scoped>
    
</style>