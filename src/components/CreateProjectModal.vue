<!-- src/components/CreateProjectModal.vue -->
<template>
    <v-dialog v-model="dialog" max-width="500">
        <v-card>
            <v-card-title>
                <span class="headline">Crear Proyecto</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Nombre del Proyecto" v-model="project.name"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea label="Descripción" v-model="project.description"></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-select :items="['Activo', 'Inactivo']" label="Estado"
                                v-model="project.active"></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="saveProject">Guardar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            project: {
                name: '',
                description: '',
                active: 'Activo'
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
        saveProject() {
            console.log('Proyecto guardado:', this.project);
            this.close();
        }
    }
}
</script>

<style scoped>
/* Estilos específicos para el modal */
</style>