<template>
	<div class="goods">
		<div class="menu menu-wrapper" ref="menu-wrapper">
			<ul ref="menu-content">
				<li v-for="(item,index) in foodsAll" :class="{current : currentIndex==index}" @click="_checkMenu(index,$event)">
					<p><span v-show="item.type>0 || item.type==0" class="icon" :class="item.type | filterClass"></span>{{item.name}}</p>
				</li>
			</ul>
		</div>
		<div class="goods-list goods-wrapper" ref="goods-wrapper">
			<div ref="goods-content">
				<dl v-for="(item,index) in foodsAll" class="goods-h" ref="foodList">
					<dt>{{item.name}}</dt>
					<dd v-for="foods in item.foods">
						<img :src="foods.icon" alt="">
						<div class="foods-info">
							<h3>{{foods.name}}</h3>
							<div class="foods-des">
								<p>{{foods.description}}</p>
								<p>月售{{foods.sellCount}}份  好评率{{foods.rating}}%</p>
							</div>
							<div class="foods-operate clear">
								<p class="fl">￥<strong>{{foods.price}}</strong> <span v-if="foods.oldPrice">￥{{foods.oldPrice}}</span></p>
								<div class="fr">
									<Operate :foods="foods"></Operate>
								</div>
							</div>
						</div>
					</dd>
				</dl>
			</div>
		</div>
	</div>
</template>
<script>
	import Bscroll from 'better-scroll'
	import Shopping from '../shopping/shopping'
	import Operate from "../operate/operate"

	import {mapState} from 'vuex'
    const ERR_OK=0;
	export default{
		name:"goods" ,
		data(){
			return {
				foodsAll:[],
				listHeight:[],
				scrollY:90,
				menuIndex:0
			}
		},
		components:{
			Operate
		},
		computed:{
			currentIndex(){
		        for (let i = 0; i < this.listHeight.length; i++) {
		          let height1 = this.listHeight[i];
		          let height2 = this.listHeight[i + 1];
		          
		          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
		            return i;
		          }
		        }
		        return 0;
		    },
			selectFoods(){
		 		let selectArr=[];
		 		this.foodsAll.forEach((good) => {
			         good.foods.forEach((food) => {
			            if (food.count) {
			              selectArr.push(food);
			            }
			         });
		        });
		 		return selectArr;
		 	}
		},
		created(){
			this.$http.get("/api/goods").then(function(response){
				response=response.body;
				if(response.errno==ERR_OK){
					this.foodsAll=response.data;
					this._setScroll();
				}
			})
		},
		beforeUpdate(){
			this.$store.commit("selectFoods",this.selectFoods)
		},
		methods:{
			_calculateHeight(){
				let foodList=this.$refs.foodList;
				let height=0;
				this.listHeight.push(height);
				for (var i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height+=item.clientHeight;
					this.listHeight.push(height);

				}
			},
			_checkMenu(index,event){
				var toY=this.listHeight[index];
				this.scrollY=toY;
				this.goodsScroll.scrollTo(0,-toY,300);
			},
			_setScroll(){
				this.$nextTick(() => { 
					if(!this.menuScroll){
						this.menuScroll = new Bscroll(this.$refs['menu-wrapper'], {
							probeType: 3,click:true}) ;
						this.goodsScroll = new Bscroll(this.$refs['goods-wrapper'], {probeType: 3,click:true}) ;
						this.goodsScroll.on("scroll",(pos)=>{
							var toY=0;
							var percent=0;
							this.scrollY=Math.ceil(Math.abs(pos.y));

							percent=this.scrollY/(this.$refs['goods-wrapper'].offsetHeight-this.$refs['goods-content'].offsetHeight);

							toY=(this.$refs['menu-wrapper'].offsetHeight-this.$refs['menu-content'].offsetHeight)*percent;
							this.menuScroll.scrollTo(0, -toY, 300);
						})
						this.goodsScroll.on("scrollEnd",(pos)=>{
							this.scrollY=Math.ceil(Math.abs(pos.y));
						})
						this._calculateHeight();
					}else{
						this.menuScroll.refresh() ;
						this.goodsScroll.refresh() ;
					}
				})
			}
		},
		filters:{
			filterClass:function(vuale){
				var filterClass = ''
		        switch (vuale) {
		          case 0:
		            filterClass = 'decrease active'
		            break
		          case 1:
		            filterClass = 'discount active'
		            break
		          case 2:
		            filterClass = 'special active'
		            break
		          case 3:
		            filterClass = 'invoice active'
		            break
		          case 4:
		            filterClass = 'guarantee active'
		            break
		          default:
		            filterClass = ''
		        }
		        return filterClass
			},
			filterIndex:function(index){
				return "#"+index;
			}
		}
	}
</script>
<style lang='scss' scoped>
	@import "../../common/style/mixin.scss";
	.goods{
		display: flex;
		width: 100%;
		position: absolute;
		top:352px;
		bottom: 96px;
		overflow: hidden;
		.menu{
			flex:0 0 160px;
			width:160px;
			background: #f3f5f7;
			.current{
				background: #fff;
				p{
					@include border-none()
				}
			}
			li{
				display: table;
				height: 108px;
				padding:0 24px;
				font-size: 24px;
				color:#07111b;
				line-height: 28px;
				p{
					display: table-cell;
					width: 112px;
					vertical-align: middle;
					@include border-1px(#dbdee1)
					.active{
						display: inline-block;
						width: 25px;
						height: 25px;
						vertical-align: sub;
						margin-right: 4px;
					}
					.decrease{
						@include bg-img(decrease_3,25px,25px);
					}
					.discount{
						@include bg-img(discount_3,25px,25px);
					}
					.special{
						@include bg-img(special_3,25px,25px);
					}
					.invoice{
						@include bg-img(invoice_3,25px,25px);
					}
					.guarantee{
						@include bg-img(guarantee_3,25px,25px);
					}
				}
			}
		}
		.goods-list{
			flex:1;
			dt{
				font-size: 24px;
				color:rgb(147,153,159);
				line-height:52px;
				background: #f3f5f7;
				border-left: 2px solid #d9dde1;
				padding-left: 28px;
			}
			dd{
				display: flex;
				margin:36px 36px 0px;
				padding-bottom: 36px;
				@include border-1px(rgba(7,17,27,0.2))
				img{
					flex:0 0 114px;
					width:114px;
					height:114px;
					margin-right: 20px;
				}
				.foods-info{
					flex:1;
					padding-top: 4px;
					h3{
						font-size: 28px;
						color:rgb(7,17,27);
						line-height: 28px;
						margin-bottom: 16px;
					}
					.foods-des{
						font-size: 20px;
						color:rgb(147,153,159);
						line-height: 20px;
						p{
							margin-bottom: 16px;
						}
						p:last-child{
							margin-bottom: 0;
						}
					}
				}
				.foods-operate{
					p{
						font-size: 20px;
						color:rgb(147,153,159);
						line-height: 48px;
						color:#f01414;
						strong{
							font-size: 28px;
							font-weight: 700;
						}
						span{
							color:rgb(147,153,159);
							font-weight:700;
							margin-left: 16px;
							text-decoration: line-through;
						}
					}
				}
			}
			dd:last-child{
				@include border-none()
			}
		}
	}
</style>
