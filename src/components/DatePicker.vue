<template>
  <div v-click-outsize>
    <input :value="formDate" type="text" />
    <div v-if="isVisible" class="panel">
      <div class="panel-nav">
        <span @click="pervMonth"> &lt;&lt; </span>
        <span>{{ timer.year }} 年 {{ timer.month + 1 }} 月 </span>
        <span @click="nextMonth"> &gt;&gt; </span>
      </div>
      <div class="panel-content">
        <p class="panel-week">
          <span v-for="w in week" :key="'-' + w">{{ w }}</span>
        </p>
        <div v-for="i in 6" :key="i">
          <span 
            v-for="j in 7" 
            :key="j"
            class="cell"
            :class="[
              { notCurrentMonth: !isCurrentMonth(visibleDays[(i -1) * 7 + (j - 1)]) },
              { today: isToday(visibleDays[(i -1) * 7 + (j - 1)]) }
            ]"
            @click="selectDay(visibleDays[(i -1) * 7 + (j - 1)])">
              <span :class="{ selected: isSelect(visibleDays[(i -1) * 7 + (j - 1)]) }">{{ visibleDays[(i -1) * 7 + (j - 1)].getDate() }}</span>
          </span>
        </div>
      </div>
      <div class="panel-footer"></div>
    </div>
    <div>努力学习，天天向上</div>
  </div>
</template>

<script>
import utils from '../utils/index.js'

export default {
  name: 'DatePicker',
  directives: {
    clickOutsize: {
      bind(el, binding, vnode) {
        const handler = (e) => {
          if (el.contains(e.target)) {
            if (!vnode.context.isVisible) {
              vnode.context.focus()
            }
          } else {
            if (vnode.context.isVisible) {
              vnode.context.blur()
            }
          }
        }
        el.handler = handler
        document.addEventListener('click', handler)
      },
      unbind(el) {
        document.removeEventListener('ckick', el.handler)
      }
    }
  },
  props: {
    value: {
      type: [Date, String]
    }
  },
  computed: {
    formDate() {      
      const { year, month, day } = utils.getYearMonthDay(this.value)
      return `${year}-${month + 1}-${day}`
    },
    visibleDays() {
      // 获取当月的第一天
      const currentFirstDay = utils.getDate(this.timer.year, this.timer.month, 1)
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
    }
  },
  data() {
    return {
      isVisible: false,
      timer: {
        year: '',
        month: ''
      },
      week: '日一二三四五六'
    }
  },
  mounted() {
    const { year, month, day } = utils.getYearMonthDay(this.value)
    this.timer.year = year
    this.timer.month = month
  },
  methods: {
    focus() {
      this.isVisible = true
    },
    blur() {
      this.isVisible = false
    },
    isCurrentMonth(date) {
      const { year, month } = utils.getYearMonthDay(utils.getDate(this.timer.year, this.timer.month, 1))
      const { year: y, month: m } = utils.getYearMonthDay(date)
      return year === y && month === m
    },
    isToday(date) {
      const { year, month, day } = utils.getYearMonthDay(new Date)
      const { year: y, month: m, day: d } = utils.getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    selectDay(date) {
      this.timer = utils.getYearMonthDay(date)
      this.$emit('input', date)
      this.blur()
    },
    isSelect(date) {
      const { year, month, day } = utils.getYearMonthDay(this.value)
      const { year: y, month: m, day: d } = utils.getYearMonthDay(date)
      return year === y && month === m && day === d
    },
    pervMonth() {
      const d = utils.getDate(this.timer.year, this.timer.month, 1)
      d.setMonth(--this.timer.month)
      this.timer = utils.getYearMonthDay(d)
    },
    nextMonth() {
      const d = utils.getDate(this.timer.year, this.timer.month, 1)
      d.setMonth(++this.timer.month)
      this.timer = utils.getYearMonthDay(d)
    }
  }

}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.panel {
  position: absolute;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.5);
  .panel-nav {
    text-align: center;
    span:first-child, span:last-child {
      cursor: pointer;
    }
  }
  .panel-content {
    .panel-week {
      span {
        display: inline-block;
        width: 32px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        font-weight: bold;
        font-size: 14px;
      }
    }
    .cell {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      text-align: center;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 14px;
      box-sizing: border-box;
      cursor: pointer;
      span {
        display: inline-block;
        width: 20px;
        height: 20px;
      }
      &:hover {
        opacity: .3;
      }
    }

    .notCurrentMonth {
      color: gray;
    }
    .today {
      color: #1890FF;
    }
    .selected {
      background-color: #1890FF;
      color: #fff;
      border-radius: 50%;
    }
  }
}
</style>