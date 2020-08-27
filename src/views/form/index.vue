<template>
  <div>
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="活动名称"
                    prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域"
                    prop="region">
        <el-select v-model="ruleForm.region"
                   placeholder="请选择活动区域">
          <el-option label="区域一"
                     value="shanghai"></el-option>
          <el-option label="区域二"
                     value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="food"
                    prop="select">
        <el-select v-model="ruleForm.select"
                   clearable
                   placeholder="请选择">
          <el-option v-for="item in selectOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm">立即创建</el-button>
        <el-button @click="restForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Form',
  data () {
    return {
      ruleForm: {
        name: '',
        select: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称' },
          { pattern: /^1[3456789]\d{9}$/, message: '格式不正确！' }
        ],
        region: [
          { required: true, message: '请选择活动区域' }
        ]
      },
      selectOptions: [{
        value: '1',
        label: '黄金糕'
      }, {
        value: '2',
        label: '双皮奶'
      }, {
        value: '3',
        label: '蚵仔煎'
      }, {
        value: '4',
        label: '龙须面'
      }, {
        value: '5',
        label: '北京烤鸭'
      }]
    }
  },
  watch: {

  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return false
        console.log('校验通过')
      })
    },
    restForm () {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
