<template>
  <div class="recommend">
    <Banner :banners="banners"></Banner>
    <Personalized :personalized="personalized" :title="'推荐歌单'"></Personalized>
    <Personalized :personalized="albums" :title="'最新专辑'"></Personalized>
    <SongList :songs="songs"></SongList>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewALlbum, getNewsong } from '../api/index'
import Banner from '../components/Banner'
import Personalized from '../components/Personalized'
import SongList from '../components/SongList'

export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
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
      this.songs = data.result
    })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style scoped>

</style>
