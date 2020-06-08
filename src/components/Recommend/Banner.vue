<template>
  <swiper :options="swiperOptions" class="banner" v-if="banners.length > 0">
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img :src="value.pic" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Banner',
  data () {
    return {
      swiperOptions: {
        loop: true, // 循环模式选项
        autoplay: {
          dalay: 1000, // 自动切换的时间间隔，单位ms
          stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay
        },
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  }
}
</script>

<style scoped lang="scss">
  .banner{
    .item{
      img{
        width: 100%;
        height: 300px;
      }
    }
  }

</style>
<style lang="scss">
  // 如果想覆盖swiper的样式，那么style标签不能试scoped的，否则无法覆盖
  @import "../../assets/css/mixin";
  .banner{
  .swiper-pagination-bullet{
    width: 16px;
    height: 16px;
    background-color: #fff;
    opacity: 1;
  }
    .swiper-pagination-bullet-active{
      @include bg_color();
    }
  }
</style>
