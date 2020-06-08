<template>
  <swiper :options="swiperOptions" class="banner">
    <swiper-slide class="cd">
      <div class="cd-warpper">
        <img src="http://news.lyd.com.cn/pic/003/003/415/00300341501_742c978b.jpg" alt="">
      </div>
      <p>nisdifjaifjasjflf</p>
    </swiper-slide>
    <swiper-slide class="lyric">
      <ScrollView>
        <ul>
          <li>我是第1行</li>
          <li>我是第2行</li>
          <li>我是第3行</li>
          <li>我是第4行</li>
          <li>我是第5行</li>
          <li>我是第6行</li>
          <li>我是第7行</li>
          <li>我是第8行</li>
          <li>我是第9行</li>
          <li>我是第10行</li>
          <li>我是第11行</li>
          <li>我是第12行</li>
          <li>我是第13行</li>
          <li>我是第14行</li>
          <li>我是第15行</li>
          <li>我是第16行</li>
          <li>我是第17行</li>
          <li>我是第18行</li>
          <li>我是第19行</li>
          <li>我是第20行</li>
          <li>我是第21行</li>
          <li>我是第22行</li>
          <li>我是第23行</li>
          <li>我是第24行</li>
          <li>我是第25行</li>
          <li>我是第26行</li>
          <li>我是第27行</li>
          <li>我是第28行</li>
          <li>我是第29行</li>
          <li>我是第30行</li>
          <li>我是第31行</li>
          <li>我是第32行</li>
          <li>我是第33行</li>
          <li>我是第34行</li>
          <li>我是第35行</li>
          <li>我是第36行</li>
          <li>我是第37行</li>
          <li>我是第38行</li>
          <li>我是第39行</li>
          <li>我是第40行</li>
          <li>我是第41行</li>
          <li>我是第42行</li>
          <li>我是第43行</li>
          <li>我是第44行</li>
          <li>我是第45行</li>
          <li>我是第46行</li>
          <li>我是第47行</li>
          <li>我是第48行</li>
          <li>我是第49行</li>
          <li>我是第50行</li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ScrollView from '../ScrollView'
export default {
  name: 'PlayerMiddle',
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOptions: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .banner{
    position: fixed;
    top: 150px;
    bottom: 250px;
    left: 0;
    right: 0;
    .cd{
      .cd-warpper{
        display: block;
        margin: 0 auto;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 30px solid #fff;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      p{
        text-align: center;
        @include font_size($font_medium);
        @include font_color();
        margin: 50px;
      }
    }
    .lyric{
      ul{
        li{
          text-align: center;
          @include font_size($font_medium);
          @include font_color();
          margin: 10px 0;
          &:last-of-type{
            padding-bottom: 100px;
          }
        }
      }
    }
  }

</style>
<style lang="scss">
  @import "../../assets/css/mixin";
  .my-bullet{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #fff;
    margin: 0 20px;
  }
  .my-bullet-active{
    @include bg_color();
    width: 50px;
  }
</style>
