<template>
<div class="mini-player">
  <div class="player-warpper">
    <div class="player-left" @click="showNormalPlayer">
      <img src="http://news.lyd.com.cn/pic/003/003/415/00300341501_742c978b.jpg" alt="">
      <div class="player-title">
        <h3>演员</h3>
        <p>周杰伦</p>
      </div>
    </div>
    <div class="player-right">
      <div class="player"></div>
      <div class="list" @click.stop="showList"></div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'MiniPlayer',
  methods: {
    ...mapActions([
      'setFullScreen'
    ]),
    showList () {
      this.$emit('showList')
    },
    showNormalPlayer () {
      this.setFullScreen(true)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .mini-player{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 150px;
    .player-warpper{
      width: 100%;
      height: 100%;
      @include bg_color();
      display: flex;
      align-items: center;
      justify-content: space-between;
      .player-left{
        display: flex;
        padding-left: 30px;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .player-title{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          h3{
            @include font_size($font_medium);
            @include font_color();
          }
          p{
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
      }
      .player-right{
        display: flex;
        align-items: center;
        .player{
          width: 84px;
          height: 84px;
          @include bg_img('../../assets/images/play')
        }
        .list{
          width: 120px;
          height: 120px;
          @include bg_img('../../assets/images/list')
        }
      }
    }
  }

</style>
