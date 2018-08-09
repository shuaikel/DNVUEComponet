<template>
  <div id="app">
    <m-header></m-header>
    <Tab></Tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <!-- <player></player> -->
  </div>
</template>


<script>

import MHeader from './components/m-header/m-header'
import Tab from './components/tab/tab'
export default {
  name: 'App',
  components : {
       MHeader,
       Tab
  }
}
</script>

<style>
/* @import '@/common/scss/index.scss'; */
#app {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  /* overflow: hidden; */
}
</style>
