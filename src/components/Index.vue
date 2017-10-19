<template>
  <div>
    {{count}}
    <v-header :seller="seller" :showFn="showFn"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="home">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="home">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="home">商家</router-link>
      </div>
    </div>
    <Goods></Goods>
    <Shopping :seller="seller"></Shopping>
    <transition name="fade">
      <PagePop v-if="showPop" :seller="seller" :showFn="showFn"></PagePop>
    </transition>
  </div>
</template>

<script>
  import Header from './header/header'
  import Mycontent from './Content'
  import PagePop from './pagePop/pagePop'
  import Goods from "./goods/goods"
  import Shopping from "./shopping/shopping"

  import { mapState } from 'vuex'

  export default {
    name: 'hello',
    data () {
      return {
        seller:{},
        showPop:false
      }
    },
    components: {
      'v-header': Header,
      'Mycontent': Mycontent,
      'PagePop': PagePop,
      'Goods':Goods,
      "Shopping":Shopping
    },
    computed: {
      ...mapState({
       count: state => state.count,
      })
    },
    created:function () {
      this.$http.get("/api/seller").then(function(response){
        var response=response.body;
        if(response.errno==0){
          this.seller=response.data;
        };
      });
    },
    methods:{
      showFn:function(){
          this.showPop=!this.showPop;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  @import "../common/style/mixin.scss";

  .tab{
    display: flex;
    width:100%;
    height: 80px;
    line-height: 80px;
    @include border-1px(rgba(7,17,27,0.1));
    .tab-item{
      flex:1;
      text-align: center;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
