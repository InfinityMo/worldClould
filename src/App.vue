<template>
  <div>
    <div id="app">
      <router-view />
      <div class="loading-wrap"
           :style="{ zIndex: $store.state.spinning ? 99999:-1}"
           v-loading="$store.state.spinning"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
      </div>
    </div>
  </div>

</template>
<script>

export default {
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="less">
</style>
