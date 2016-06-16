var express = require('express')
var multipart = require('connect-multiparty')
var querystring = require('querystring')
//var movies = require('./fs.js')
var Model = require('./model/movie')

var port = process.env.PORT||3000
var app = express()
app.use(express.static('bower_components'))
app.set('views','./views/pages')
app.set('view engine','jade')
app.listen(port)
console.log('web start on '+port)

app.get('/',function(req,res) {
	Model.findAll(function(movies){
		res.render('index',{movies})
	})
	
})
app.get('/admin',function(req,res){
	Model.findAll(function(movies){
		res.render('admin',{movies})
	})
})

app.get('/movieMessage',function(req,res){
	var movieId = req.query.dataInfo
	Model.findOneById(movieId,function(item){
		res.send(item)
		res.end()
	})
})

app.post('/movieUpdate',function(req,res){
	var mes=''
	req.addListener('data',function(chunk){
		mes+=chunk
	})
	req.addListener('error',function(e){
		console.log('req error')
		res.end('服务器处理请求错误')
	})
	req.addListener('end',function(){
		var newdata = querystring.parse(mes)
		try{
			for(var p in newdata){
				if(/^{/.test(newdata[p])){
					newdata[p]=JSON.parse(newdata[p])
				}
			}
		}catch(e){
			console.log(e)
			res.end('修改失败')
		}finally{
			Model.updateById(newdata.movieId,newdata)
			res.end('修改成功')
		}
	})
	
})

app.post('/movieadd',function(req,res){
	var mes=''
	req.addListener('data',function(chunk){
		mes+=chunk
	})
	req.addListener('error',function(e){
		console.log('req error')
		res.end('服务器处理请求错误')
	})
	req.addListener('end',function(){
		var newdata = querystring.parse(mes)
		try{
			for(var p in newdata){
				if(/^{/.test(newdata[p])){
					newdata[p]=JSON.parse(newdata[p])
				}
			}
		}catch(e){
			console.log(e)
			res.end('修改失败')
		}finally{
			newdata.movieId='movie_'+(new Date()).getTime()
			Model.insertMovie(newdata,function(item){
				res.end('插入成功')
			})
		}
	})
	
})

app.get('/deleteMovie',function(req,res){
	var movieId = req.query.dataInfo
	Model.deleteById(movieId,function(){
		res.end('删除成功！')
	})
})