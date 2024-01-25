<template>
  <div class="row">
    <div class="col-12">
      <div class="card mt-5">
        <div class="card-body">
          <h5 class="card-title">Ajouter une tache</h5>
          <!-- Bootstrap Form -->
          <form @submit.prevent="submitForm">
            <!-- Task Name Input -->
            <div class="mb-3">
              <label for="taskName" class="form-label">Titre de la tache (*)</label>
              <input type="text" v-model="taskName" class="form-control" id="taskName" required>
            </div>

            <!-- Task Description Input -->
            <div class="mb-3">
              <label for="taskDescription" class="form-label">Déscription de la tache (*)</label>
              <textarea v-model="taskDescription" class="form-control" id="taskDescription" rows="3" required></textarea>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskName: '',
      taskDescription: '',
    };
  },
  methods: {
    submitForm() {
      const newObject = {
        id: Math.floor(Math.random() * (91) + 10),
        name:this.taskName,
        description: this.taskDescription,
        state: false
      }
      this.taskName = '';
      this.taskDescription = '';
      this.emitter.emit("formSubmitted", newObject);
      this.$router.push({name:'list_todolist'});
    },
  },
};
</script>
