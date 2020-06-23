<template>
  <div class="rank">
    <ScrollView>
      <ul>
        <li v-for="(value, key) in category.titles" :key="key">
          <h3 class="group-title">{{value}}</h3>
          <ul class="normal-group" v-if="value === '官方榜'">
            <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectedItem(obj.id)">
              <div class="rank-left">
                <img v-lazy="obj.rank.coverImgUrl" alt="">
                <p>{{obj.rank.updateFrequency}}</p>
              </div>
              <div class="rank-right">
                <p v-for="(song, index) in obj.rank.tracks" :key="song.first">{{index}}.{{song.first}}-{{song.second}}</p>
              </div>
            </li>
          </ul>
          <ul class="other-group" v-else>
            <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectedItem(obj.id)">
              <div class="rank-top">
                <img v-lazy="obj.rank.coverImgUrl" alt="">
                <p>{{obj.rank.updateFrequency}}</p>
              </div>
              <div class="rank-bottom">
                <p>{{obj.rank.name}}</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getTopListDetail } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Rank',
  components: {
    ScrollView
  },
  methods: {
    selectedItem (id) {
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  },
  data () {
    return {
      category: {}
    }
  },
  created () {
    getTopListDetail()
      .then((data) => {
        // console.log(data)
        this.category = data
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
  .rank{
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    .group-title{
      padding: 10px 20px;
      @include font_color();
      @include font_size($font_large);
      font-weight: bold;
    }
    .normal-group{
      li{
        padding: 10px 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .rank-left{
          position: relative;
          img{
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p{
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #FFFFFF;
            @include font_size($font_medium_s);
          }
        }
        .rank-right{
          margin-left: 20px;
          p{
            @include font_color();
            @include font_size($font_medium_s);
            padding: 10px 0;
          }
        }
      }
    }
    .other-group{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        padding: 10px 20px;
        box-sizing: border-box;
        .rank-top{
          position: relative;
          img{
            width: 200px;
            height: 200px;
            border-radius: 10px;
          }
          p{
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #FFFFFF;
            @include font_size($font_medium_s);
          }
        }
        .rank-bottom{
          width: 200px;
          @include no-wrap();
          p{
            padding: 10px 0;
            @include font_color();
            @include font_size($font_medium_s);
          }
        }
      }
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
