<!-- src/components/CreateProjectModal.vue -->
<template>
  <!-- Componente de diálogo para el modal -->
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <!-- Título del modal -->
      <v-card-title>
        <span class="headline">Crear Proyecto</span>
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
        <v-spacer></v-spacer> <!-- Espaciador para alinear los botones -->
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn> <!-- Botón para cerrar el modal sin guardar -->
        <v-btn color="blue darken-1" text @click="saveProject">Guardar</v-btn> <!-- Botón para guardar el proyecto -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false, // Estado del modal (abierto o cerrado)
      localProject: { name: '', description: '', active: 'Activo' }
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    saveProject() {
      this.$emit('project-saved', { ...this.localProject });
      this.close();
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para el modal */
</style>
