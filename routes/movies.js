let express = require('express');
let router = express.Router();
const MoviesDAO = require('../DAO/moviesDao');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const { query, search, page } = req.query;
  MoviesDAO.getMovies(req.query).then(data=>{
  	// if(page>=1){
  	// 	if(data.length){
  	// 		return res.status(200).json({status:200,data:data,request:req.query})
  	// 	} else{
  	// 		return res.send({status:404,message:"no more movies found"})
  	// 	}
  	// }
  	const responseData = {
  		data,
  		title:`Movies Express - ${req.query.query}`,
  		request : { "query": query, "search":search, "page":page }
  	}
  	res.render('movies',responseData);
  }).catch((e)=>{
  	console.error(e.stack)
  	res.render('movies', {error: e});
  })
});

module.exports = router;
