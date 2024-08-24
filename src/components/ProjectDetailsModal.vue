<!-- src/components/ProjectDetailsModal.vue -->

<template>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <!-- Título del modal -->
        <v-card-title>
          <span class="headline">{{ project.name }}</span>
        </v-card-title>
  
        <!-- Contenido del modal -->
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <!-- Mostrar la descripción del proyecto -->
                <p><strong>Descripción:</strong> {{ project.description }}</p>
              </v-col>
              <v-col cols="12">
                <!-- Mostrar el estado del proyecto -->
                <p><strong>Estado:</strong> {{ project.active }}</p>
              </v-col>
              <!-- Botón para abrir el modal de creación de tareas -->
              <v-col cols="12">
                <v-btn color="primary" @click="openCreateTaskModal">Crear Tarea</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
  
        <!-- Acciones del modal (botones) -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Botón para cerrar el modal -->
          <v-btn color="blue darken-1" text @click="close">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      project: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        dialog: false, // Estado del modal (abierto o cerrado)
      };
    },
    methods: {
      open() {
        this.dialog = true;
      },
      close() {
        this.dialog = false;
      },
      openCreateTaskModal() {
        //Lógica para abrir el modal de creación de tareas
        console.log('Abrir modal para crear tarea');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Estilos específicos para el modal de detalles del proyecto */
  </style>
  