<template>
<div class="player">
  <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
  <MiniPlayer></MiniPlayer>
  <ListPlayer ref="listPlayer"></ListPlayer>
  <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
</div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import mode from '../store/modeType'
import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from '../tools/tools'
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'curTime',
      'modeType',
      'songs',
      'favoriteList',
      'historyList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        // 在ios中，系统不会自动加载歌曲，所以，oncamplay不会自动执行，在pc和android系统会自动加载歌曲，oncamplay会自动执行
        // 通过ondurationchange事件监听：当歌曲加载完成以后执行，因为只有歌曲加载完成以后，才能获取到
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      this.$refs.audio.ondurationchange = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, oldValue) {
      this.$refs.audio.currentTime = newValue
    },
    favoriteList (newValue, oldValue) {
      // window.localStorage.setItem('favoriteList', JSON.stringify(newValue))
      setLocalStorage('favoriteList', newValue)
    },
    historyList (newValue, oldValue) {
      // window.localStorage.setItem('historyList', JSON.stringify(newValue))
      getLocalStorage('historyList', newValue)
    }
  },
  created () {
    // const favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'))
    const favoriteList = getLocalStorage('favoriteList')
    if (favoriteList === null) {
      return
    }
    this.setFavoriteList(favoriteList)
    // const historyList = JSON.parse(window.localStorage.getItem('historyList'))
    const historyList = getLocalStorage('historyList')
    if (historyList === null) {
      return
    }
    this.setHistoryList(historyList)
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList'
    ]),
    timeupdate (e) {
      // console.log(e.target.currentTime)
      this.currentTime = e.target.currentTime
    },
    end () {
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play()
      } else if (this.modeType === mode.random) {
        const index = getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentIndex(index)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .player{

  }

</style>
