<template>
  <div>
    <div id="chart"
         v-if="excelData.length>0"
         :style="chartStyle"
         ref="charts">
    </div>
    <div class="no-data"
         v-else>
      <img src="@/assets/img/nodata.svg">
      <p>请上传数据</p>
    </div>
    <div class="setting">
      <div class="import-data flex-item-center">
        <div class="import-btn">
          <a class="a-upload">导入Excel
            <input type="file"
                   ref="upload"
                   accept=".xls,.xlsx"
                   @change="readExcel($event)"
                   class="upload">
          </a>
        </div>
        <p class="file-name">{{fileName}}</p>
      </div>
      <div v-show="excelData.length>0">
        <!-- 设置图大小 -->
        <div class="flex-item-center set-item">
          <div class="flex-item-center row">
            <span class="title">设置图宽：</span>
            <el-slider class="slider"
                       v-model="clouldChart.width"
                       :min="1"
                       :max="100"
                       show-input>
            </el-slider>
          </div>
          <div class="flex-item-center row">
            <span class="title">设置图高：</span>
            <el-slider class="slider"
                       v-model="clouldChart.height"
                       :min="1"
                       :max="1000"
                       show-input>
            </el-slider>
          </div>
        </div>
        <!-- 设置字体间距 -->
        <div class="flex-item-center set-item">
          <span class="title">设置字体间距：</span>
          <el-slider class="slider"
                     v-model="inputSet.gridSize"
                     :min="1"
                     :max="100"
                     show-input>
          </el-slider>
        </div>
        <!-- 设置最小字体和最大字体 -->
        <div class="flex-item-center set-item">
          <span class="title">设置最小字体和最大字体：</span>
          <el-slider class="slider"
                     range
                     v-model="inputSet.sizeRange"
                     :min="12"
                     :step="1"
                     :max="100">
          </el-slider>
        </div>
        <!-- 设置最顺时针旋转角度和逆时针旋转角度 -->
        <div class="flex-item-center set-item">
          <span class="title">设置最顺时针旋转角度和逆时针旋转角度：</span>
          <el-slider class="slider"
                     range
                     v-model="inputSet.rotationRange"
                     :min="-90"
                     :step="1"
                     :max="90">
          </el-slider>
        </div>
        <!-- 设置词云的形状 -->
        <div class="flex-item-center set-item">
          <span class="title">设置形状：</span>
          <el-select v-model="inputSet.shape"
                     size="small"
                     placeholder="请选择">
            <el-option v-for="selectItem in selectData"
                       :key="selectItem.value"
                       :label="selectItem.label"
                       :value="selectItem.value">
            </el-option>
          </el-select>
        </div>
        <!-- 字体颜色及是否加粗配置 -->
        <div class="flex-item-center set-item">
          <div class="flex-item-center row">
            <span class="title">字体是否加粗：</span>
            <el-switch v-model="textBold"
                       @change="switchChange">
            </el-switch>
          </div>
          <div class="flex-item-center row">
            <span class="title">字体颜色：</span>
            <el-color-picker v-model="inputSet.normal.color"></el-color-picker>
          </div>
        </div>
        <!-- 悬停时阴影配置 -->
        <div class="flex-item-center set-item">
          <div class="flex-item-center row">
            <span class="title">悬停时阴影偏移量：</span>
            <el-slider class="slider"
                       v-model="inputSet.emphasis.shadowBlur"
                       :min="0"
                       :max="100"
                       show-input>
            </el-slider>
          </div>
          <div class="flex-item-center row">
            <span class="title">悬停时阴影颜色：</span>
            <el-color-picker v-model="inputSet.emphasis.shadowColor"></el-color-picker>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-wordcloud/dist/echarts-wordcloud'
import 'echarts-wordcloud/dist/echarts-wordcloud.min'
import XLSX from 'xlsx'
import chartSettings from './chartSettings'
import select from './select'
export default {
  name: 'Home',
  data () {
    return {
      initChart: null,
      clouldChart: {
        width: 100,
        height: 400
      },
      fileName: '',
      selectData: select,
      excelData: [],
      inputSet: chartSettings,
      textBold: true
    }
  },
  computed: {
    chartStyle () {
      return { width: `${this.clouldChart.width}%`, height: `${this.clouldChart.height}px` }
    }
  },
  watch: {
    inputSet: {
      handler (val, oldval) {
        if (this.excelData.length > 0) {
          this.$nextTick(() => {
            this.createChart()
          })
        }
      },
      deep: true
    },
    clouldChart: {
      handler (val, oldval) {
        if (this.excelData.length > 0) {
          this.$nextTick(() => {
            this.initChart.resize()
          })
        }
      },
      deep: true
    }
  },
  mounted () {
    // this.createChart()
  },
  methods: {
    readExcel (e) {
      const that = this
      const files = e.target.files
      if (files.length <= 0) { // 如果没有文件名
        return false
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或者xlsx的Excel文件！')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const wsname = workbook.SheetNames[0]// 取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])// 生成json表格内容
          that.excelData = []// 清空接收数据
          for (let i = 0; i < ws.length; i++) {
            const sheetData = {
              name: ws[i].name,
              value: ws[i].value
            }
            that.excelData.push(sheetData)
          }
          this.fileName = files[0].name
          this.$refs.upload.value = ''
          this.$nextTick(() => {
            this.createChart()
          })
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    },
    createChart () {
      this.initChart = echarts.init(this.$refs.charts)
      const option = {
        tooltip: {
          show: true
        },
        toolbox: {
          feature: {
            saveAsImage: {
              name: '词云图',
              backgroundColor: '#fff',
              connectedBackgroundColor: '#fff'
            }
          }
        },
        series: [{
          type: 'wordCloud',
          gridSize: this.inputSet.gridSize, // 字体间的间距
          sizeRange: this.inputSet.sizeRange, // 最小字体和最大字体
          rotationRange: this.inputSet.rotationRange, // 字体旋转角度的范围
          shape: this.inputSet.shape, // 词云的形状： cardioid心形,diamond菱形,square正方形,triangle-forward指向右边的三角形,triangle-upright正三角形 triangle三角形，pentagon五角形，star五角星形
          textStyle: {
            normal: this.inputSet.normal,
            emphasis: this.inputSet.emphasis
          },
          data: this.excelData
        }]
      }
      this.initChart.setOption(option)
    },
    switchChange (value) {
      value ? this.inputSet.normal.fontWeight = 'bold' : this.inputSet.normal.fontWeight = 'normal'
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
