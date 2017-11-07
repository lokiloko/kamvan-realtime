<template lang="html">
<div>
  <md-layout md-align="center" md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
    <md-card>

      <md-card-header style="background:rgb(4, 30, 200); color:white;">
        <div class="md-title">Doing</div>
        <!-- <div class="md-subhead">Back Log here</div> -->
      </md-card-header>

      <md-card-content>
        <md-card md-with-hover md-expand-trigger v-for="(task, key) in tasks" v-if="task.status === 'doing'">
          <md-card-header>
            <div class="md-title">{{task.title}}</div>
            <div class="md-subhead">Assigned to : {{task.assign}}</div>
            <div class="md-subhead">Points : {{task.point}}</div>
          </md-card-header>

          <md-card-expand>
            <md-card-actions>
              <md-button class="md-raised" style="background:cyan; color:white" v-on:click="todo(key)">To Do</md-button>
              <md-button class="md-raised" style="background:green; color:white" v-on:click="done(key)">Done</md-button>
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
    todo (key) {
      var dataEmit = {
        key, tab: 2
      }
      this.$emit('todo', dataEmit)
    },
    done (key) {
      var dataEmit = {
        key, tab: 4
      }
      this.$emit('done', dataEmit)
    }
  }
}
</script>

<style lang="css">
</style>
