var mongoose = require('mongoose')
var movieSchema = require('./movieSchema')
mongoose.connect('mongodb://localhost/movie')
var db = mongoose.connection
db.once('open',function() {
	console.log('成功连接数据库!')
})
db.on('error',function(){
	console.log('连接数据库失败。。。')
})
var Movie = mongoose.model('movie',movieSchema)

module.exports = Movie
// var movie1 = {
// 		movieId:"movie_1",
// 		title:"基努猫 Keanu",
// 		imgsrc:"/img/mog",
// 		summary:{
// 					summarytitle:"治愈的流浪猫...",
// 					summarycontent:"大男人化身猫奴，为救小猫与贩毒集团斗智斗勇..."
// 				},
// 		comment:{
// 					score:"★★★★☆",
// 					shortcomment:"系..."
// 				},
// 		detail:{
// 				title:"基努猫 Keanu",
// 				videosrc:"/video/kinucat.mp4",
// 				director:"彼得·阿特西奥",
// 				actor:"不知道",
// 				kind:"悲剧",
// 				area:"美国",
// 				releaseDate:"2016",
// 				duration:"98分钟",
// 				content:"略."
// 		}
// 	}

//Movie.insertMovie(movie1)
//Movie.updateById('movie_1',movie1)
//Movie.findAll()
//Movie.findOneByTitle(/基努猫/i)
//Movie.findOneById('movie_1')
//Movie.deleteById('movie_1')
