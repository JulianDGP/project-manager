<template>
    <!-- Modal para editar una tarea -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <!-- Título del modal -->
        <v-card-title>
          <span class="headline">Editar Tarea</span>
        </v-card-title>
  
        <!-- Contenido del modal -->
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Campo de texto para el nombre de la tarea -->
              <v-col cols="12">
                <v-text-field 
                  label="Nombre de la Tarea" 
                  v-model="localTask.name"
                  :rules="[v => !!v || 'El nombre de la tarea es obligatorio']"
                  :error-messages="nameErrors"
                  @blur="validateName"
                  required
                ></v-text-field>
              </v-col>
  
              <!-- Campo de texto para la descripción de la tarea -->
              <v-col cols="12">
                <v-textarea 
                  label="Descripción" 
                  v-model="localTask.description"
                  :rules="[v => !!v || 'La descripción es obligatoria']"
                  :error-messages="descriptionErrors"
                  @blur="validateDescription"
                  required
                ></v-textarea>
              </v-col>
  
              <!-- Selección para el estado de la tarea -->
              <v-col cols="12">
                <v-select 
                  :items="['Pendiente', 'En Progreso', 'Completada']" 
                  label="Estado"
                  v-model="localTask.status"
                ></v-select>
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
          <v-btn color="blue darken-1" text @click="saveTask">Actualizar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      task: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        dialog: false, // Estado del modal (abierto o cerrado)
        localTask: { ...this.task }, // Clonar el objeto de la tarea para evitar mutaciones directas
        nameErrors: [], // Array para los mensajes de error del campo "Nombre de la Tarea"
        descriptionErrors: [], // Array para los mensajes de error del campo "Descripción"
      };
    },
    watch: {
      task: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.localTask = { ...newVal };
          }
        }
      }
    },
    methods: {
      // Método para abrir el modal
      open() {
        this.dialog = true;
      },
      // Método para cerrar el modal
      close() {
        this.dialog = false;
        this.clearErrors(); // Limpiar errores al cerrar
      },
      // Método para guardar los cambios en la tarea
      saveTask() {
        const isNameValid = this.validateName();
        const isDescriptionValid = this.validateDescription();
  
        if (isNameValid && isDescriptionValid) {
          this.$emit('task-updated', { ...this.localTask });
          this.close();
        }
      },
      validateName() {
        this.nameErrors = [];
        if (!this.localTask.name) {
          this.nameErrors.push('El nombre de la tarea es obligatorio');
          return false;
        }
        return true;
      },
      validateDescription() {
        this.descriptionErrors = [];
        if (!this.localTask.description) {
          this.descriptionErrors.push('La descripción es obligatoria');
          return false;
        }
        return true;
      },
      clearErrors() {
        this.nameErrors = [];
        this.descriptionErrors = [];
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para el modal de editar tarea */
  </style>
  