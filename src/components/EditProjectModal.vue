<template>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Editar Proyecto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Nombre del Proyecto" v-model="localProject.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Descripción" v-model="localProject.description"></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-select :items="['Activo', 'Inactivo']" label="Estado" v-model="localProject.active"></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="saveProject">Actualizar</v-btn>
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
        dialog: false,
        localProject: this.project ? { ...this.project } : { name: '', description: '', active: 'Activo' }
      };
    },
    watch: {
      project: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.localProject = { ...newVal };
          } else {
            this.localProject = { name: '', description: '', active: 'Activo' };
          }
        }
      }
    },
    methods: {
      open() {
        this.dialog = true;
      },
      close() {
        this.dialog = false;
      },
      saveProject() {
        this.$emit('project-saved', { ...this.localProject }); // Emitir un evento para que el componente padre lo maneje
        this.close();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos para el modal */
  </style>
  