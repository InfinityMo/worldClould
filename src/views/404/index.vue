<template>
  <div class="flex-center forbidden-wrap">
    <div class="forbidden">
      <img src="@/assets/img/404.svg">
      <p>对不起，您访问的页面不存在！</p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Forbidden',
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.forbidden-wrap {
  .forbidden {
    padding-top: 50px;
    text-align: center;
    p {
      padding-top: 10px;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
