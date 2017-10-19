<template>
  <div class="header">
    <div class="clear">
      <div class="fl">
        <img class="avatar" :src="seller.avatar" alt="">
      </div>
      <div class="fl info">
        <h2 class="name">{{seller.name}}</h2>
        <p class="description">{{seller.description}}/{{seller.deliveryTime}}送达</p>
        <p v-if="seller.supports" class="activity" :class="classMap[seller.supports[0].type]">{{seller.supports[0].description}}</p>
        <p v-if="seller.supports" class="activity-num" @click="showFn">{{seller.supports.length}}个<span>></span></p>
      </div>
    </div>
    <div class="bulletin">
      <p>{{seller.bulletin}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    props:{
      seller:{
        type:Object
      },
      showFn:{
        type:Function
      }
    },
    data () {
      return {
        classMap : ['decrease','discount','special','invoice','guarantee']
      }
    },
    created:function(){

    }
  }
</script>

<style lang='scss' scoped>
  @import "../../common/style/mixin.scss";

  .header {
    padding: 48px 0 0px 0px;
    background: #5e5f63;
    .avatar{
      width:128px;
      height:128px;
      margin-left: 48px;
      @include border-radius(4px)
    }
    .info{
      position: relative;
      width:520px;
      padding-top: 4px;
      margin-left: 24px;
    }
    .name{
      line-height: 36px;
      padding-left: 72px;
      margin-bottom: 16px;
      font-size:32px;
      color:rgb(255,255,255);
      font-weight: bold;
      @include bg-img(brand,60px,36px)
    }
    .description{
      font-size: 24px;
      color:rgb(255,255,255);
      font-weight: 200;
      line-height: 24px;
      margin-bottom: 20px;
    }
    .activity{
      font-size: 20px;
      color:rgb(255,255,255);
      font-weight: 200;
      line-height: 24px;
      padding-left: 32px;
      margin-bottom: 4px;
    }
    .decrease{
      @include bg-img(decrease_2,24px,24px);
    }
    .discount{
      @include bg-img(discount_2,24px,24px);
    }
    .special{
      @include bg-img(special_2,24px,24px);
    }
    .invoice{
      @include bg-img(invoice_2,24px,24px);
    }
    .guarantee{
      @include bg-img(guarantee_2,24px,24px);
    }
    .activity-num{
      position: absolute;
      right:0;
      bottom:0;
      height:48px;
      width:42px;
      padding:0 24px;
      line-height: 48px;
      background: rgba(0,0,0,0.2);
      border-radius: 24px;
      font-size: 24px;
      color:#fff;
      font-weight: 200;
      span{
        position: absolute;
        top:50%;
        left:65px;
        font-size: 16px;
        transform: translateY(-50%);
      }
    }
    .bulletin{
      line-height: 56px;
      font-size: 20px;
      color:rgb(255,255,255);
      font-weight: 56px;
      padding-left: 24px;
      background: rgba(7,17,27,0.2);
      p{
        padding-left: 50px;
        margin-top: 36px;
        @include overflow-ellipsis;
        @include bg-img(bulletin,44px,24px);
      }
    }
  }

</style>
