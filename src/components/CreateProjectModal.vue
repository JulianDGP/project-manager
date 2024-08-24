<!-- src/components/CreateProjectModal.vue -->

<template>
  <!-- Componente de diálogo para el modal -->
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <!-- Título del modal -->
      <v-card-title>
        <span class="headline">{{ project ? 'Editar Proyecto' : 'Crear Proyecto' }}</span>
      </v-card-title>

      <!-- Contenido del modal -->
      <v-card-text>
        <v-container>
          <v-row>
            <!-- Campo de texto para el nombre del proyecto -->
            <v-col cols="12">
              <v-text-field label="Nombre del Proyecto" v-model="localProject.name"></v-text-field>
            </v-col>
            <!-- Campo de texto para la descripción del proyecto -->
            <v-col cols="12">
              <v-textarea label="Descripción" v-model="localProject.description"></v-textarea>
            </v-col>
            <!-- Selección para el estado del proyecto -->
            <v-col cols="12">
              <v-select :items="['Activo', 'Inactivo']" label="Estado" v-model="localProject.active"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- Acciones del modal (botones) -->
      <v-card-actions>
        <!-- Espaciador para alinear los botones -->
        <v-spacer></v-spacer>
        <!-- Botón para cerrar el modal sin guardar -->
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
        <!-- Botón para guardar el proyecto -->
        <v-btn color="blue darken-1" text @click="saveProject">{{ project ? 'Actualizar' : 'Guardar' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialog: false, // Estado del modal (abierto o cerrado)
      localProject: this.project ? { ...this.project } : { name: '', description: '', active: 'Activo' } // Datos del proyecto que se va a crear
    };
  },
  watch: {
    project: { // Datos del proyecto que se va a crear
      inmediate: true,
      handler(newVal){
        if(newVal){
          this.localProject = { ...newVal };
        } else {
          this.localProject = { name: '', description: '', active: 'Activo' };
        }
      }
    }
  },
methods: {
  open() {// Método para abrir el modal
    this.dialog = true;
  },
  close() {// Método para cerrar el modal
    this.dialog = false;
  },
  saveProject() {  // Método para guardar el proyecto
    // Emitir un evento al componente padre con los datos del nuevo proyecto
    this.$emit('project-saved', this.localProject);
    // Cerrar el modal después de guardar
    this.close();
  }
}
}
</script>

<style scoped>
/* Estilos específicos para el modal */
</style>