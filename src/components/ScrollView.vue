<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    })
    // setTimeout(() => {
    //   console.log(this.iscroll.maxScrollY)
    //   this.iscroll.refresh()
    //   console.log(this.iscroll.maxScrollY)
    // }, 1000)
    // MutationObserver构造函数只要监听到指定的内容发生变化，就会执行传入的回调函数
    // mutationList:发生变化的数组
    // observer:观察者对象
    var observer = new MutationObserver((mutationList, observer) => {
      // console.log(mutationList)
      // console.log(this.iscroll.maxScrollY)
      this.iscroll.refresh()
      // console.log(this.iscroll.maxScrollY)
    })
    // 告诉观察者对象，我们需要观察的内容
    const config = {
      childList: true, // 观察目标子节点的变化，是否有添加或者删除
      subtree: true, // 观察后代节点，默认为 false
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    // 告诉观察者对象，我们需要观察谁，需要观察什么内容。第一个参数：我们需要观察谁，第二个参数：我们要观察的内容
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    // 提供一个监听滚动距离的方法给外界使用
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 100)
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped>
#wrapper{
  width: 100%;
  height: 100%;
}
</style>
