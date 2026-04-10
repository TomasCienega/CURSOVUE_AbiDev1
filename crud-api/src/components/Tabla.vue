<template>
    <div class="card">
        <table class="table table-responsive">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descipcion</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tareas" :key="item._id">
                    <th scope="row">{{ item._id }}</th>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.status ? 'Pendiente' : 'Realizada' }}</td>
                    <td><button class="btn btn-outline-primary btn-sm" @click="editar(item._id)"><i
                                class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-outline-danger btn-sm ms-2" v-on:click="eliminar(item)"><i
                                class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { API, type ITareas } from "@/shared/constantes";
import { useRouter } from "vue-router";

const tareas = ref<ITareas[]>([])
const router = useRouter();
const editar = async (id:string) => {
    router.push(`/tareas-formulario/${id}`)
}
const eliminar = async ({ name, _id }: ITareas) => {
    const respuesta =
        confirm(`¿Estas seguro que deseas eliminar a ${name}`)

    if (respuesta) {
        const data = await fetch(`${API}/api/task/${_id}`, {
            method: 'DELETE'
        })
        const tarea = await data.json()
        if (tarea) {
            tareas.value = tareas.value.filter((x: { _id: string; }) => x._id !== _id)
        }
    }
}
onMounted(async () => {
    const data = await fetch(`${API}/api/task`)
    tareas.value = await data.json()
})
</script>
<style scoped></style>