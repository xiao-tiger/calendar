<template>
  <div class="panel">
    <p class="panel-nav">
      <span class="iconfont iconqianjin-copy" @click="prevMonth"></span>
      <span style="margin: 0 20px;">{{ timer.year }}年{{ timer.month + 1 }}月</span>
      <span class="iconfont iconqianjin" @click="nextMonth"></span>
    </p>
    <div class="panel-content">
      <p class="week">
        <span v-for="item of week" :key="item">{{ item }}</span>
      </p>
      <template v-if="isShrink">
        <div class="table">
          <span v-for="i in 7" :key="'a' + i" class="cell">
            <span :class="['cell-d', { today: isToday(shrinkDate[i - 1]) }]">{{ shrinkDate[i - 1].getDate() }}</span>
          </span>
        </div>
      </template>
      <template v-else>
        <div v-for="i in 6" :key="i" class="table">
          <span
            v-for="j in 7"
            :key="j"
            :class="[
              { notCurrentMonth: !isCurrentMonth(visibleDays[(i -1) * 7 + (j - 1)]) }
            ]"
            class="cell">
            <span :class="['cell-d',{ today: isToday(visibleDays[(i -1) * 7 + (j - 1)]) }]">{{ visibleDays[(i -1) * 7 + (j - 1)].getDate() }}</span>
          </span>
        </div>
      </template>

      <p class="shrink" @click="shrink">
        {{ isShrink ? '展开' : '收缩' }}全月
        <span v-if="!isShrink" class="iconfont iconqianjin-copy up"></span>
        <span v-else class="iconfont iconqianjin-copy down"></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySimpleCalendar',
  props: {
    value: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    const { year, month } = this.getYearMonthDay(this.value)
    return {
      week: '日一二三四五六',
      now: new Date(),
      timer: {
        year,
        month
      },
      isShrink: true
    }
  },
  computed: {
    visibleDays() {
      // const { year, month } = this.getYearMonthDay(new Date())
      // 获取当月的第一天
      const currentFirstDay = this.getDate(this.timer.year, this.timer.month, 1)
      // 获取是周几  就往前移动几天
      let week = currentFirstDay.getDay()
      // 日历当前月份的开始天数  如果是周日，就往前移动 7 天
      week = week === 0 ? 7 : week
      const startDay = currentFirstDay - week * 60 * 60 * 1000 * 24
      // 循环42天  6 行 7 列
      const arr = []
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
      }
      return arr
    },
    shrinkDate() {
      const d = this.getDate(this.timer.year, this.timer.month, this.value.getDate())
      const week = d.getDay()
      const startDay = d - week * 60 * 60 * 1000 * 24
      const arr = []
      for (let i = 0; i < 7; i++) {
        arr.push(new Date(startDay + i * 60 * 60 * 1000 * 24))
      }
      return arr
    }
  },
  methods: {
    getYearMonthDay(value) {
      const date = new Date(value)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      return { year, month, day }
    },
    getDate(year, month, day = 1) {
      return new Date(year, month, day)
    },
    isCurrentMonth(date) {
      const { year: y, month: m } = this.getYearMonthDay(date)
      return this.timer.year === y && this.timer.month === m
    },
    isToday(date) {
      const { year, month, day } = this.getYearMonthDay(new Date())
      const { year: y, month: m, day: d } = this.getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    prevMonth() {
      const d = this.getDate(this.timer.year, this.timer.month)
      d.setMonth(d.getMonth() - 1)
      this.timer = this.getYearMonthDay(d)
    },
    nextMonth() {
      const d = this.getDate(this.timer.year, this.timer.month)
      d.setMonth(d.getMonth() + 1)
      this.timer = this.getYearMonthDay(d)
    },
    shrink() {
      this.isShrink = !this.isShrink
    }
  }

}
</script>

<style lang="scss" scoped>
  .panel {
    .panel-nav {
      padding: 21px 0 24px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: #1890FF;
      .iconfont {
        cursor: pointer;
        font-size: 14px;
      }
    }
    .panel-content {
      .week {
        padding: 0 2px 0 5px;
        font-size: 14px;
        font-weight: 500;
        color: #999999;
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 14%;
          height: 14px;
          text-align: center;
        }
      }
      .table {
        padding: 0 5px;
      }
      .cell {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 14%;
        height: 50px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        .cell-d {
          display: inline-block;
          width: 30px;
          height: 20px;
          border-radius: 10px;
          text-align: center;
          line-height: 20px;
        }
      }
      .notCurrentMonth {
        color: #999;
      }
      .today {
        background-color: #1890FF;
        color: #fff;
      }
      .shrink {
        font-size: 14px;
        font-weight: 500;
        color: #999999;
        text-align: center;
        margin-top: 26px;
        cursor: pointer;
        .iconqianjin-copy {
          display: inline-block;
          font-size: 12px;
          margin-left: 10px;
        }
        .up {
          transform: rotate(90deg);
        }
        .down {
          transform: rotate(-90deg);
        }
      }
    }
  }
</style>
