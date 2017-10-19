<template>
	<div class="shop-car" ref="shop-wrap">
		<div class="shop-wrap">
			<div class="shop-detail clear">
				<div class="logo-wrap fl">
					<div class="logo" :class="{'active':allPrice>0}" @click="showSelect">
						<span class="iconfont icon-shopping_cart"></span>
					</div>
					<span class="allCount" v-if="allPrice">{{allCount}}</span>
				</div>
				<div class="price fl">
					<p :class="{'active':allPrice}">￥{{allPrice}}</p>
				</div>
				<div class="distribution fl">
					另需配送费￥{{seller.deliveryPrice}}元
				</div>
			</div>
			<div class="play" :class="{'active':diffPrice<0||diffPrice==0}">
				<span v-if="allCount==0">￥{{seller.minPrice}}起送</span>
				<span v-if="diffPrice>0&&allCount!=0">还差￥{{diffPrice}}起送</span>
				<span v-if="diffPrice<0||diffPrice==0">购买</span>
			</div>
			<div class="ball-container">
				<div v-for="ball in balls">
					<transition name="drop" v-on:before-enter="beforeEnter"  v-on:enter="enter"  v-on:after-enter="afterEnter">
						<div class="ball" v-show="ball.show">
							<div class="inner inner-hook"></div>
						</div>	
					</transition>
				</div>
			</div>
		</div>
		<div class="purchase-list" :class="{'hide':allCount==0}" ref="select-car">
			<div class="car-header clear">
				<span class="fl">购物车</span>
				<span class="fr clear-car">清空</span>
			</div>
			<ul>
				<li v-for="foods in selectFoods">
					<p class="fl">{{foods.name}} </p>
					<div class='fr'>
						<span class="fl">￥{{foods.price*foods.count}}</span>
						<div class="fl operate-wrap">
							<Operate :foods="foods" class="fl"></Operate>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="purchase-shade" :class="{'hide':allCount==0}" v-show="fold" @click="hideSelect">
			
		</div>
	</div>
</template>
<script>
	import { bus } from '../../bus.js'
	import Operate from "../operate/operate"

	export default{
		name:"shopping",
		data(){
			return {
				balls:[
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
				],
				dropBalls:[],
				fold:false,
			}
		},
		components:{
			Operate
		},
		props:{
			seller:{
				type:Object
			}
		},
		computed:{
			selectFoods(){
				return this.$store.state.selectFoods;
			},
			allPrice(){
				var allPrice=0;
				this.selectFoods.forEach((item)=>{
					allPrice+=item.price*item.count;
				})
				return allPrice;
			},
			allCount(){
				var allCount=0;
				this.selectFoods.forEach((item)=>{
					allCount+=item.count;
				})
				return allCount;
			},
			diffPrice(){
				return this.seller.minPrice-this.allPrice
			}
		},
		beforeMount(){
			bus.$on('drag', (index)=>{
				this._drop(event.target);
			})
		},
		methods:{
			_drop(el){
				for (var i = 0; i < this.balls.length; i++) {
					let ball=this.balls[i];
					if(!ball.show){
						ball.show=true;
						ball.el=el;
						this.dropBalls.push(ball);
						console.log("dropBalls",this.dropBalls)
						return ;
					}
				}
			},
			beforeEnter(el){
				let count = this.balls.length;
		        while (count--) {
			         let ball = this.balls[count];
			         if (ball.show) {
				            let rect = ball.el.getBoundingClientRect();
				            console.log(rect)
				            let x = rect.left - 64;
				            let y = -(window.innerHeight - rect.top - 44);
				            el.style.display = '';
				            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
				            el.style.transform = `translate3d(0,${y}px,0)`;
				            let inner = el.getElementsByClassName('inner-hook')[0];
				            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
				            inner.style.transform = `translate3d(${x}px,0,0)`;
				            console.log(inner)
			         }
		        }
			},
			enter(el){
				let rf = el.offsetHeight;
		        this.$nextTick(() => {
			          el.style.webkitTransform = 'translate3d(0,0,0)';
			          el.style.transform = 'translate3d(0,0,0)';
			          let inner = el.getElementsByClassName('inner-hook')[0];
			          inner.style.webkitTransform = 'translate3d(0,0,0)';
			          inner.style.transform = 'translate3d(0,0,0)';
		        });
			},
			afterEnter(el){
				let ball = this.dropBalls.shift();
		        if (ball) {
		          ball.show = false;
		          el.style.display = 'none';
		        }
			},
			showSelect(){
				let selectCar=this.$refs['select-car'];
				let shopWrap=this.$refs['shop-wrap'];
				if(this.selectFoods.length>0){
					this.fold=true
				}
				var carHeight=selectCar.offsetHeight+shopWrap.offsetHeight;
				selectCar.style.transform=`translate3d(0,-${carHeight}px,0)`;
				
			},
			hideSelect(){
				let selectCar=this.$refs['select-car'];
				this.fold=false;
				selectCar.style.transform="translate3d(0,0,0)";
			},
		}
	}
