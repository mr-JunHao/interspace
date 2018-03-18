<template>
 
</template>

<script>
export default {
  name: '',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>


<style scoped>

</style>
