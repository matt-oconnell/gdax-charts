function splitData (rawData) {
  var categoryData = []
  var values = []
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0])
    values.push(rawData[i])
  }
  return {
    categoryData: categoryData,
    values: values
  }
}

function calculateMA (dataPoints, dayCount) {
  var result = []
  for (var i = 0, len = dataPoints.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-')
      continue
    }
    var sum = 0
    for (var j = 0; j < dayCount; j++) {
      sum += dataPoints.values[i - j][1]
    }
    result.push(sum / dayCount)
  }
  return result
}

const makeOption = (dataPoints) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Candle', 'MA5', 'MA10', 'MA20', 'MA30']
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: dataPoints.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax'
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 50,
        end: 100
      },
      {
        show: true,
        type: 'slider',
        y: '90%',
        start: 50,
        end: 100
      }
    ],
    series: [
      {
        name: '日K',
        type: 'candlestick',
        data: dataPoints.values,
        markPoint: {
          label: {
            normal: {
              formatter: function (param) {
                return param != null ? Math.round(param.value) : ''
              }
            }
          },
          data: [
            {
              name: 'highest value',
              type: 'max',
              valueDim: 'highest'
            },
            {
              name: 'lowest value',
              type: 'min',
              valueDim: 'lowest'
            },
            {
              name: 'average value on close',
              type: 'average',
              valueDim: 'close'
            }
          ],
          tooltip: {
            formatter: function (param) {
              return param.name + '<br>' + (param.data.coord || '')
            }
          }
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            [
              {
                name: 'from lowest to highest',
                type: 'min',
                valueDim: 'lowest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  normal: { show: false },
                  emphasis: { show: false }
                }
              },
              {
                type: 'max',
                valueDim: 'highest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  normal: { show: false },
                  emphasis: { show: false }
                }
              }
            ],
            {
              name: 'min line on close',
              type: 'min',
              valueDim: 'close'
            },
            {
              name: 'max line on close',
              type: 'max',
              valueDim: 'close'
            }
          ]
        }
      },
      {
        name: 'MA5',
        type: 'line',
        data: calculateMA(dataPoints, 5),
        smooth: true,
        lineStyle: {
          normal: { opacity: 0.5 }
        }
      },
      {
        name: 'MA10',
        type: 'line',
        data: calculateMA(dataPoints, 10),
        smooth: true,
        lineStyle: {
          normal: { opacity: 0.5 }
        }
      },
      {
        name: 'MA20',
        type: 'line',
        data: calculateMA(dataPoints, 20),
        smooth: true,
        lineStyle: {
          normal: { opacity: 0.5 }
        }
      },
      {
        name: 'MA30',
        type: 'line',
        data: calculateMA(dataPoints, 30),
        smooth: true,
        lineStyle: {
          normal: { opacity: 0.5 }
        }
      }
    ]
  }
}

export default function candleFormatter (apiResults) {
  apiResults.forEach(dataPoint => {
    const d = new Date(dataPoint[0] * 1000)
    dataPoint[0] = `${d.getHours()}:${d.getMinutes()}`
  })
  return makeOption(splitData(apiResults.reverse()))
}
