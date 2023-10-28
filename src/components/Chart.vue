<template>
  <VChart :theme="selectValue" class="h-[30rem]" :option="barOptions" autoresize/>
</template>


<script>
import { use } from "echarts/core"
  import { CanvasRenderer } from "echarts/renderers"
  import { LineChart } from "echarts/charts"
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  } from "echarts/components"
  import VChart from "vue-echarts"
  import "echarts/lib/component/grid"
  import { data } from '../data.js'
  use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  ])

  export default {
   name: 'Chart',
   components: {
     VChart
   },
   props: {
    selectedBadge: String,
    selectValue: String
   },
   data() {
      return {
        rawData: data,
        orderedData: {},
        barOptions: {
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [],
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: '{value} min'
            }
          },
          tooltip: {
            trigger: "axis",
            formatter: function (e) {
              const value = e[0].value
              const minutes = Math.floor(value)
              const seconds = Math.round((value - minutes) * 60)
              return `<div style="display: flex flex-direction: column gap: 4px"><div>${e[0].axisValue}</div><div>${e[0].marker}${minutes} min ${seconds} sec</div></div>`
            }
          },
          series: [
            {
              data: [],
              type: "line",
            },
          ],
        },
      }
    },
    methods: {
     handleChangeChartData(period) {
        this.barOptions.xAxis.data = this.orderedData.xValues
        switch (period) {
          case 'TODAY':
            this.barOptions.series[0].data = this.orderedData.yValuesOneDay
          break
          case 'SEVEN':
            this.barOptions.series[0].data = this.orderedData.yValuesSevenDays
          break
          case 'THIRTY':
            this.barOptions.series[0].data = this.orderedData.yValuesOneMonth
          break
          case 'ONE_YEAR':
            this.barOptions.series[0].data = this.orderedData.yValuesOneYear
          break
        }
      },
      setData() {
        this.orderedData = this.organizeData(this.rawData)
        this.handleChangeChartData(this.selectedBadge)
      },
      setTimeIntervals(newestDate) {
        const oneDayAgo = new Date(newestDate)
        oneDayAgo.setDate(newestDate.getDate() - 1)
        
        const sevenDaysAgo = new Date(newestDate)
        sevenDaysAgo.setDate(newestDate.getDate() - 7)

        const oneMonthAgo = new Date(newestDate)
        oneMonthAgo.setMonth(newestDate.getMonth() - 1)

        const oneYearAgo = new Date(newestDate)
        oneYearAgo.setFullYear(newestDate.getFullYear() - 1)

        return { oneDayAgo, sevenDaysAgo, oneMonthAgo, oneYearAgo }
      },
      organizeData(rawData) {
        const siteData = {}
        const newestDate = new Date(Math.max(...rawData.map(entry => new Date(entry.dateAccessed))))

        const { oneDayAgo, sevenDaysAgo, oneMonthAgo, oneYearAgo } = this.setTimeIntervals(newestDate)

        rawData.forEach(entry => {
          const site = entry.url
          if (!siteData[site]) {
            siteData[site] = { oneDay: [], sevenDays: [], oneMonth: [], oneYear: [] }
          }
          const t ={
           'www.dsdasd.com': {oneDay: [], sevenDays: [], oneMonth: [], oneYear: []},
           'www.sdasd.com': {oneDay: [], sevenDays: [], oneMonth: [], oneYear: []},
         }
          const timeSpent = entry.timeSpent
          const entryDate = new Date(entry.dateAccessed)

          if (entryDate >= oneDayAgo && entryDate <= newestDate) {
            siteData[site].oneDay.push(timeSpent)
          }

          if (entryDate >= sevenDaysAgo && entryDate <= newestDate) {
            siteData[site].sevenDays.push(timeSpent)
          }

          if (entryDate >= oneMonthAgo && entryDate <= newestDate) {
            siteData[site].oneMonth.push(timeSpent)
          }

          if (entryDate >= oneYearAgo && entryDate <= newestDate) {
            siteData[site].oneYear.push(timeSpent)
          }
        })

        const calculateAverage = data => {
          if (data.length === 0) return 0
          
          const total = data.reduce((acc, value) => acc + value, 0)
          const average = Math.round(total / data.length)
          return (average / 60)
        }

        const siteKeys = Object.keys(siteData) 
        const xValues = siteKeys.map(item => {
          const clearKey = item.replace("https://", "").split('.')[0]
          return clearKey.charAt(0).toUpperCase() + clearKey.slice(1)
        })
        const yValuesOneDay = siteKeys.map(site => calculateAverage(siteData[site].oneDay))
        const yValuesSevenDays = siteKeys.map(site => calculateAverage(siteData[site].sevenDays))
        const yValuesOneMonth = siteKeys.map(site => calculateAverage(siteData[site].oneMonth))
        const yValuesOneYear = siteKeys.map(site => calculateAverage(siteData[site].oneYear))

        return { xValues, yValuesOneDay, yValuesSevenDays, yValuesOneMonth, yValuesOneYear }
      },
    },
    watch: {
      selectedBadge() {
        this.handleChangeChartData(this.selectedBadge)
      }
    },
    mounted() {
      this.setData()
    },
  }
</script>