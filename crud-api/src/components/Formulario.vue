<template>
    <div class="card mx-auto mt-5 card-formulario">
        <h1 class="card-header my-2">{{ tarea ? 'Editar' : 'Agregar' }} Tarea</h1>
        <form class="card-body" @submit.prevent="procesarFormulario">
            <input class="form-control my-2" type="text" v-model="formData.nombre" placeholder="Nombre" required="true">
            <input class="form-control my-2" type="text" v-model="formData.descripcion" placeholder="Descripcion"
                required="true">
            <button :disabled="cargando" class="btn btn-outline-primary w-100 ">Guardar</button>
        </form>

    </div>
</template>

<script setup lang="ts">
import { API, type ITareas } from "@/shared/constantes";
import { computed, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
    tarea: {
        type: Object as () => ITareas | null,
        default: null
    }
})

const formData = reactive({
    nombre: '',
    descripcion: ''
})
const cargando = ref(false)
const router = useRouter()
const tarea = computed(() => props.tarea)
watch(tarea, () => {
    // Si 'name' es undefined, asígnale un texto vacío ''
    formData.nombre = tarea.value?.name ?? '';
    formData.descripcion = tarea.value?.description ?? '';
});

const procesarFormulario = async () => {
    cargando.value = true;
    if (tarea.value) {
        await fetch(`${API}/api/task/${tarea.value._id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name: formData.nombre, description: formData.descripcion }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    else {
        await fetch(`${API}/api/task`, {
            method: 'POST',
            body: JSON.stringify({ name: formData.nombre, description: formData.descripcion }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    console.log("Datos a enviar:", {
        name: formData.nombre,
        description: formData.descripcion
    });
    cargando.value = false;
    router.back()
}
</script>
<style scoped>
.card-formulario {
    width: 350px;
}
</style>