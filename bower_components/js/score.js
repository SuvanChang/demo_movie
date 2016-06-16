define(["jquery"],function($){
	function scoreModule(){
		$(function(){
			if($('.scoreBash')){
				for(var i = 1;i<6;i++){
					$('.scoreBash').append($('<span class="scoreBash_item_'+i+'">☆</span>'))		
				}
				var drawStar = function(i,star){
					if(i==1){
						$('.scoreBash_item_1').html(star)
					} else if(i==2){
						$('.scoreBash_item_1').html(star)
						$('.scoreBash_item_2').html(star)				
					}else if(i==3){
						$('.scoreBash_item_1').html(star)
						$('.scoreBash_item_2').html(star)
						$('.scoreBash_item_3').html(star)				
					}else if(i==4){
						$('.scoreBash_item_1').html(star)
						$('.scoreBash_item_2').html(star)
						$('.scoreBash_item_3').html(star)
						$('.scoreBash_item_4').html(star)				
					}else if(i==5){
						$('.scoreBash_item_1').html(star)
						$('.scoreBash_item_2').html(star)
						$('.scoreBash_item_3').html(star)
						$('.scoreBash_item_4').html(star)
						$('.scoreBash_item_5').html(star)				
					}
				}
				$('.scoreBash_item_1').on('mouseover',function(){drawStar(1,'★')})
				$('.scoreBash_item_2').on('mouseover',function(){drawStar(2,'★')})
				$('.scoreBash_item_3').on('mouseover',function(){drawStar(3,'★')})	
				$('.scoreBash_item_4').on('mouseover',function(){drawStar(4,'★')})
				$('.scoreBash_item_5').on('mouseover',function(){drawStar(5,'★')})	
				$('.scoreBash span').on('mouseout',function(){drawStar(5,'☆')})
				$('.scoreBash').delegate('span','click',function(){
					$('.scoreBash span').off('mouseover')
					$('.scoreBash span').off('mouseout')
					$('.scoreBash').undelegate()
					//alert($(this).attr('class'))
					var score = function(item){
						if(item=='scoreBash_item_1'){return 1}
							else if(item=='scoreBash_item_2'){return 2}
							else if(item=='scoreBash_item_3'){return 3}
							else if(item=='scoreBash_item_4'){return 4}
							else if(item=='scoreBash_item_5'){return 5}
					}
					var sc = score($(this).attr('class'))
					var url = $('.scoreBash').attr('data-url')

					$.ajax({
						url:url,
						type:'get',
						data:{score:sc},
						//cache:false,
						success:function(){alert('评价成功')}
					})
				})	
			}		
		})
	}
	return scoreModule
})



