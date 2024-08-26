// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
    state: {
        projects: [], // Estado inicial de la lsita de proyectos
    },
    mutations: {
        SET_PROJECTS(state, projects) {
            state.projects = projects;
        },
        ADD_PROJECT(state, project) {
            project.id = state.projects.length + 1;
            project.tasks = [];
            state.projects.push(project);
            console.log('Guardando proyectos en localStorage:', state.projects);
            localStorage.setItem('projects', JSON.stringify(state.projects)); // Guardar en localStorage
        },
        UPDATE_PROJECT(state, updatedProject) {
            const index = state.projects.findIndex(p => p.id === updatedProject.id);
            if (index !== -1) {
                state.projects.splice(index, 1, updatedProject);
                localStorage.setItem('projects', JSON.stringify(state.projects)); // Guardar en localStorage
            }
        },
        DELETE_PROJECT(state, projectId) {
            state.projects = state.projects.filter(p => p.id !== projectId);
            localStorage.setItem('projects', JSON.stringify(state.projects)); // Guardar en localStorage
        }
    },
    actions: {
        loadProjects({ commit }) {
            const storedProjects = localStorage.getItem('projects');
            if (storedProjects) {
                commit('SET_PROJECTS', JSON.parse(storedProjects));
            } else {
                // Si no hay proyectos guardados, inicializar con un array vacío
                commit('SET_PROJECTS', []);
            }
        },
        addProject({ commit }, project) {
            commit('ADD_PROJECT', project); // Agregar proyecto
        },
        updateProject({ commit }, updatedProject) {
            commit('UPDATE_PROJECT', updatedProject); // Actualizar proyecto
        },
        deleteProject({ commit }, projectId) {
            commit('DELETE_PROJECT', projectId); // Eliminar proyecto
        }
    },
    modules: {
        // definicion de los modulos que se pueden importar para separar la logica de la aplicacion
    }

})