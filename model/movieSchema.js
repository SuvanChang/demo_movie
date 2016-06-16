var mongoose = require('mongoose')

var movieSchema = mongoose.Schema({
	movieId:{type:String,index:true,unique:true},
	title:{type:String,index:true},
	imgsrc:String,
	summary:{summarytitle:String,summarycontent:String},
	comment:{score:String,shortcomment:String},
	detail:{
		title:String,
		videosrc:String,
		director:String,
		actor:String,
		kind:String,
		area:String,
		releaseDate:String,
		duration:String,
		content:String
	}
},{timestamps:{createdAt:'created_at',updatedAt:'updated_at'}})

movieSchema.statics={
	findAll:function(callback){
		return this.find({},function(err,item){
			if(err){console.log(err)}
			console.log('success to findAll')
			callback&&callback(item)
			//console.log(item)
		})
	},
	findOneByTitle:function(title,callback){
		return this.findOne({title:title},function(err,item){
			if(err){console.log(err)}
			console.log('根据Title，成功找到一条')
			console.log(item)
			callback&&callback(item)
		})
	},
	findOneById:function(id,callback){
		return this.findOne({movieId:id},function(err,item){
			if(err){console.log(err)}
			console.log('根据Id，成功找到一条')
			//console.log(item)
			callback&&callback(item)			
		})
	},
	updateById:function(id,newData){
		return this.update({movieId:id},newData,function(err,num){
			if(err){console.log(err)}
			console.log('根据Id，成功更新一条')
			console.log(num)	
		})
	},
	insertMovie:function(movie,callback){
		return this.create(movie,function(err,item){
			if(err){console.log(err)}
			console.log('成功插入一条数据!')
			callback&&callback(item)
		})
	},
	deleteById:function(id,callback){
		return this.remove({movieId:id},function(err){
			if(err){console.log(err)}
			console.log('根据Id，成功删除一条')
			callback&&callback()
		})
	}
}

module.exports = movieSchema
