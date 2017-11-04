<template lang="html">
<div>
  <md-toolbar class="">
    <md-button class="md-icon-button" @click="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>
    <h2 class="md-title" style="flex: 1" @click="goToHome">Kamvan</h2>
    <md-button @click="openFormDialog">Add New Task</md-button>
  </md-toolbar>

  <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
    <md-toolbar>
      <div class="md-toolbar-container">
        <h3 class="md-title">Sidenav content</h3>
      </div>
    </md-toolbar>
    <md-button class="md-raised md-accent" @click="openFormDialog">Add New Task</md-button>
  </md-sidenav>
  <md-divider />
  <md-tabs md-fixed>
    <md-tab md-label="Back Log" md-icon="work">
      <BackLog :tasks="tasks[1]" @todo="statusTodo" @remove="removeTask"/>
    </md-tab>
    <md-tab md-label="To Do" md-icon="directions_run">
      <ToDo :tasks="tasks[1]" @backlog="statusBacklog" @doing="statusDoing"/>
    </md-tab>
    <md-tab md-label="Doing" md-icon="accessible">
      <Doing :tasks="tasks[1]" @todo="statusTodo" @done="statusDone"/>
    </md-tab>
    <md-tab md-label="Done" md-icon="accessibility">
      <Done :tasks="tasks[1]" @doing="statusDoing" @remove="removeTask"/>
    </md-tab>
  </md-tabs>
  <FormTasks ref="dialogFormTasks" @submit="addNewTask" :secret="tasks[0]"/>
</div>
</template>

<script>
import BackLog from '@/components/BackLog'
import ToDo from '@/components/ToDo'
import Doing from '@/components/Doing'
import Done from '@/components/Done'
import FormTasks from '@/components/FormTasks'
import db from '@/firebase/firebase'

export default {
  props: ['kanban_name'],
  methods: {
    toggleLeftSidenav () {
      this.$refs.leftSidenav.toggle()
    },
    toggleRightSidenav () {
      this.$refs.rightSidenav.toggle()
    },
    openFormDialog () {
      console.log(this.tasks[0]['.value'])
      this.$refs['dialogFormTasks'].open()
    },
    statusBacklog (key) {
      var path = '/' + this.kanban_name + '/tasks/' + key + '/status'
      db.ref(path).set('backlog')
    },
    statusTodo (key) {
      var path = '/' + this.kanban_name + '/tasks/' + key + '/status'
      db.ref(path).set('todo')
    },
    statusDoing (key) {
      var path = '/' + this.kanban_name + '/tasks/' + key + '/status'
      db.ref(path).set('doing')
    },
    statusDone (key) {
      var path = '/' + this.kanban_name + '/tasks/' + key + '/status'
      db.ref(path).set('done')
    },
    addNewTask (data) {
      data.status = 'backlog'
      var path = '/' + this.kanban_name + '/tasks/'
      db.ref(path).push(data)
    },
    removeTask (key) {
      var path = '/' + this.kanban_name + '/tasks/' + key
      db.ref(path).remove()
    },
    goToHome () {
      this.$router.push('/')
    }
  },
  firebase () {
    return {
      tasks: {
        source: db.ref('/' + this.kanban_name)
      }
    }
  },
  components: {
    BackLog,
    ToDo,
    FormTasks,
    Doing,
    Done
  }
}
</script>

<style lang="css">
</style>
