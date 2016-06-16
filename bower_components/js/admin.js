(function(){
	$(function(){
		$('.btnCheck').on('click',function(){
			var dataInfo = $(this).attr('data-info')
			$.ajax({
				url:'/movieMessage',
				type:'GET',
				data:'dataInfo='+dataInfo,
				success:function(data,status,xhr){
					var checkInfo = $('.checkInfo')
					checkInfo.html('')
					for(var p in data){
						if(p==='_id'||p==='__v'||p==='title')continue
						if((typeof data[p])==='object'){
							for(var j in data[p]){
								$('<p><strong>'+j+'</strong>:'+data[p][j]+'</p>').appendTo(checkInfo)
							}
						}else{$('<p><strong>'+p+'</strong>:'+data[p]+'</p>').appendTo(checkInfo)}
					}
				}
			})
		})
		var dataInfoG=['']
		$('.btnUpdate').on('click',function(){
			var dataInfo = $(this).attr('data-info')
			dataInfoG[0]=dataInfo
			$.ajax({
				url:'/movieMessage',
				type:'GET',
				data:'dataInfo='+dataInfo,
				success:function(data,status,xhr){
					var updateInfo = $('.updateInfo')
					updateInfo.html('')
					for(var p in data){
						if(p==='_id'||p==='__v'||p==='updated_at'||p==='created_at'||p==='movieId'||p==='title')continue
						if((typeof data[p])==='object'){
							for(var j in data[p]){
								$('<div style="margin:10px"><strong>'+j+'</strong>:<div contenteditable="true" style="margin-left:20px;padding:5px;display:inline-block;outline:1px #ccc solid" data-name='+p+'-:'+j+'>'+data[p][j]+'</div></div>').appendTo(updateInfo)
							}
						}else{$('<div style="margin:10px"><strong>'+p+'</strong>:<div contenteditable="true" style="margin-left:20px;padding:5px;display:inline-block;outline:1px #ccc solid" data-name='+p+'>'+data[p]+'</div></div>').appendTo(updateInfo)}
					}
				}
			})
		})
		$('.updateConfirm').on('click',function(){
				var divs = $('.updateInfo').find($('div[data-name]'))
				var dataInfo=dataInfoG[0]
				console.log(dataInfo)
				var string='movieId='+dataInfo+'&'
				var innerObj = []
				var innerObjCount=[]
				for(var i=0;i<divs.length;i++){
					var ele = $(divs[i])
					var dn = ele.attr('data-name')
					var zzb =/-:/
					if(!zzb.test(dn)){
						if(i==0){string += dn +'='+ele.text()}
						else{string += '&'+ dn +'='+ele.text()}
					}else{
						var dns = dn.split('-:')
						if(innerObj[innerObj.length-1]!==dns[0]){innerObj.push(dns[0])}
					}
				}
				for(var j=0;j<innerObj.length;j++){
					innerObjCount.push(0)
					for(var i=0;i<divs.length;i++){
						var ele = $(divs[i])
						var dn = ele.attr('data-name')
						var zzb = /-:/
						if(zzb.test(dn)){
							var dns = dn.split('-:')	
							if(dns[0]===innerObj[j]){
								innerObjCount[j]++
							}
						}
					}
				}
				var comString=''
				for(var j=0;j<innerObj.length;j++){
					var comString_p=''
					var count = 0
					for(var i=0;i<divs.length;i++){
						var ele = $(divs[i])
						var dn = ele.attr('data-name')
						var zzb = /-:/
						if(zzb.test(dn)){
							var dns = dn.split('-:')	
							if(dns[0]===innerObj[j]){
								count++
								if(count<innerObjCount[j]){comString_p += '"'+dns[1]+'"'+':"'+ele.text()+'",'}
									else{comString_p += '"'+dns[1]+'"'+':"'+ele.text()+'"'}
							}
						}
					}
					if(j===innerObj.length-1){
						comString+=innerObj[j]+'={'+ comString_p+'}'
					}else{comString+=innerObj[j]+'={'+ comString_p+'}&'}
				}
				string+='&'+comString
				$.ajax({
					url:'/movieUpdate',
					type:'POST',
					beforeSend:function(xhr){if(!window.confirm('确定修改？')){xhr.abort()}},
					data:string,
					success:function(data,status,xhr){
						console.log(data)
					}
				})
		})

		$('.addmovie').on('click',function(){
			$.ajax({
				url:'/movieMessage',
				type:'GET',
				data:'dataInfo=movie_1',
				success:function(data,status,xhr){
					var addmovieInfo = $('.addmovieInfo')
					addmovieInfo.html('')
					for(var p in data){
						if(p==='_id'||p==='__v'||p==='updated_at'||p==='created_at'||p==='movieId')continue
						if((typeof data[p])==='object'){
							for(var j in data[p]){
								$('<div style="margin:10px"><strong>'+j+'</strong>:<div contenteditable="true" style="margin-left:20px;padding:5px;display:inline-block;outline:1px #ccc solid" data-name='+p+'-:'+j+'> </div></div>').appendTo(addmovieInfo)
							}
						}else{$('<div style="margin:10px"><strong>'+p+'</strong>:<div contenteditable="true" style="margin-left:20px;padding:5px;display:inline-block;outline:1px #ccc solid" data-name='+p+'> </div></div>').appendTo(addmovieInfo)}
					}
				}
			})
		})

		$('.addmovieConfirm').on('click',function(){
				var divs = $('.addmovieInfo').find($('div[data-name]'))
				var innerObj = []
				var innerObjCount=[]
				var string=''
				for(var i=0;i<divs.length;i++){
					var ele = $(divs[i])
					var dn = ele.attr('data-name')
					var zzb =/-:/
					if(!zzb.test(dn)){
						if(i==0){string += dn +'='+ele.text()}
						else{string += '&'+ dn +'='+ele.text()}
					}else{
						var dns = dn.split('-:')
						if(innerObj[innerObj.length-1]!==dns[0]){innerObj.push(dns[0])}
					}
				}
				for(var j=0;j<innerObj.length;j++){
					innerObjCount.push(0)
					for(var i=0;i<divs.length;i++){
						var ele = $(divs[i])
						var dn = ele.attr('data-name')
						var zzb = /-:/
						if(zzb.test(dn)){
							var dns = dn.split('-:')	
							if(dns[0]===innerObj[j]){
								innerObjCount[j]++
							}
						}
					}
				}
				var comString=''
				for(var j=0;j<innerObj.length;j++){
					var comString_p=''
					var count = 0
					for(var i=0;i<divs.length;i++){
						var ele = $(divs[i])
						var dn = ele.attr('data-name')
						var zzb = /-:/
						if(zzb.test(dn)){
							var dns = dn.split('-:')	
							if(dns[0]===innerObj[j]){
								count++
								if(count<innerObjCount[j]){comString_p += '"'+dns[1]+'"'+':"'+ele.text()+'",'}
									else{comString_p += '"'+dns[1]+'"'+':"'+ele.text()+'"'}
							}
						}
					}
					if(j===innerObj.length-1){
						comString+=innerObj[j]+'={'+ comString_p+'}'
					}else{comString+=innerObj[j]+'={'+ comString_p+'}&'}
				}
				string+='&'+comString
				console.log(string)
				$.ajax({
					url:'/movieadd',
					type:'POST',
					data:string,
					success:function(data,status,xhr){
						alert(data)
					}
				})
		})
		$('.btnDelete').on('click',function(){
			var dataInfo = $(this).attr('data-info')
			if(dataInfo=='movie_1')return
			$.ajax({
				url:'/deleteMovie',
				type:'GET',
				data:'dataInfo='+dataInfo,
				success:function(data,status,xhr){
					window.location.reload()
					console.log(data)
				}
			})
		})

	})	
})()