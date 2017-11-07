<template lang="html">
<div>
  <md-dialog ref="dialogFormTasks">
    <form @submit.stop.prevent="submit">
      <md-dialog-title>Create new Kanban</md-dialog-title>
        <md-dialog-content>
            <md-input-container>
              <label>Title</label>
              <md-input type="text" required v-model="title"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Assign To</label>
              <md-input type="text" required v-model="assign"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Points</label>
              <md-input type="number" required v-model="point"></md-input>
            </md-input-container>
            <md-input-container>
              <label>Description</label>
              <md-textarea required v-model="description"></md-textarea>
            </md-input-container>
            <md-input-container>
              <label>Kanban Secret</label>
              <md-input type="password" required v-model="password"></md-input>
            </md-input-container>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="closeDialog('dialogFormTasks')">Cancel</md-button>
          <md-button class="md-primary" type="submit">Create</md-button>
        </md-dialog-actions>
      </form>
  </md-dialog>
  <md-dialog-alert
    :md-content="alert.content"
    :md-ok-text="alert.ok"
    ref="dialog3">
  </md-dialog-alert>
</div>
</template>

<script>
import crypto from 'crypto'
export default {
  props: ['secret'],
  data () {
    return {
      title: '',
      assign: '',
      point: '',
      description: '',
      password: '',
      alert: {
        content: 'Your task has been added!',
        ok: 'Cool!'
      }
    }
  },
  methods: {
    submit () {
      const hash = crypto.createHmac('sha256', process.env.SECRET_KEY)
                   .update(this.password)
                   .digest('hex')
      if (this.secret['.value'] === hash) {
        var data = {
          title: this.title,
          description: this.description,
          point: this.point,
          assign: this.assign
        }
        this.$emit('submit', data)
        this.title = ''
        this.description = ''
        this.point = ''
        this.assign = ''
        this.password = ''
        this.alert.content = 'Your task has been added!'
        this.alert.ok = 'Cool!'
        this.$refs['dialog3'].open()
        this.$refs['dialogFormTasks'].close()
      } else {
        console.log(hash)
        console.log(this.secret)
        this.alert.content = 'Please Insert the Right Password'
        this.alert.ok = 'Sad:('
        this.$refs['dialog3'].open()
      }
    },
    open () {
      this.$refs['dialogFormTasks'].open()
    }
  }
}
</script>

<style lang="css">
</style>
