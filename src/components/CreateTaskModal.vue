<!-- src/components/CreateTaskModal.vue -->
<template>
  <!-- Modal para crear una tarea -->
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <!-- Título del modal -->
      <v-card-title>
        <span class="headline">Crear Tarea</span>
      </v-card-title>

      <!-- Contenido del modal -->
      <v-card-text>
        <v-container>
          <v-row>
            <!-- Campo de texto para el nombre de la tarea -->
            <v-col cols="12">
              <v-text-field label="Nombre de la Tarea" v-model="task.name"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea label="Descripción" v-model="task.description"></v-textarea>
            </v-col>
            <!-- Selección para el estado de la tarea -->
            <v-col cols="12">
              <v-select :items="['Pendiente', 'En Progreso', 'Completada']" label="Estado"
                v-model="task.status"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <!-- Acciones del modal (botones) -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Botón para cerrar el modal sin guardar -->
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
        <!-- Botón para guardar la tarea -->
        <v-btn color="blue darken-1" text @click="saveTask">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false, // Estado del modal (abierto o cerrado)
      task: {
        name: '',// Nombre de la tarea
        description: '', // Descripción de la tarea
        status: 'Pendiente' // Estado de la tarea por defecto
      }
    };
  },
  methods: {
    open() { // Método para abrir el modal
      this.dialog = true;
    },
    close() { // Método para cerrar el modal
      this.dialog = false;
    },
    saveTask() { // Método para guardar la tarea
      this.$emit('task-saved', { ...this.task }); // Emitir un evento al componente padre con los datos de la nueva tarea
      this.close(); // Cerrar el modal después de guardar
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para el modal de crear tarea */
</style>
