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
              <v-text-field label="Nombre de la Tarea" v-model="task.name"
                :rules="[v => !!v || 'El nombre de la tarea es obligatorio']" :error-messages="nameErrors"
                @blur="validateName" required></v-text-field>
            </v-col>

            <!-- Campo de texto para la descripción de la tarea -->
            <v-col cols="12">
              <v-textarea label="Descripción" v-model="task.description"
                :rules="[v => !!v || 'La descripción es obligatoria']" :error-messages="descriptionErrors"
                @blur="validateDescription" required></v-textarea>
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
        <v-spacer></v-spacer> <!-- Espaciador para alinear los botones -->
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
        name: '', // Nombre de la tarea
        description: '', // Descripción de la tarea
        status: 'Pendiente' // Estado de la tarea por defecto
      },
      nameErrors: [], // Array para los mensajes de error del campo "Nombre de la Tarea"
      descriptionErrors: [], // Array para los mensajes de error del campo "Descripción"
    };
  },
  methods: {
    // Método para abrir el modal
    open() {
      this.resetForm(); // Reinicia el formulario antes de abrir el modal
      this.dialog = true;
    },
    // Método para cerrar el modal
    close() {
      this.dialog = false;
      this.clearErrors(); // Limpiar errores al cerrar
    },
    // Método para guardar la tarea
    saveTask() {
      // Validar ambos campos antes de guardar
      const isNameValid = this.validateName();
      const isDescriptionValid = this.validateDescription();

      // Si ambos campos son válidos, emitir el evento para guardar
      if (isNameValid && isDescriptionValid) {
        this.$emit('task-saved', { ...this.task }); // Emitir un evento al componente padre con los datos de la nueva tarea
        this.close(); // Cerrar el modal después de guardar
      }
    },
    // Validar el campo "Nombre de la Tarea"
    validateName() {
      this.nameErrors = [];
      // Verificar si el nombre de la tarea está vacío
      if (!this.task.name) {
        this.nameErrors.push('El nombre de la tarea es obligatorio');
        return false;
      }
      return true;
    },
    // Validar el campo "Descripción"
    validateDescription() {
      this.descriptionErrors = [];
      // Verificar si la descripción está vacía
      if (!this.task.description) {
        this.descriptionErrors.push('La descripción es obligatoria');
        return false;
      }
      return true;
    },
    // Limpiar los errores de validación
    clearErrors() {
      this.nameErrors = [];
      this.descriptionErrors = [];
    },
    // Método para reiniciar el formulario
    resetForm() {
      this.task = { name: '', description: '', status: 'Pendiente' };
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para el modal de crear tarea */
</style>