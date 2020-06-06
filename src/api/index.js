// 这个js文件就是专门用来管理各种接口地址的
import Network from './network'

export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized?limit=6')
export const getNewALlbum = () => Network.get('album/newest')
export const getNewsong = () => Network.get('personalized/newsong')
