<template>
  <hello-world />
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'ContentScript',
  components: { HelloWorld },
  setup() {
    console.log('yes i can')
  }
}
</script>

<style>

</style>