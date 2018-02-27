<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'app',
  data () {
    return {
      shareState: store.state,
    }
  },
  watch: {
    'shareState.showLoading': (val) => {
      this.showLoading = val
    }
  },
  components: {
  },
  created(){
  }
}
</script>

<style lang="scss">
  @import "src/sass/style";
</style>
