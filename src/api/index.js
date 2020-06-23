// 这个js文件就是专门用来管理各种接口地址的
import Network from './network'

export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized?limit=6')
export const getNewALlbum = () => Network.get('album/newest')
export const getNewsong = () => Network.get('personalized/newsong')
export const getPlayList = (data) => Network.get('playlist/detail', data)
export const getAlbum = (data) => Network.get('album', data)
export const getSongDetail = (data) => Network.get('song/detail', data)
// export const getSongLyric = (data) => Network.get('lyric', data)
export const getSongLyric = (data) => Network.get('lyric', data)
export const getSongURL = (data) => Network.get('song/url', data)
export const getArtistsSongs = (data) => Network.get('artists', data)
// export const getHotArtists = () => Network.get('top/artists?offset=0&limit=5')
export const getHotArtists = () => {
  return new Promise(function (resolve, reject) {
    Network.get('top/artists?offset=0&limit=5')
      .then(function (result) {
        resolve(result.artists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getLetterArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    const lettersArtists = []
    Network.all([
      // Network.get(`artist/list?offset=0&limit=5&type=1&area=-1&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&type=1&area=7&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&type=1&area=96&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&type=1&area=8&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&type=1&area=16&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&type=1&area=0&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=-1&area=-1&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=-1&area=7&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=-1&area=96&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=-1&area=8&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=-1&area=16&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&type=-1&area=0&initial=${letter}`)
      // Network.get(`artist/list?offset=0&limit=5&type=2&area=-1&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&type=2&area=7&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&type=2&area=96&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&type=2&area=8&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&type=2&area=16&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&type=2&area=0&initial=${letter}`)
    ])
      .then(function (result) {
        // console.log(result)
        result.forEach(function (item) {
          lettersArtists.push(...item.artists)
        })
        // console.log(lettersArtists)
        resolve(lettersArtists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getAllArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    const keys = ['热']
    const list = [getHotArtists()]
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    Network.all(list)
      .then(function (result) {
        const obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
