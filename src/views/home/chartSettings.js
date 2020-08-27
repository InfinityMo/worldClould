export default {
  gridSize: 1, // 字体间的间距
  sizeRange: [20, 50], // 最小字体和最大字体
  rotationRange: [0, 0], // 字体旋转角度的范围
  shape: 'circle', // 词云的形状： cardioid心形,diamond菱形,square正方形,triangle-forward指向右边的三角形,triangle-upright正三角形 triangle三角形，pentagon五角形，star五角星形
  //  颜色配置
  normal: {
    color: '#6E6E6E',
    fontWeight: 'bold'
  },
  //  悬停时阴影配置
  emphasis: {
    shadowBlur: 3,
    shadowColor: '#333'
  }
}
