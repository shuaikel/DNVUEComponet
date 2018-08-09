
<template>
    <div class="recommend" ref="recommend" >
        <scroll class="recommend-content" ref="scroll" :data="playlist">
<!-- banner -->
            <div>
                <div v-show="banner.length" class="decorate" v-if="banner.length"></div>
                <div v-if="banner.length" class="slider-wrapper">
                    <slider>
                        <div v-for="item in banner" :key="item.id" @click.stop="selectBanner(item)">
                            <img :src="item.picUrl">
                        </div>
                    </slider>
                </div>
<!-- 推荐列表 -->
              <div class="recommend-list" ref="recommendList">
                <h1 class="title">推荐歌单</h1>
                  <ul>
                    <li class="item" v-for="item in playlist" :key="item.id">

                      <div class="icon" @click="selectList(item)">
                        <div class="gradients"></div>
                        <img v-lazy="item.picUrl" >
                      </div>

                      <p class="play-count">
                        <label>@</label>
                        <i class="fa fa-headphones"></i>
                        {{Math.floor(item.playCount/10000)}}万
                      </p>

                      <div class="text">
                        <p class="name">{{item.name}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
<!-- 推荐歌曲 -->
                <div class="recommend-song" ref="recommendSong">
                  <h1 class="title">推荐歌曲</h1>
                  <ul>
                    <li class="item" v-for="item in recommendMusic" :key="item.id" @click="selectSong(item)">
                        <div class="icon">
                          <img v-lazy="item.image" >
                        </div>
                        <p class="text">{{item.name}}</p>
                        <p class="singer">{{item.singer}}</p>
                    </li>
                  </ul>
                </div>

            </div>





        </scroll>
         <router-view></router-view>
    </div>
</template>

<script>
import {getBanner,getRecommendList,getRecommendSong} from '../../api/DNApi'
import Scroll from "@/base/scroll/scroll.vue"
import Slider from '@/base/slider/slider.vue'
import {ERR_OK} from '@/common/js/config.js'
import {playlistMixin} from '@/common/js/mixin'
import VueLazyload from 'vue-lazyload'
import {createRecommendSong} from '@/common/js/song'
export default {
    mixins: [playlistMixin],
    data () {
        return  {
            banner : [],
            playlist : [],
            recommendMusic : []
        }
    },
    created(){
        this._getBanner();
        this._getRecommendList();
        this._getRecommendSong();
    },
    methods : {
      // 选择某一个推荐
        selectList(item){
          
        },
        // 选择一个推荐歌曲
        selectSong(item){
          console.log('select song: ' + item);
        },
        handlePlaylist (playlist) {
          const bottom = playlist.length > 0 ? '0px' : ''
          this.$refs.recommend.style.bottom = bottom
          this.$refs.scroll.refresh()
        },
        // 获取banner页面
        _getBanner() {
            getBanner().then((rsp)=>{
                if (rsp.code== ERR_OK){
                    console.log('banners info:'+ rsp.banners);
                    let list = rsp.banners
                    this.banner = list
                }
            });
        },
        // 获取推荐
        _getRecommendList(){
            getRecommendList().then(rsp=>{
                if(rsp.code == ERR_OK){
                  let list = rsp.result
                  this.playlist = list;
                }
            })
        },
        // 获取推荐歌曲
       _getRecommendSong(){
         getRecommendSong().then(rsp=>{
           if(rsp.code == ERR_OK){
              let list = rsp.result.map((item) => {
                return createRecommendSong(item)
              })
            list.splice(9)
            this.recommendMusic = list
           }
         })
       }
    },
    components:{
        Scroll,
        Slider
    }

}
</script>


<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
@import "@/common/scss/mixin.scss";

.recommend{
    position: fixed;
    width: 100%;
    top: 108px;
    bottom: 0px;
    left: 0px;
    z-index: 100;
    .recommend-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    left: 0;
    .decorate {
      position: absolute;
      top: -30vh;
      z-index: -10;
      background: $color-theme;
      width: 100%;
      height: 50vh;
      vertical-align: inherit;
    }
    .slider-wrapper {
      width: 96%;
      margin: 0 auto;
      border-radius: 5px;
      overflow: hidden;
    }
    .recommend-list {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      text-align: center;
    
      .title {
        height: 65px;
        line-height: 65px;
        padding-left: 1.5%;
        text-align: left;
        font-size: $font-size-medium;
        font-weight: bold;
        color: $color-text;
      }
      .item {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        list-style: none;
        width: 33%;
        padding: 0 1%;
        .icon {
          position: relative;
          display: inline-block;
          width: 100%;
          margin-bottom: 5px;
          .gradients {
            position: absolute;
            top: 0;
            width: 100%;
            height: 35px;
            border-radius: 3px;
            background: linear-gradient(rgba(109, 109, 109, 0.4),rgba(255, 255, 255, 0));
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }
        }
        .play-count {
          position: absolute;
          top: 5px;
          right: 8px;
          font-size: $font-size-small-s;
          color: $color-text-l
        }
        .text {
          float: left;
          line-height: 16px;
          text-align: left;
          height: 40px;
          line-height: 16px;
          overflow: hidden;
          margin-bottom: 10px;
          font-size: $font-size-small;
        }
      }
    }
    .recommend-song {
      margin-top: -20px;
      box-sizing: border-box;
      width: 100%;
      text-align: center;
      .title {
        height: 65px;
        line-height: 65px;
        padding-left: 1.5%;
        text-align: left;
        font-size: $font-size-medium;
        font-weight: bold;
        color: $color-text;
      }
      .item {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        width: 33%;
        padding: 0 1%;
        .icon {
          position: relative;
          display: inline-block;
          width: 100%;
          margin-bottom: 5px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
          }
        }
        .text {
          line-height: 16px;
          text-align: left;
          height: 16px;
          @include no-wrap();
          font-size: $font-size-small;
        }
        .singer {
          line-height: 16px;
          margin-bottom: 10px;
          text-align: left;
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-g;
        }
      }
    }
  }
}

</style>

