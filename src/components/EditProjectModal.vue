<template>
  <!-- Modal de diálogo para editar un proyecto -->
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <!-- Título del modal -->
      <v-card-title>
        <span class="headline">Editar Proyecto</span>
      </v-card-title>

      <!-- Contenido del modal -->
      <v-card-text>
        <v-container>
          <v-row>
            <!-- Campo de texto para el nombre del proyecto -->
            <v-col cols="12">
              <v-text-field 
                label="Nombre del Proyecto" 
                v-model="localProject.name"
                :rules="[v => !!v || 'El nombre del proyecto es obligatorio']"
                :error-messages="nameErrors"
                @blur="validateName"
                required
              ></v-text-field>
            </v-col>

            <!-- Campo de texto para la descripción del proyecto -->
            <v-col cols="12">
              <v-textarea 
                label="Descripción" 
                v-model="localProject.description"
                :rules="[v => !!v || 'La descripción es obligatoria']"
                :error-messages="descriptionErrors"
                @blur="validateDescription"
                required
              ></v-textarea>
            </v-col>

            <!-- Selección para el estado del proyecto -->
            <v-col cols="12">
              <v-select 
                :items="['Activo', 'Inactivo']" 
                label="Estado" 
                v-model="localProject.active"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- Acciones del modal (botones) -->
      <v-card-actions>
        <v-spacer></v-spacer> <!-- Espaciador para alinear los botones -->
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn> <!-- Botón para cerrar el modal sin guardar -->
        <v-btn color="blue darken-1" text @click="saveProject">Actualizar</v-btn> <!-- Botón para guardar los cambios -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  // Propiedad "project" que recibe el objeto del proyecto a editar desde el componente padre
  props: {
    project: {
      type: Object, // Espera un objeto como prop
      default: null // Valor por defecto es null
    }
  },
  data() {
    return {
      dialog: false, // Estado del modal (abierto o cerrado)
      // Clonar el objeto del proyecto para evitar mutaciones directas
      localProject: this.project ? { ...this.project } : { name: '', description: '', active: 'Activo' },
      nameErrors: [], // Array para los mensajes de error del campo "Nombre del Proyecto"
      descriptionErrors: [], // Array para los mensajes de error del campo "Descripción"
    };
  },
  watch: {
    // Observa cambios en la prop "project"
    project: {
      immediate: true, // Ejecutar el handler inmediatamente
      handler(newVal) {
        if (newVal) {
          // Si se proporciona un nuevo proyecto, clonar sus datos en "localProject"
          this.localProject = { ...newVal };
        } else {
          // Si no hay proyecto, resetear "localProject"
          this.localProject = { name: '', description: '', active: 'Activo' };
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
    // Método para guardar los cambios del proyecto
    saveProject() {
      // Validar ambos campos antes de guardar
      const isNameValid = this.validateName();
      const isDescriptionValid = this.validateDescription();

      // Si ambos campos son válidos, emitir el evento para guardar
      if (isNameValid && isDescriptionValid) {
        this.$emit('project-saved', { ...this.localProject }); // Emitir un evento para que el componente padre lo maneje
        this.close(); // Cerrar el modal después de guardar
      }
    },
    // Validar el campo "Nombre del Proyecto"
    validateName() {
      this.nameErrors = [];
      // Verificar si el nombre del proyecto está vacío
      if (!this.localProject.name) {
        this.nameErrors.push('El nombre del proyecto es obligatorio');
        return false;
      }
      return true;
    },
    // Validar el campo "Descripción"
    validateDescription() {
      this.descriptionErrors = [];
      // Verificar si la descripción está vacía
      if (!this.localProject.description) {
        this.descriptionErrors.push('La descripción es obligatoria');
        return false;
      }
      return true;
    },
    // Limpiar los errores de validación
    clearErrors() {
      this.nameErrors = [];
      this.descriptionErrors = [];
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para el modal */
</style>
