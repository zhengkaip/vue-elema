<template>
	<div class="operate clear">
		<transition name="fade">
			<div class="fl" v-if="foods.count">
				<button class="remove iconfont icon-remove_circle_outlin" @click="cancel"></button>
				<span class="count" >{{foods.count}}</span>
			</div>
		</transition>
		<button class="add iconfont icon-add_circle fl" @click="add"></button>
	</div>
</template>
<script>
	import Vue from "vue"
	import { bus } from '../../bus.js'
	
	export default{
		name:"operate",
		props:{
			foods:{
				type:Object
			}
		},
		methods:{
			add(event){
					let count=0;
					console.log("add")
					if(!this.foods.count){
						Vue.set(this.foods,'count',1);
					}else{
						count=this.foods.count+1;
						Vue.set(this.foods,'count',count);
					};
					console.log(this.$emit)
					bus.$emit('drag', event.target)
						
			},
			cancel(event){
					let count=0;
					count=this.foods.count-1;
					Vue.set(this.foods,'count',count);
			}
		}
	}
</script>
<style lang='scss' scoped>
	.operate{
		button{
			outline: none;
			border:none;
			background: none;
		}
		.count{
			display: inline-block;
			width:48px;
			text-align: center;
			line-height: 48px;
			font-size: 40px;
			color: rgb(147,150,159);
		
		}
		.add{
			color:rgb(0,160,220);
			font-size: 48px;
		}
		.remove{
			color:rgb(0,160,220);
			font-size: 48px;
		}

		.fade-enter-active{
		  	transition: all 0.2s;
		  	transform: translate3d(0,0,0);
		  	opacity: 1;
		  	.remove{
		  		transition: all 0.2s;
		  		transform:rotateZ(360deg);
		  	}
		}
		.fade-enter{
			opacity: 0;
		  	transform: translate3d(45px,0,0);
		  	.remove{
		  		transform:rotateZ(0deg);
		  	}
		}

		.fade-leave-active{
			transition: all 0.2s;
		  	transform: translate3d(45px,0,0);
		  	opacity: 0;
		  	.remove{
		  		transition: all 0.2s;
		  		transform:rotateZ(360deg);
		  	}
		}

		.v-leave{
			opacity: 1;
			transform: translate3d(0,0,0);
		  	.remove{
		  		transform:rotateZ(0deg);
		  	}
		}
	}
</style>
