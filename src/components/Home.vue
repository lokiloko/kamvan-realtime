<template lang="html">
<div id="home">
  <md-button class="md-primary md-raised" @click="openDialog('dialogKanbanName')">Go to Kanban</md-button>
  <md-dialog ref="dialogKanbanName">
    <form @submit.stop.prevent="go">
      <md-dialog-title>Create new Kanban</md-dialog-title>
      <md-dialog-content>
        <md-input-container>
          <label>Kanban Name</label>
          <md-input required type="text" v-model="kanbanName"></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="openDialog('dialogKanbanCreate'); closeDialog('dialogKanbanName')">Create New</md-button>
        <md-button class="md-primary">Go</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
  <md-dialog ref="dialogKanbanCreate">
    <form @submit.stop.prevent="submit">
    <md-dialog-title>Create new Kanban</md-dialog-title>
      <md-dialog-content>
          <md-input-container>
            <label>Kanban Name</label>
            <md-input type="text" required v-model="kanbanName"></md-input>
          </md-input-container>
          <md-input-container md-has-password>
            <label>Kanban Secret</label>
            <md-input type="password" required v-model="kanbanPass"></md-input>
          </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="openDialog('dialogKanbanName');closeDialog('dialogKanbanCreate')">Cancel</md-button>
        <md-button class="md-primary" type="submit">Create</md-button>
      </md-dialog-actions>
      </form>
  </md-dialog>
  <!-- <md-button class="md-primary md-raised" @click="openDialog('dialogKanbanName')">Prompt</md-button> -->
</div>
</template>

<script>
import db from '@/firebase/firebase'
export default {
  data: () => {
    return {
      prompt: {
        title: 'What\'s your kanban name?',
        ok: 'Done',
        cancel: 'Cancel',
        id: 'name',
        name: 'name',
        placeholder: 'Type your kanban name...',
        maxlength: 30,
        value: ''
      },
      kanbanName: '',
      kanbanPass: ''
    }
  },
  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    submit () {
      this.closeDialog('dialogKanbanCreate')
      console.log(this.kanbanName)
      console.log(this.kanbanPass)
    },
    go () {
      this.closeDialog('dialogKanbanName')
    }
  },
  firebase: {
    kanban: {
      source: db.ref('/'),
      asObject: true
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.$refs['dialogKanbanName'].open()
    })
  }
}
</script>

<style lang="css">
#home {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://media.giphy.com/media/RopTs3DIHoDfi/giphy.gif') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
