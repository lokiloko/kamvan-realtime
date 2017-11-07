<template lang="html">
<div id="home">
  <md-button class="md-primary md-raised" @click="openDialog('dialogKanbanName')">Go to Kanban</md-button>
  <md-dialog ref="dialogKanbanName">
    <form @submit.stop.prevent="go">
      <md-dialog-title>Go to Your Kanban</md-dialog-title>
      <md-dialog-content>
        <md-input-container>
          <label>Kanban Name</label>
          <md-input required type="text" v-model="kanbanName"></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="openDialog('dialogKanbanCreate'); closeDialog('dialogKanbanName')">Create New</md-button>
        <md-button class="md-primary" @click="go">Go</md-button>
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
  <md-dialog-alert
    :md-content="alert.content"
    :md-ok-text="alert.ok"
    ref="dialog3">
  </md-dialog-alert>
  <!-- <md-button class="md-primary md-raised" @click="openDialog('dialogKanbanName')">Prompt</md-button> -->
</div>
</template>

<script>
import db from '@/firebase/firebase'
import crypto from 'crypto'

export default {
  data: () => {
    return {
      kanbanName: '',
      kanbanPass: '',
      alert: {
        content: 'Your task has been added!',
        ok: 'Cool!'
      }
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
      const hash = crypto.createHmac('sha256', process.env.SECRET_KEY)
                   .update(this.kanbanPass)
                   .digest('hex')
      db.ref('/' + this.kanbanName).set({
        secret: hash,
        backlog: [],
        todo: [],
        doing: [],
        done: []
      }).then((data) => {
        this.$router.push('/' + this.kanbanName)
        this.kanbanName = ''
      }).catch((err) => {
        console.error(err)
      })
    },
    go () {
      if (this.kanban[this.kanbanName]) {
        this.alert.content = 'Here is your Kanban'
        this.alert.ok = 'Yeah!'
        this.$refs['dialog3'].open()
        this.closeDialog('dialogKanbanName')
        this.$router.push(this.kanbanName)
        this.kanbanName = ''
      } else {
        this.alert.content = 'Your Kanban is not Found'
        this.alert.ok = 'What!?'
        this.$refs['dialog3'].open()
      }
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
