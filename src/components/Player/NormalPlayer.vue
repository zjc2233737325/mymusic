<template>
  <!--<div class="narmal-player" v-show="this.$store.getters.isFullScreen">-->
  <div class="narmal-player" v-show="this.isFullScreen">
    <div class="player-warpper">
      <PlayerHeader></PlayerHeader>
      <PlayerMiddle></PlayerMiddle>
      <PlayerBottom></PlayerBottom>
    </div>
    <div class="player-bg">
      <img src="http://news.lyd.com.cn/pic/003/003/415/00300341501_742c978b.jpg" alt="">
    </div>
  </div>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters } from 'vuex'
export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters([
      'isFullScreen'
    ])
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .narmal-player{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    @include bg_sub_color();
    .player-warpper{
      width: 100%;
      position: relative;
      z-index: 999;
      height: 100%;
    }
    .player-bg{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      img{
        height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        filter: blur(10px);
      }
    }
  }
</style>
