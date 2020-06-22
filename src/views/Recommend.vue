<template>
  <div class="recommend">
    <div class="recommend-warpper">
      <ScrollView>
        <div><Banner :banners="banners"></Banner>
          <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'"></Personalized>
          <Personalized :personalized="albums" :title="'最新专辑'" @select="fatherSelectItem" :type="'albums'"></Personalized>
          <SongList :songs="songs"></SongList></div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
/* eslint-disable dot-notation */

import { getBanner, getPersonalized, getNewALlbum, getNewsong } from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import SongList from '../components/Recommend/SongList'
import ScrollView from '../components/ScrollView'

export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  methods: {
    fatherSelectItem (id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  created () {
    getBanner().then((data) => {
      // console.log(data)
      this.banners = data.banners
    })
      .catch(function (error) {
        console.log(error)
      })
    getPersonalized().then((data) => {
      // console.log(data)
      this.personalized = data.result
    })
      .catch(function (error) {
        console.log(error)
      })
    getNewALlbum().then((data) => {
      // console.log(data.albums.splice(0, 6))
      this.albums = data.albums.splice(0, 6)
    })
      .catch(function (error) {
        console.log(error)
      })
    getNewsong().then((data) => {
      // console.log(data)
      // this.songs = data.result
      // console.log(data.result)
      const list = []
      data.result.forEach((value) => {
        const obj = {}
        obj.id = value.id
        obj.name = value.name
        obj.picUrl = value.song.album.picUrl
        let singer = ''
        for (let i = 0; i < value.song['artists'].length; i++) {
          if (i === 0) {
            singer = value.song['artists'][i].name
          } else {
            singer += '-' + value.song['artists'][i].name
          }
        }
        obj.singer = singer
        list.push(obj)
      })
      this.songs = list
    })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped lang="scss">
  .recommend{
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    /*overflow: hidden;*/
    .recommend-warpper{
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
