<template>
	<div class='star' :class='starType'>
		<span v-for="starClass in startClasses" :class="starClass" class="item-star"></span>
	</div>
</template>

<script>
	const LENGTH=5;
	export default {
		name:"star",
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			starType:function (){
				return 'star-'+this.size
			},
			startClasses:function(){
				var result=[];
				var integer=Math.floor(this.score);
				var hasDecimals=this.score%1;
				for (var i = 0; i < integer; i++) {
					result.push("on");
				}
				if(hasDecimals){
					result.push("half");
				}
				while(result.length<LENGTH){
					result.push("off")
				}
				return result;
			}
		}
	}
</script>

<style lang='scss' scoped>
	@import "../../common/style/mixin.scss";
	.star{
		text-align: center;
		&.star-48{
			height:48px;
			.item-star{
				width: 48px;
				height: 48px;
				display: inline-block;
				margin-right: 40px;
			}
			.item-star:last-child{
				margin-right: 0px;
			}
			.on{
				@include bg-img(star48_on,40px,40px);
			}
			.half{
				@include bg-img(star48_half,40px,40px);
			}
			.off{
				@include bg-img(star48_off,40px,40px);
			}
		}
		&.star-36{
			height:36px;
			.item-star{
				width: 36px;
				height: 36px;
				display: inline-block;
				margin-right: 40px;
			}
			.on{
				@include bg-img(star36_on,36px,36px);
			}
			.half{
				@include bg-img(star36_half,36px,36px);
			}
			.off{
				@include bg-img(star36_off,36px,36px);
			}
		}
		&.star-24{
			height:24px;
			.item-star{
				width: 24px;
				height: 24px;
				display: inline-block;
				margin-right: 40px;
			}
			.on{
				@include bg-img(star36_on,24px,24px);
			}
			.half{
				@include bg-img(star24_half,24px,24px);
			}
			.off{
				@include bg-img(star24_off,24px,24px);
			}
		}
	}
</style>