
<template>
    <div class="singer" ref="singer">
        <span>123456</span>
    </div>    
</template>

<script>
import {getSingers} from '../../api/DNApi'

export default {
    data:{
        singerList :[]
    },
    created(){
       this._loadRecommendSingerList();
    },
    methods:{
    // 加载推荐歌手列表
        _loadRecommendSingerList(params) {
            getSingers().then(rsp=>{

            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


