<template>
    <scroll class="listview" ref="listview"
    :listenScroll="listenScroll" @scroll="scroll" 
    :probeType="probeType">
        <ul>
            <li v-for="group in data" class="list-group" :key="group.id" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li 
                    @click="selectItem(item)"
                     v-for="item in group.items" 
                     class="list-group-item"
                     v-bind:key="item.id">
                        <img v-lazy="item.avatar" class="avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </scroll>
</template>

<script>
import Scroll from "@/base/scroll/scroll"
import VueLazyload from 'vue-lazyload'
import {getData} from '@/js/dom'
const ANCHOR_HEIGHT = 20
export default {
    props:{
        data : {
            type:Array
        }
    },
    data(){
        return {
            scrollY : -1,
            currentIndex : 0
        }
    },
    created(){
        this.touch = {}
        this.listenScroll = true
        this.listHeight = []
        this.probeType = 3
    },
    computed(){

    },
    methods:{

    }

}
</script>

<style lang="scss" scoped>

</style>

