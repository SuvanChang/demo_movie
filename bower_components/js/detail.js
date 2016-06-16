(function(){
  $(function() {
	var $img = $('.container .col-md-3 img')
	$('.container').delegate('img','click',function(){
		var detail = $(this).attr('data-detail')
		var lime = $('#'+detail+' li')
		var text=''
		for(var i=0;i<lime.length;i++){
			if(i<lime.length-1){text += $(lime[i]).text()+','}
				else{text += $(lime[i]).text()}
		}
		var textjson = '{'+text+'}'
		var textObj = JSON.parse(textjson)
		$('body').append($("<div id='detail_modal'></div>"))
		$('#detail_modal').css({'width':'100%','height':'100%','position':'absolute','left':'0','top':'0','background-color':'rgba(0,0,0,0.5)','z-index':'9996'})
		$('#detail_modal').append($('<div id="detailmessage"><div>'))
		var winw = $(window).width()
		var winh = $(window).height()
		var width=winw/2,height=winh/1.2
		$('#detailmessage').css({
			'width':width+'px',
			'height':height+'px',
			'color':'#333',
			'box-sizing':'border-box',
			'background-color':'#eee',
			'position':'absolute',
			'left':(winw-width)/2+'px',
			'top':(winh-height)/2+'px',
			'border-radius':width/20+'px',
			'padding':width/20+'px',
			'box-shadow':'0 0 10px 10px #333,0 0 2px 2px #666 inset',
			'z-index':'9997',
			'overflow':'auto',
		})
		$('<span><img src="/img/close.png" width="100%" /></span>')
		.on('click',function(){$('#detailmessage').slideUp(function(){$('#detailmessage').remove()});
								$('#detail_modal').fadeOut('fast',function(){$('#detail_modal').remove()})
								})
		.css({'width':width/15+'px','height':width/15+'px','position':'absolute','top':width/35+'px','right':width/25+'px','z-index':'9999',})
		.appendTo($('#detailmessage'))
		$("<div class='container detailContainer'></div>").appendTo($('#detailmessage'))
		$('.detailContainer').css({'width':'90%',})
		$("<div class='row detailRow1'></div>").appendTo($('.detailContainer'))
		$("<div class='col-md-7 detailImg'></div>").appendTo($('.detailRow1'))
		$("<div class='col-md-5 detailInfo'></div>").appendTo($('.detailRow1'))
		$('<video src="'+textObj['videosrc']+'" width=100% controls="controls" style="max-height:300px;display:block" ></video>').appendTo($('.detailImg'))
		$('<p><span class="de-label">影&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span> '+textObj['title']+'<p>').appendTo($('.detailInfo'))
		$('<p><span class="de-label">导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演</span> '+textObj['director']+'<p>').appendTo($('.detailInfo'))
		$('<p><span class="de-label">演&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;员</span> '+textObj['actor']+'<p>').appendTo($('.detailInfo'))
		$('<p><span class="de-label">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</span> '+textObj['kind']+'<p>').appendTo($('.detailInfo'))
		$('<p><span class="de-label">国家/地区</span> '+textObj['area']+'<p>').appendTo($('.detailInfo'))
		$('<p><span class="de-label">上映&nbsp;日期</span> '+textObj['releaseDate']+'<p>').appendTo($('.detailInfo'))
		$('<p><span class="de-label">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长</span> '+textObj['duration']+'<p>').appendTo($('.detailInfo'))
		$('<p style="margin-top:10px;"><span class="de-label">内容介绍</span> '+textObj['content']+'<p>').appendTo($('.detailImg'))
		$('.de-label').css({'font-weight':'bold','width':'70px','display':'inline-block'})
	})
  })
})()
