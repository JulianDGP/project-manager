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
          </v-row>


          <!-- Mostrar estadísticas de las tareas -->
          <v-row v-if="project.tasks && project.tasks.length">
            <v-col cols="12">
              <p><strong>Estadísticas de Tareas:</strong></p>
              <ul>
                <li>Pendientes: {{ taskStatistics.pending }}</li>
                <li>En Progreso: {{ taskStatistics.inProgress }}</li>
                <li>Completadas: {{ taskStatistics.completed }}</li>
              </ul>
            </v-col>
          </v-row>


          <!-- Botón para abrir el modal de creación de tareas -->
          <v-btn color="primary" @click="openCreateTaskModal">Crear Tarea</v-btn>

          <!-- Mostrar lista de tareas del proyecto -->
          <v-row v-if="project.tasks && project.tasks.length">
            <v-col cols="12" v-for="task in project.tasks" :key="task.id">
              <v-card>
                <v-card-title>{{ task.name }}</v-card-title>
                <v-card-subtitle>{{ task.status }}</v-card-subtitle>
                <v-card-text>{{ task.description }}</v-card-text>
              </v-card>
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


    <!-- Modal Crear Tarea -->
    <CreateTaskModal ref="createTaskModal" @task-saved="addTask" />
  </v-dialog>
</template>

<script>
import CreateTaskModal from './CreateTaskModal.vue'; // Importar el componente de creación de tareas
export default {
  props: {
    project: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialog: false, // Estado del modal (abierto o cerrado)
    };
  },
  components: {
    CreateTaskModal
  },
  computed:{
    taskStatistics(){
      const stats ={
        pending: 0,
        inProgress: 0,
        completed: 0
      };
      if(this.project.tasks){
        this.project.tasks.forEach(task =>{
          if(task.status === 'Pendiente') stats.pending++;
          if(task.status === 'En Progreso') stats.inProgress++;
          if(task.status === 'Completada') stats.completed++;
        });
      }
      return stats;
    }
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
      if (this.$refs.createTaskModal) {
        this.$refs.createTaskModal.open(); // Abrir el modal de creación de tareas
      }
    },
    addTask(newTask) {
      if (!this.project.tasks) { // Método para añadir una nueva tarea al proyecto
        this.project.tasks = [];
      }
      newTask.id = this.project.tasks.length + 1; // Asignar un ID único a la tarea
      this.project.tasks.push(newTask); // Añadir la tarea a la lista de tareas del proyecto
      console.log('Nueva tarea añadida:', newTask); // Verificación en consola
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para el modal de detalles del proyecto */
</style>