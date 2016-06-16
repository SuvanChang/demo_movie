require.config({
	shim:{
		jquery:{exports:'$'},
	},
	paths:{
		jquery:'../jquery/dist/jquery.min',
		score:'score'
	}
})

require(["score"],function(score) {
	score()
})