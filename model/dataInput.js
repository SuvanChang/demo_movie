var Model = require('./movie')
var fs = require('fs')
var data = fs.readFileSync('./movie.json')
var dataJson = JSON.parse(data)

var dataInputFromJson = function(dataJson){
	for(var i=0;i<dataJson.length;i++){
		Model.insertMovie(dataJson[i])
	}
	console.log('数据输入完成！')
}
dataInputFromJson(dataJson)