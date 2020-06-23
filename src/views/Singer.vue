<template>
<div class="singer">
  <ScrollView ref="scrollView">
    <ul class="list-wrapper">
      <li class="list-group" v-for="(value, index) in list" :key="index" ref="group">
        <h2 class="group-title">{{keys[index]}}</h2>
        <ul>
          <li class="group-item" v-for="(obj, indes) in list[index]" :key="indes" @click.stop="switchSinger(obj.id)">
            <img v-lazy="obj.img1v1Url" alt="">
            <p>{{obj.name}}</p>
          </li>
        </ul>
      </li>
    </ul>
  </ScrollView>
  <ul class="list-keys">
   <!-- <li v-for="(key, index) in keys"
        :key="key"
        @click.stop="keyDown(index)"
        :class="{'active' : currentIndex === index}">{{key}}</li>-->
    <li v-for="(key, index) in keys"
        :key="key"
        :data-index="index"
        @touchstart.stop.prevent="touchstart"
        @touchmove.stop.prevent="touchmove"
        :class="{'active' : currentIndex === index}">{{key}}</li>
  </ul>
  <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{fixTitle}}</div>
  <transition>
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
import { getAllArtists } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Singer',
  components: {
    ScrollView
  },
  methods: {
    _keyDown (index) {
      this.currentIndex = index
      const offsetY = this.groupsTop[index]
      // console.log(offsetY)
      this.$refs.scrollView.scrollTo(0, -offsetY)
    },
    touchstart (e) {
      // console.log(e.target.dataset.index)
      const index = parseInt(e.target.dataset.index)
      this._keyDown(index)

      this.beginOffsetY = e.touches[0].pageY
    },
    touchmove (e) {
      this.moveOffsetY = e.touches[0].pageY
      const offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight
      // console.log(offsetY)
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)
      if (index < 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this._keyDown(index)
    },
    switchSinger (id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  },
  computed: {
    fixTitle () {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },
  created () {
    getAllArtists()
      .then((result) => {
        // console.log(result)
        this.keys = result.keys
        this.list = result.list
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  mounted () {
    this.$refs.scrollView.scrolling((y) => {
      this.scrollY = y
      // console.log(y)
      // 处理第一个区域
      if (y >= 0) {
        this.currentIndex = 0
        return
      }
      // 处理中间的区域
      for (let i = 0; i < this.groupsTop.length - 1; i++) {
        const proTop = this.groupsTop[i]
        const nextTop = this.groupsTop[i + 1]
        if (-y >= proTop && -y <= nextTop) {
          this.currentIndex = i
          // 1.用下一组标题的偏移位 + 当前滚动出去的偏移位
          const diffOffetY = nextTop + y
          let fixTitleOffetY = 0
          // 判断计算的结果是否是 0~分组标题高度的值
          if (diffOffetY >= 0 && diffOffetY <= this.fixTitleHeight) {
            fixTitleOffetY = diffOffetY - this.fixTitleHeight
          } else {
            fixTitleOffetY = 0
          }
          if (fixTitleOffetY === this.fixTitleOffsetY) {
            return
          }
          this.fixTitleOffsetY = fixTitleOffetY
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffetY}px)`
          return
        }
      }
      // 处理最后的区域
      this.currentIndex = this.groupsTop.length - 1
    })
  },
  data () {
    return {
      keys: [],
      list: [],
      groupsTop: [],
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0
    }
  },
  watch: {
    list () {
      // console.log(this.$refs.group)
      // 注意点：watch只能监听数据的变化，数据的变化的时候不一定渲染完了，为了保证渲染完成以后再去获取，我们可以借助vue的$nextTick方法来实现。也就是说$nextTick回调函数中，一定能拿到渲染完成后的数据
      this.$nextTick(() => {
        // console.log(this.$refs.group)
        this.$refs.group.forEach((group) => {
          this.groupsTop.push(group.offsetTop)
        })
        // console.log(this.groupsTop)
      })
    },
    fixTitle () {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
.singer{
  position: fixed;
  top: 184px;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  overflow: hidden;
  .list-wrapper{
    /*width: 100%;*/
    /*height: 100%;*/
    .list-group{
      .group-title{
        @include bg_color();
        @include font_size($font_medium);
        color: #fff;
        padding: 10px 20px;
        box-sizing: border-box;
      }
      .group-item{
        display: flex;
        justify-content: flex-start;
        padding: 10px 20px;
        border: 1px solid #ccc;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
        }
        p{
          @include font_size($font_medium);
          @include font_color();
          display: flex;
          align-items: center;
          margin-left: 20px;
        }
      }
    }
  }
  .list-keys{
    position: fixed;
    right: 10px;
    top: 60%;
    transform: translateY(-50%);
    li{
      @include font_color();
      @include font_size($font_medium_s);
      padding: 3px 0;
      &.active{
      text-shadow: 0 0 10px #000;
    }
    }
  }
  .fix-title{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding: 10px 20px;
    box-sizing: border-box;
    @include font_size($font_medium);
    color: #FFFFFF;
    @include bg_color();
  }
}
  .v-enter{
    transform: translateX(100%);
    /*opacity: 0;*/
  }
  .v-enter-to{
    transform: translateX(0%);
    /*opacity: 1;*/
  }
  .v-enter-active{
    transition: all 0.5s;
  }
  .v-leave{
    /*opacity: 1;*/
    transform: translateX(0%);
  }
  .v-leave-to{
    /*opacity: 0;*/
    transform: translateX(100%);
  }
  .v-leave-active{
    transition: all 0.5s;
  }
</style>