</script>
<style lang='scss' scoped>

	@import "../../common/style/mixin.scss";
	.shop-car{
		position: fixed;
		bottom:0;
		width:100%;
		.shop-wrap{
			position: relative;
			z-index: 2;
			display: flex;
			height:96px;
			background: #141d27;
			.shop-detail{
				flex: 1;
				padding-left: 36px;
				position: relative;
				z-index: 2;
				.logo-wrap{
					position: relative;
					z-index: 2;
					top:-20px;
					width: 88px;
					height:88px;
					background: #141d27;
					border-radius: 50%;
					padding:12px;
					
					.logo{
						width:88px;
						height:88px;
						border-radius: 50%;
						background: #2b343c;
						text-align: center;
						line-height: 88px;
						span{
							color:#80858a;
							font-size: 50px;
						}
						&.active{
							background: #00a0dc;
							span{
								color:#fff;
							}
						}
					}
					.allCount{
						position: absolute;
						top:0;
						right:0;
						background: red;
						font-size: 30px;
						color:#fff;
						padding:5px 20px;
						border-radius: 20px;
					}
				}
				.price{
					margin-left: 36px;
					padding:24px 0;
					p{
						line-height: 48px;
						font-size: 30px;
						color:#919396;
						padding-right: 24px;
						border-right: 1px solid rgba(255,255,255,0.1);
						&.active{
							color:#fff;
							font-weight: 700;
						}
					}
				}
				.distribution{
					padding-left: 24px;
					color:#919396;
					line-height: 98px;
				}
			}
			.play{
				flex:0 0 210px;
				width:210px;
				font-size: 24px;
				color:rgba(255,255,255,0.4);
				font-weight: 700;
				line-height: 96px;
				background: #2b333b;
				text-align: center;
				position: relative;
				z-index: 2;
				&.active{
					background: #00b43c;
					color:#fff;
				}
			}
			.ball-container{
				.ball{
					position: fixed;
			        left: 64px;
			        bottom: 44px;
			        z-index: 200;
			        transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
				}
				.inner{
			        width: 32px;
			        height: 32px;
			        border-radius: 50%;
			        background: rgb(0, 160, 220);
			        transition: all 0.5s linear;
		        }
			}
		}
		.purchase-shade{
			position: fixed;
			background: rgba(0,0,0,0.5);
			width: 100%;
		    height: 100%;
		    top: 0;
		    &.hide{
		    	display: none;
		    }
		}
		.purchase-list{
			position: absolute;
			top:98px;
			width:100%;
			max-height: 515px;
			z-index: 1;
			transition: all 0.5s linear;
			.car-header{
				height: 80px;
				background: #f4f5f7;
				line-height: 80px;
				padding:0 35px;
				border-bottom: 2px solid #dddee0;
				font-size: 24px;
				color:#050d18;
			}
			ul{
				background: #fff;
				padding:0 35px 50px;
				li{
					overflow: hidden;
					@include border-1px(#e8e8e8);
					p{
						line-height: 98px;
					}
					span{
						line-height: 98px;
						font-size: 32px;
					    color: #f01414;
						font-weight: 700;
					}
					.operate-wrap{
						padding-top: 20px;
					}
				}
			}
			&.hide{
				transform:translate3d(0,0,0) !important;
			}
		}
	}
	
</style>
