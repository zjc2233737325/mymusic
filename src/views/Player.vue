<template>
<div class="player">
  <NormalPlayer></NormalPlayer>
  <MiniPlayer></MiniPlayer>
  <ListPlayer ref="listPlayer"></ListPlayer>
  <audio :src="currentSong.url" ref="audio"></audio>
</div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import { mapGetters } from 'vuex'
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
      'currentIndex'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      this.$refs.audio.oncanplay = () => {
        if (this.isPlaying) {
          this.$refs.audio.play()
        } else {
          // ni
          this.$refs.audio.pause()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .player{

  }

</style>
