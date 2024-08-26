<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>
        <span class="headline">Crear Tarea</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nombre de la Tarea" v-model="task.name"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea label="Descripción" v-model="task.description"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-select :items="['Pendiente', 'En Progreso', 'Completada']" label="Estado" v-model="task.status"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="saveTask">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      task: {
        name: '',
        description: '',
        status: 'Pendiente'
      }
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    saveTask() {
      this.$emit('task-saved', { ...this.task });
      this.close();
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para el modal de crear tarea */
</style>
