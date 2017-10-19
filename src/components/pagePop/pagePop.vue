<template>
  <div class="pop-wrap">
    <div class="page-pop clearfix">
      <div class="pop-content">
        <h3>{{seller.name}}</h3>
        <div class="pop-star">
          <star :size="48" :score="seller.score"></star>
        </div>
        <div class="title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <div class="supports">
          <div v-for="item in seller.supports" class="list" :class="item.type | supportsType">
            {{item.description}}
          </div>
        </div>
        <div class="title">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <p class="bulletin">{{seller.bulletin}}</p>
      </div>
    </div>
    <div class="pop-close icon iconfont icon-close" v-on:click="showFn"></div>
  </div>
</template>
<script>
  import star from '../star/star'

  export default {
    name: 'pagePop',
    components: {
      star,
    },
    props: {
      seller: {
        type: Object
      },
      showFn:{
        type:Function
      }
    },
    data () {
      return {
      }
    },
    created () {

    },
    filters: {
      supportsType: function (type) {
        var filterClass = ''
        switch (type) {
          case 0:
            filterClass = 'decrease'
            break
          case 1:
            filterClass = 'discount'
            break
          case 2:
            filterClass = 'special'
            break
          case 3:
            filterClass = 'invoice'
            break
          case 4:
            filterClass = 'guarantee'
            break
          default:
            filterClass = ''
        }
        return filterClass
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "../../common/style/mixin.scss";
  .pop-wrap {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    overflow: auto;
    .page-pop {
      width: 100%;
      min-height: 100%;
      .pop-content {
        margin-top: 128px;
        padding-bottom: 128px;
        color: #fff;
        h3 {
          font-size: 32px;
          font-weight: 700;
          color: rgb(255, 255, 255);
          line-height: 32px;
          text-align: center;
        }
        .pop-star {
          padding: 32px 0 56px 0;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 0 auto 48px auto;
          .line {
            flex: 1;
            position: relative;
            top: -12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          }
          .text {
            padding: 0 24px;
            font-size: 28px;
          }
        }
        .supports{
            margin-left: 72px;
            padding-bottom: 22px;
            .list{
                padding-left: 45px;
                margin-left: 24px;
                font-size: 24px;
                font-weight: 200;
                color:rgb(255,255,255);
                line-height: 32px;
                margin-bottom: 24px;
            }
            .decrease{
                @include bg-img(decrease_4,32px,32px);
            }
            .discount{
                @include bg-img(discount_4,32px,32px);
            }
            .special{
                @include bg-img(special_4,32px,32px);
            }
            .invoice{
                @include bg-img(invoice_4,32px,32px);
            }
            .guarantee{
                @include bg-img(guarantee_4,32px,32px);
            }
        }
        .bulletin{
            width: 606px;
            padding:48px 24px 0;
            margin:0 auto;
            font-size: 24px;
            font-weight: 200;
            color:rgb(255,255,255);
            line-height: 48px; 
        }
      }
    }
    .pop-close {
      position: relative;
      margin: -128px auto 0 auto;
      font-size: 64px;
      color: #92979b;
      text-align: center;
    }
  }

  .clearfix {
    display: inline-block;
    &::after {
      display: block;
      height: 0;
      line-height: 0;
      content: ".";
      clear: both;
      visibility: hidden;
    }
  }

</style>
