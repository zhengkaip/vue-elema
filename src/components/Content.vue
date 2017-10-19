<template>
  <div class="content">
    content{{title}}
    <ul>
      <li v-for="(value, key) in list" key="key" @click="liClick(value)">{{value}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'content',
    props: ['title'],
    data () {
      return {
        'list': [1, 2, 3, 4, 5]
      }
    },
    methods: {
      liClick: function (index) {
        alert(index)
      }
    }
  }
</script>

<style lang='scss' scoped>
  .content {
    background: #666;
  }
</style>
