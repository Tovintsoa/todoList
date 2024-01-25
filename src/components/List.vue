
<template>
  <div class="row">
    <div class="col-12 my-2">
      Nombre de tache non fait: {{ countTrueStates }}
    </div>
    <div class="col-12 mt-5">
      <h5 >Liste des taches</h5>
      <table class="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Etat</th>
          <th>Titre</th>
          <th>Déscription</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>
            <span class="badge bg-success" v-if="item.state"> <i class="bi bi-check-lg " ></i> </span>
            <span class="badge bg-danger"  v-else>
               <i class="bi bi-x-lg "></i>
            </span>
          </td>

          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td class="text-center d-flex justify-content-end">
            <button class="btn btn-success me-1 btn-sm" v-if="!item.state" @click="taskDone(item)">Marqué comme fait</button>
            <button class="btn btn-primary me-1 btn-sm" @click="showModal(item)">Modifier</button>
            <button class="btn btn-danger me-1 btn-sm" @click="removeTask(item.id)">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <ModalVue></ModalVue>
</template>
<style>
@import "bootstrap-icons/font/bootstrap-icons.css";
</style>
<script>
import ModalVue from "@/components/Modal.vue";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Modal } from 'bootstrap';
export default {
  components: {ModalVue},
  data(){
    return {
      items: [
        { id: 1, name: 'Tache 1 ', state:true, description: 'Description Tache 1' },
        { id: 2, name: 'Tache 2 ',state:false, description: 'Description Tache 2' },
        { id: 3, name: 'Tache 3 ',state:false, description: 'Description Tache 3' },
        { id: 4, name: 'Item 4',state:false, description: 'Description 4' },

      ],
      modal : null,
    }
  },
  computed: {
    countTrueStates() {
      return this.items.filter(item => item.state === true).length;
    }
  },
   mounted() {
    try {
      this.modal = new Modal(document.getElementById('exampleModalLong'));
      this.emitter.on("formSubmitted", newObject => {
        this.items.push(newObject);
      });
      this.emitter.on('updateTask', newObject => {
        const index = this.items.findIndex(item => item.id === parseInt(newObject.id));
        this.items[index] = newObject
        this.modal.hide();
      })

    }
    catch(error){
      console.error(error);
    }
  },
  methods:{
    removeTask(id)
    {
      const index = this.items.findIndex(item => item.id === id);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    showModal(item)
    {
      this.emitter.emit("onShowModal", item);
      this.modal.show();
    },
    taskDone(item)
    {
      item.state = true;
      this.emitter.emit('onDoneTask',item);
    }
  }
};
</script>