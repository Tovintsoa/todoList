<template>
  <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Modifier une tache</h5>
          <button type="button" class="close"  data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="enregistrerSelectedTask">
            <input type="hidden" :value="selectedTask.id" id="modal_selectedTaskId">
            <div class="mb-3">
              <label for="taskName" class="form-label">Titre de la tache (*) </label>
              <input type="text" :value="selectedTask.name"   class="form-control"    id="modal_taskName" required>
            </div>
            <div class="mb-3">
              <label for="taskDescription" class="form-label">Déscription de la tache (*)</label>
              <textarea class="form-control" :value="selectedTask.description"   id="modal_taskDescription" rows="3" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Enregistrer</button>
            <button type="submit" class="btn btn-secondary mx-2" data-bs-dismiss="modal" >Annuler</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      selectedTask : {
        id: null,
        name: "",
        description: ""
      }
    }
  },
  mounted() {
    try {
      this.emitter.on("onShowModal", newObject => {
       this.selectedTask = newObject;
      });
      this.emitter.on("onDoneTask",newObject =>{
        this.selectedTask = newObject;
      })
    }
    catch(error){
      console.error(error);
    }
  },
  methods:{
    enregistrerSelectedTask()
    {
      let selectedTask = {
        id: document.getElementById('modal_selectedTaskId').value,
        name:  document.getElementById('modal_taskName').value,
        description: document.getElementById('modal_taskDescription').value
       }
      this.emitter.emit("updateTask", selectedTask);

    }
  }
}
</script>
