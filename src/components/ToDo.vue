<template lang="html">
<div>
  <md-layout md-align="center" md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
    <md-card>

      <md-card-header style="background:cyan">
        <div class="md-title">To Do</div>
        <!-- <div class="md-subhead">Back Log here</div> -->
      </md-card-header>

      <md-card-content>
        <md-card md-with-hover md-expand-trigger v-for="(task, key) in tasks" v-if="task.status === 'todo'">
          <md-card-header>
            <div class="md-title">{{task.title}}</div>
            <div class="md-subhead">Assigned to : {{task.assign}}</div>
            <div class="md-subhead">Points : {{task.point}}</div>
          </md-card-header>

          <md-card-expand>
            <md-card-actions>
              <md-button class="md-raised" style="background:rgb(247, 70, 70); color:white" @click="backlog(key)">Back Log</md-button>
              <md-button class="md-raised" style="background:rgb(4, 30, 200); color:white" @click="doing(key)">Doing</md-button>
              <span style="flex: 1"></span>
              <md-button class="md-icon-button" md-expand-trigger>
                <md-icon>keyboard_arrow_down</md-icon>
              </md-button>
            </md-card-actions>

            <md-card-content>
              {{task.description}}
            </md-card-content>
          </md-card-expand>
        </md-card>
      </md-card-content>
      <p style="color:white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed </p>
    </md-card>
  </md-layout>
</div>
</template>

<script>
export default {
  props: ['tasks'],
  methods: {
    backlog (key, tab) {
      var dataEmit = {
        key, tab: 1
      }
      this.$emit('backlog', dataEmit)
    },
    doing (key) {
      var dataEmit = {
        key, tab: 3
      }
      this.$emit('doing', dataEmit)
    }
  }
}
</script>

<style lang="css">
</style>
