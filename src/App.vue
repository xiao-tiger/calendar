<template>
  <div id="app">

    <date-picker v-model="now"></date-picker>
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker'
export default {
  name: 'App',
  components: {
    DatePicker
  },
  data() {
    return {
      now: new Date
    }
  }
}
</script>

<style lang="scss">

</style>
