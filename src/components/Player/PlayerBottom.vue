<template>
<div class="player-bottom">
  <div class="bottom-progress">
    <span>00:00</span>
    <div class="progress-bar">
      <div class="progress-line">
        <div class="progress-dot"></div>
      </div>
    </div>
    <span>00:00</span>
  </div>
  <div class="bottom-controll">
    <div class="mode loop" @click="mode" ref="mode"></div>
    <div class="prev" @click="prev"></div>
    <div class="play" @click="play" ref="play"></div>
    <div class="next" @click="next"></div>
    <div class="favorite"></div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex'
    ]),
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    next () {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    mode () {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop)
      }
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    modeType (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .player-bottom{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .bottom-progress{
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        @include font_size($font_samll);
        @include font_color();
      }
      .progress-bar{
        width: 100%;
        margin: 0 10px;
        height: 10px;
        background-color: #fff;
        position: relative;
        .progress-line{
          width: 50%;
          height: 100%;
          background-color: #ccc;
          .progress-dot{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .bottom-controll{
      width: 80%;
      margin: 0 auto;
      padding: 50px 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div{
        width: 84px;
        height: 84px;
      }
      .mode{
        &.loop{
          @include bg_img('../../assets/images/loop');
        }
        &.one{
          @include bg_img('../../assets/images/one');
        }
        &.random{
          @include bg_img('../../assets/images/shuffle');
        }
      }
      .prev{
        @include bg_img('../../assets/images/prev');
      }
      .play{
        @include bg_img('../../assets/images/play');
        &.active{
        @include bg_img('../../assets/images/pause');
      }
      }
      .next{
        @include bg_img('../../assets/images/next');
      }
      .favorite{
        @include bg_img('../../assets/images/un_favorite');
      }
    }
  }

</style>
