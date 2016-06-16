var movieData = function(){
	var fs = require('fs')
	var movies =fs.readFileSync('./views/movie.json','utf8')
	var movieObj = JSON.parse(movies)
	return movieObj
}
module.exports = movieData()
